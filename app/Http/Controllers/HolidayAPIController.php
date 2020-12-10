<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App;
use Session;
use App\Models\{Holiday,Company};
use Illuminate\Support\Facades\Route;
use Illuminate\Database\Eloquent\Collection;
use DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
class HolidayAPIController extends Controller
{
   /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
   
    // Get list employee
    public function getListHoliday(){
        $holidays=Holiday::select('id','type','days','status','description','start_time','end_time','company_id')->paginate(5);   
         return response()->json($holidays);
    } 
    // Search list employee
    public function searchListHoliday(Request $request){ 
        $id = $request->id;    
        $type = $request->type;
        $days = $request->days;
        $description = $request->description;
        $start_time=$request->start_time;
        $end_time=$request->end_time;
        if($request->has('record')) $record = intval($request->record);
        else $record = 5;
        $holidays=Holiday::select('id','type','days','description','status','start_time','end_time');
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
        if(!empty($request->start_time) && empty($request->end_time)){
            $holidays = $holidays->where('start_time','=',$request->start_time);
        }
            if(!empty($request->start_time)){
                $holidays = $holidays->where('start_time','>=',$request->start_time);
            }
            if(!empty($request->end_time)){
                $holidays = $holidays->where('end_time','<=',$request->end_time);
            }
            if(!empty($request->end_time)&& empty($request->end_time)){
                $holidays = $holidays->where('end_time','=',$request->end_time);
            }
           $data= $holidays->paginate($record);     
           return response()->json($data); 
    }

    
    public function createHoliday()
    {
    $data['holidays'] = Holiday::all();
     $data['companies']= Company::all();
 

     return $data;
    }
    public function showHoliday($id){
        $holidays = DB::table('companies')
            ->join('holidays', 'companies.id', '=', 'holidays.company_id')
            ->select('companies.*', 'holidays.*')
            ->where('holidays.id','=',$id)
            ->get();
            return response()->json($holidays);
    }
    public function storeHoliday(Request $request)
    { 
        $request->validate( [
        'type'=>'required|max:255',
        'days'=>'required|numeric|min:1|max:100',
        'status'=>'required|max:255',
        'description'=>'required|max:255',
        'start_time'=>'required|date',
        'end_time'=>'required|date|after_or_equal:start_time',
        'company_id'=>'required'
        ]);
      
        DB::beginTransaction();
        $holidays = Holiday::create([
            'type' => $request->type,
            'days' => $request->days,
            'status' => $request->status,
            'description' => $request->description,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'company_id' =>$request->company_id,
            'created_by' => 1,
            'updated_by' => 1
        ]); 
        DB::commit();
        return response()->json();
    
    }
    public function editHoliday($id)
    {   $data['holidays'] = Holiday::all();
        $data['companies']= Company::all();
        $holidays = DB::table('companies')
        ->join('holidays', 'companies.id', '=', 'holidays.company_id')
        ->select('companies.*', 'holidays.*')
        ->where('holidays.id','=',$id)
        ->get();
        
        return response()->json($holidays);
    }

public function updateHoliday($id, Request $request){
        $holidays = Holiday::find($id);
        $holidays->type = $request->type;
        $holidays->days = $request->days;
        $holidays->status =$request->status;
        $holidays->description = $request->description;
        $holidays->start_time = $request->start_time;
        $holidays->end_time = $request->end_time;
        $holidays->company_id = $request->company_id;
        $holidays->created_by = 1;
        $holidays->updated_by = 1;
        $holidays->save();
       
                $request->validate([
                'type'=>'required',
                'days'=>'required',
                'status'=>'required',
                'description'=>'required',
                'start_time'=>'required',
                'end_time'=>'required',
                'company_id'=>'required|numeric',
                
         ]);
        return response()->json($holidays);
                }
public function deleteHoliday($id)
     {  $holidays = Holiday::where('id',$id);
        $holidays->delete();
        return response()->json($holidays);
     }

}