<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EmployeeHoliday;
use DB;
use App\Service\EmployeeHolidayService;

class EmployeeHolidayController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    protected $employeeHolidayService;

    public function __construct(EmployeeHolidayService $employeeHolidayService)
    {
        $this->employeeHolidayService = $employeeHolidayService;
    }
    public function index()
    {   
        $data = $this->employeeHolidayService->index();
        return view('employee_holidays.index',compact('data'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $data = $this->employeeHolidayService->createEmployeeHoliday();
        return view('employee_holidays.create',compact(['data']));   
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   $this->employeeHolidayService->storeEmployeeHoliday($request);
        return redirect('/employee_holidays')->with('success', 'Holiday created!');
       
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $employee_holidays = $this->employeeHolidayService->showEmployeeHoliday($id); 
        return view('employee_holidays.show',compact('employee_holidays'));
    }
    public function searchEmployeeHoliday(Request $request){ 
        $data = $this->employeeHolidayService->searchEmployeeHoliday($request);
        return view('employee_holidays.index',compact('data')); 
   }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        
        $data = $this->employeeHolidayService->editEmployeeHoliday($id);
        return view('employee_holidays.edit', compact('data'));
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
    
    $this->employeeHolidayService->updateEmployeeHoliday($request,$id);
   // return redirect('holidays'.$id)->with('success', 'Holiday updated!');
    return redirect()->route('employee_holidays.index')
                       ->with('success','holiday updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
       EmployeeHoliday::where('id',$id)->delete();
        return redirect()->back()->with('success','delete successfully');
    }
    
}
