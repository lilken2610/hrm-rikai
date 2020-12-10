<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\{Employee,Department,Position,DepartmentEmployee};
use Illuminate\Support\Facades\Route;
use Illuminate\Database\Eloquent\Collection;
use App\Services\EmployeeAPIService;
use Illuminate\Support\Facades\Validator;
use Spatie\QueryBuilder\QueryBuilder;
class EmployeeAPIController extends Controller
{
   /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    protected $employeeService;

    public function __construct(EmployeeAPIService $employeeAPIService)
    {
        $this->employeeAPIService = $employeeAPIService;
    }
    // Get list employee
    public function getListEmployee(){
        $listEmployee = $this->employeeAPIService->getListEmployee();
        return response()->json($listEmployee);
    } 
    // Search list employee
    public function searchListEmployee(Request $request){   
        $listEmployee = $this->employeeAPIService->searchListEmployee($request);
        return response()->json($listEmployee); 
    }

    // Create new employee
    public function createEmployee()
    {
        $dataEmployee = $this->employeeAPIService->createEmployee(); 
        return response()->json($dataEmployee);
    }

    public function storeEmployee(Request $request)
    {          
        $request->validate( [
            'name' =>'required|max:100',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'email' => 'required|unique:employees|max:100',
            'phone' => 'required|max:50',
            'gender' => 'required',
            'address' => 'required|max:100',
            'identification_card' =>'required|max:10|unique:employees',
            'day_of_birth' => 'required|date|date_format:Y-m-d|before:2000-12-31',
            'department_id' =>'required',
            'position_id' => 'required'
        ]);
        $this->employeeAPIService->storeEmployee($request);
        return response()->json();
    }

    // Show detail employee
    public function showDetailEmployee($id)
    {
        $dataEmployee = $this->employeeAPIService->showDetailEmployee($id); 
        return response()->json($dataEmployee);
    }

    // Get data employee to edit
    public function editEmployee($id)
    {
      $dataEmployee = $this->employeeAPIService->editEmployee($id);
    return response()->json($dataEmployee);
    }

    public function updateEmployee(Request $request, $id)
    {
        $request->validate([
            'name' =>'required|max:100',
            'email' => 'required|max:100|email:rfc,dns',
            'phone' => 'required|max:50',
            'address' => 'required|max:100',
            'gender' => 'required',
            'identification_card' =>'required|max:20',
            'day_of_birth' => 'required|date_format:Y-m-d|before:2000-12-31',
            'department_id' =>'required',  
            'position_id' => 'required',
        ]);
        $this->employeeAPIService->updateEmployee($request,$id);
        return response()->json();
    }

    public function deleteEmployee($id)
    {
        $this->employeeAPIService->deleteEmployee($id);
        return response()->json();
    }
    
}
