<?php
namespace App\Services;
use Illuminate\Http\Request;
use DB;
use App\Models\{Employee,DepartmentEmployee,Position,Department};
class EmployeeAPIService
{
    // Show list employee
    public function getListEmployee()
    {
      $listEmployee = Employee::select('id','name','phone','email',DB::raw('2020 - year(day_of_birth) as age'))
      ->orderBy('name', 'asc')
      ->paginate(25);       
      return $listEmployee;
    }

    // Search Employee
    public function searchListEmployee(Request $request)
    {
      $name = $request->name;    
      $email = $request->email;
      $phone = $request->phone;
      $age = $request->age;
      if($request->has('record')) $record = $request->record;
      else $record = 25;

      $listEmployee = Employee::select('id','name','phone','email',DB::raw('2020 - year(day_of_birth) as age'))
                            ->orderBy('name', 'asc');
      if(!empty($name)){
          $listEmployee = $listEmployee->where('name','LIKE','%'.$name.'%');  
      }
      if(!empty($email)){
          $listEmployee = $listEmployee->where('email','LIKE','%'.$email.'%');
      }
      if(!empty($phone)){
          $listEmployee = $listEmployee->where('phone','LIKE','%'.$phone.'%');
      }
      if(!empty($age) ){
          $listEmployee = $listEmployee->whereRaw('(2020 - year(day_of_birth)) = ?', $age);
      }       
      $listEmployee = $listEmployee->paginate($record);     
      return $listEmployee;
    }
    // Create new employee
    public function createEmployee()
    {
      $dataEmployee['positions'] = Position::all();
      $dataEmployee['departments'] = Department::all();  
      return $dataEmployee;
    }
      
    // Store new employee on database
    public function storeEmployee(Request $request)
    {  
      DB::beginTransaction();
      $dataEmployee = Employee::create([
          'name' => $request->name,
          'image' =>  $request->files->get('image')->getClientOriginalName(),
          'email' => $request->email,
          'phone' => $request->phone,
          'gender' => $request->gender,
          'address' => $request->address,
          'identification_card' => $request->identification_card,
          'day_of_birth' => $request->day_of_birth,
      ]);
      DepartmentEmployee::create([
         'department_id' =>$request->department_id,
         'employee_id' =>$dataEmployee->id,
         'position_id' => $request->position_id
      ]);
      DB::commit();
      if($request->hasFile('image')){
          $request->image->move('images', $request->files->get('image')->getClientOriginalName());
    }      
   }

    // Show detail employee
    public function showDetailEmployee($id){
        $baseId = Employee::find($id)->departments()->get()->first()->pivot;
        $dataEmployee['employeeInformation'] = Employee::find($baseId->employee_id);
        $dataEmployee['positionName'] = Position::find($baseId->position_id)->name;
        $dataEmployee['departmentName'] = Department::find($baseId->department_id)->name;
        return $dataEmployee;
    }  

    // Get employee for edit
    public function editEmployee($id){

        // Get data need update of this employee
        $baseId = Employee::find($id)->departments()->get()->first()->pivot;
        $dataEmployee['employeeInformation'] = Employee::find($baseId->employee_id);
        $dataEmployee['positionId'] = Position::find($baseId->position_id)->id;
        $dataEmployee['departmentId'] = Department::find($baseId->department_id)->id;

        // Get list data of position and department
        $dataEmployee['positions'] = Position::all();
        $dataEmployee['departments'] = Department::all();
      return $dataEmployee;
    }

    // // Update employee
    public function updateEmployee(Request $request, $id){   
      $dataEmployee = Employee::find($id);
      // Handle image field        
      if($request->hasFile('image')){
          $request->validate([
              'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',                   
          ]);
          $request->image->move('images', $request->files->get('image')->getClientOriginalName());
          $dataEmployee->image = $request->files->get('image')->getClientOriginalName();                
      }
      // Handle others field
          $dataEmployee->name = $request->name;               
          $dataEmployee->email = $request->email;
          $dataEmployee->phone = $request->phone;
          $dataEmployee->gender = $request->gender;
          $dataEmployee->address = $request->address;
          $dataEmployee->identification_card = $request->identification_card;
          $dataEmployee->day_of_birth = $request->day_of_birth; 

          $departmentEmployee = DepartmentEmployee::where('employee_id',$id)->get()->first();
          $departmentEmployee->department_id = $request->department_id;
          $departmentEmployee->employee_id = $dataEmployee->id;
          $departmentEmployee->position_id = $request->position_id;   
          $dataEmployee->save();
          $departmentEmployee->save();
    }
    public function deleteEmployee($id){
        $dataEmployee = Employee::find($id);
        $dataEmployee->delete();
    } 
}
