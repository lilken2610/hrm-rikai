<?php

namespace App\Service;

use Illuminate\Http\Request;
use DB;
use App\Models\{Company,EmployeeHoliday,Employee,Holiday};
class EmployeeHolidayService{
        public function index(){
    
            $request = new Request();
            $record='5';
            if(!empty(request()->record))
             $record = request()->record;
             $employee_holidays=EmployeeHoliday::with('holiday','employee')->get();
             $employee_holidays=EmployeeHoliday::paginate($record);
            $data['employee_holidays']=$employee_holidays;
         return $data;
        }
       
        public function searcEmployeehHoliday(Request $request)
        {	$id=$request->id;
            $type=$request->type;
            $name=$request->name;
            $days=$request->days;
            
            $record = $request->record;
            $employee_holidays=EmployeeHoliday::with('holiday','employee')->get();
               if(!empty($id)){
                        $employee_holidays = $employee_holidays->where('id','LIKE',"%".$id."%");
                    }
    
                if(!empty($type)){
                        $employee_holidays = $employee_holidays->where('type','LIKE',"%".$type."%");
                    }
                if(!empty($days)){
                        $employee_holidays = $employee_holidays->where('days','LIKE',"%".$days."%");
                    }
                if(!empty($name)){
                        $employee_holidays = $employee_holidays->where('name','LIKE',"%".$name."%");
                    }
                $data['employee_holidays'] = $employee_holidays->paginate($record);
                $data['quantity'] =   $data['employee_holidays']->total();
                $data['employee_holidays']->appends(['id'=> $id, 'type'=>$type,'days'=>$days,'name'=>$name]);
                $data['id'] = $id;
                $data['type'] = $type;
                $data['days'] = $days;
                $data['name'] = $name;
                $data['record'] = $record;              
                return $data;
        } 
    
       
        public function createEmployeeHoliday()
        {
         $data['holidays'] = Holiday::all();
         $data['companies']= Company::all();
     
    
         return $data;
        }
          public function storeEmployeeHoliday(Request $request)
        {
            DB::beginTransaction(); 
            
            DB::commit();
        }
      
        
        public function showEmployeeHoliday($id){
            $employee_holidays = DB::table('employee_holidays')
                ->join('holidays', 'employee_holidays.holiday_id', '=', 'holidays.id')
                ->join('employees', 'employee_holidays.employee_id', '=', 'employees.id')
                ->select('employee_holidays.*', 'holidays.*','employees.*')
                ->where('employee_holidays.id','=',$id)
                ->get();
      
            return $employee_holidays;
        }  
    
        public function editEmployeeHoliday($id){
            $data['holidays'] = Holiday::find($id);
            $data['companies'] = Company::all();
            
          return $data;
        }
        public function updateEmployeeHoliday(Request $request, $id){
            
            DB::beginTransaction();
             DB::commit();
        }
       
        public function deleteEmployeeHoliday($id){
        
            $holidays = EmployeeHoliday::where('id',$id);
            $holidays->delete();
           
        } 
    }

    ?>