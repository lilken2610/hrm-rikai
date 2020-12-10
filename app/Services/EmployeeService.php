<?php

namespace App\Services;
use Illuminate\Http\Request;
use DB;
use Image;
use App\Models\{Employee,DepartmentEmployee,Position,Department};
class EmployeeService
{
    // Show list employee
    public function index()
    {
     $request = new Request();
     $record = '25';
     if(!empty($request->record)) $record = $request->record;
     $employees = Employee::select('id','name','phone','email',DB::raw('2020 - year(day_of_birth) as age'))
                        ->orderBy('name', 'asc')
                        ->paginate($record);
     $data['employees'] = $employees;  
    
     return $data;
    }

    // Search Employee
    public function searchEmployee(Request $request)
    {
        $name = $request->name; 
        $email = $request->email;
        $phone = $request->phone;
        $age = $request->age;
        $record =  $request->record;
            $employees = Employee::select('id','name','phone','email',DB::raw('2020 - year(day_of_birth) as age'));
            if(!empty($name)){
                $employees = $employees->where('name','LIKE','%'.$name.'%');             
            }
            if(!empty($email)){
                $employees = $employees->where('email','LIKE','%'.$email.'%');
            }
            if(!empty($phone)){
                $employees = $employees->where('phone','LIKE','%'.$phone.'%');
            }
            if(!empty($age) ){
                $employees = $employees->whereRaw('(2020 - year(day_of_birth)) = ?', $age);
            }
        
            $data['employees'] = $employees->orderBy('name', 'asc')->paginate($record);
            $data['quantity'] =   $data['employees']->total();
            $data['employees']->appends(['name'=> $name, 'email'=>$email,'phone'=>$phone,'age'=>$age]);
            $data['name'] = $name;
            $data['phone'] = $phone;
            $data['email'] = $email;
            $data['age'] = $age;
            $data['record'] = $record;            
            return $data;
    } 

    // Create new employee
    public function createEmployee()
    {
     $request = new Request();
     $data['positions'] = Position::all();
     $data['departments'] = Department::all(); 
     return $data;
    }

    // Save new employee on database
    public function storeEmployee(Request $request)
    {
       
        DB::beginTransaction();
        $employee = Employee::create([
            'name' => $request->name,
            'image' =>  $request->image->getClientOriginalName() ,
            'email' => $request->email,
            'phone' => $request->phone,
            'gender' => $request->gender,
            'address' => $request->address,
            'identification_card' => $request->identification_card,
            'day_of_birth' => $request->day_of_birth,
        ]);
        DepartmentEmployee::create([
           'department_id' =>$request->department_id,
           'employee_id' =>$employee->id,
           'position_id' => $request->position_id

        ]);
        DB::commit();
        if ($request->hasFile('image')) {
            $request->image->move('images', $request->image->getClientOriginalName());
        } 
    }
    // Show detail employee
    public function showEmployee($id){
        $employee = DepartmentEmployee::join('employees','department_employees.employee_id','=','employees.id')
        ->join('positions','department_employees.position_id','=','positions.id')
        ->join('departments','department_employees.department_id','=','departments.id')
        ->select('department_employees.*','employees.*','positions.name as position_name','departments.name as department_name')
        ->where('employee_id','=',$id)
        ->get()->first();
        return $employee;
    }  
    public function editEmployee($id){
        $request = new Request;
        $data['employee'] = Employee::find($id);
        $data['positions'] = Position::all();
        $data['departments'] = Department::all();
      return $data;
    }

    // Update employee
    public function updateEmployee(Request $request, $id){
      
        $employee = Employee::find($id);
            $employee->name = $request->name;   
            if ($request->hasFile('image'))
            {
            $file = $request->file('image');
            $file->move('images',$request->file('image')->getClientOriginalName());
            $employee->image = $request->file('image')->getClientOriginalName();
            }else $employee->image = $request->image_current;   
            $employee->email = $request->email;
            $employee->phone = $request->phone;
            $employee->gender = $request->gender;
            $employee->address = $request->address;
            $employee->identification_card = $request->identification_card;
            $employee->day_of_birth = $request->day_of_birth;       
        $departmentEmployee = DepartmentEmployee::find($id);
            $departmentEmployee->department_id = $request->department_id;
            $departmentEmployee->employee_id = $employee->id;
            $departmentEmployee->position_id = $request->position_id;
        $employee->save();
        $departmentEmployee->save();
    }
    public function deleteEmployee($id){
        $employee = Employee::find($id);
        $employee->delete();
    } 
}
