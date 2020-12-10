<?php

namespace App\Service;

use Illuminate\Http\Request;
use DB;
use App\Models\{Company,Holiday};
class HolidayService
{	
	public function index(){

		$request = new Request();
		$record='5';
        if(!empty(request()->record))
         $record = request()->record;
     	$holidays=Holiday::select('id','type','days','status','description','start_time','end_time','company_id')->paginate($record);
		$data['holidays']=$holidays;
     return $data;
	}
   
    public function searchHoliday(Request $request)
    {	$id=$request->id;
        $type=$request->type;
        $days=$request->days;
        $description=$request->description;
        $record = $request->record;
           $holidays=Holiday::select('id','type','days','description');
           if(!empty($id)){
                    $holidays = $holidays->where('id','LIKE',"%".$id."%");
                }

            if(!empty($type)){
                    $holidays = $holidays->where('type','LIKE',"%".$type."%");
                }
            if(!empty($days)){
                    $holidays = $holidays->where('days','LIKE',"%".$days."%");
                }
            if(!empty($description)){
                    $holidays = $holidays->where('description','LIKE',"%".$description."%");
                }
            $data['holidays'] = $holidays->paginate($record);
            $data['quantity'] =   $data['holidays']->total();
            $data['holidays']->appends(['id'=> $id, 'type'=>$type,'days'=>$days,'description'=>$description]);
            $data['id'] = $id;
            $data['type'] = $type;
            $data['days'] = $days;
            $data['description'] = $description;
            $data['record'] = $record;              
            return $data;
       // }
    } 

   
    public function createHoliday()
    {
     $data['holidays'] = Holiday::all();
     $data['companies']= Company::all();
 

     return $data;
    }
      public function storeHoliday(Request $request)
    {
        DB::beginTransaction(); 
        
        DB::commit();
    }
  
    
    public function showHoliday($id){
    	$holidays = DB::table('companies')
            ->join('holidays', 'companies.id', '=', 'holidays.company_id')
            ->select('companies.*', 'holidays.*')
            ->where('holidays.id','=',$id)
            ->get();
  
        return $holidays;
    }  

    public function editHoliday($id){
        $data['holidays'] = Holiday::find($id);
        $data['companies'] = Company::all();
        
      return $data;
    }
    public function updateHoliday(Request $request, $id){
        
        DB::beginTransaction();
         DB::commit();
    }
   
    public function deleteHoliday($id){
    
        $holidays = Holiday::where('id',$id);
        $holidays->delete();
       
    } 
}
?>