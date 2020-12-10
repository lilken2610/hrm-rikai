<?php

namespace App\Http\Controllers;
use App;
use Session;
use Illuminate\Http\Request;
use App\Models\{Employee,Department,Position};
use Illuminate\Support\Facades\Route;
use Illuminate\Database\Eloquent\Collection;
use App\Services\EmployeeService;
use Illuminate\Support\Facades\Validator;
class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    protected $employeeService;

    public function __construct(EmployeeService $employeeService)
    {
        $this->employeeService = $employeeService;
    }
    public function index()
    {
        
    $data = $this->employeeService->index();

    return view('employees.index',compact('data'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $data = $this->employeeService->createEmployee();
        return view('employees.create',compact(['data']));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {          
        $request->flash();
        $validator = Validator::make($request->all(), [
            'name' =>'required|max:100',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'email' => 'required|unique:employees|max:100',
            'confirm_email' => 'required|same:email',
            'phone' => 'required|max:50',
            'gender' => 'required',
            'address' => 'required|max:100',
            'identification_card' =>'required|max:20|unique:employees',
            'day_of_birth' => 'required|date|date_format:Y-m-d|before:2000-12-31',
            'department_id' =>'required',
            'position_id' => 'required'
        ]);

    if ($validator->fails()) {
        return redirect()->back()->withErrors($validator)->withInput();                
    }
        $this->employeeService->storeEmployee($request); 
        toastr()->info('Employee created !!!'); 
        return redirect('/employees')->with('primary', 'Employee created!');   
            
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $employee = $this->employeeService->showEmployee($id); 
        return view('employees.show',compact('employee'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = $this->employeeService->editEmployee($id);
        return view('employees.edit', compact('data'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->flash();
        $validator = Validator::make($request->all(), [
            'name' =>'required|max:100',
            'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'email' => 'required|max:100|email:rfc,dns',
            'phone' => 'required|max:50',
            'address' => 'required|max:100',
            'identification_card' =>'required|max:20',
            'day_of_birth' => 'required|date_format:Y-m-d|before:2000-12-31',
            'department_id' =>'required',  
            'position_id' => 'required',
        ]);
    if($validator->fails()){
        return redirect()->back()->withErrors($validator)->withInput();    
    }
    $this->employeeService->updateEmployee($request,$id);
    toastr()->info('Employee updated !!!');
    return redirect('employees/'.$id)->with('primary', 'Employee updated!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->employeeService->deleteEmployee($id);
        toastr()->info('Employee deleted !!!');
        return redirect('/employees');
    }
    public function searchEmployee(Request $request){ 
            $data = $this->employeeService->searchEmployee($request);
            return view('employees.index',compact('data')); 
    }
}
    

