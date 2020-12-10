<?php

namespace App\Services;

use Illuminate\Http\Request;
use Session;
use DB;
use App\Models\{Working,Employee};

class WorkingtimeService
{
    public function index()
    {
        $request = new Request();
        $record = $request->record;
        if($request->has('record')) $record = $request->record;
        else $record = 25;
        $workingtimes = DB::table('working_times')
        ->join('employees', 'employees.id', 'working_times.employee_id')
        ->select('working_times.*','employees.name')       
        ->whereNull('working_times.deleted_at')
        ->whereNull('employees.deleted_at')
        ->orderBy('time','desc')
        ->paginate($record);
        return $workingtimes;
    }
    public function search(Request $request){
        $workingtimes = DB::table('working_times')
        ->join('employees', 'employees.id', 'working_times.employee_id')
        ->select('working_times.*','employees.name')
        ->whereNull('working_times.deleted_at')
        ->whereNull('employees.deleted_at');
        if(!empty($request->id)){
            $workingtimes->where('employee_id', $request->id);
        }
        if (!empty($request->name)){
            $workingtimes->where('name','LIKE', "%" .$request->name . "%");
        }
        if(!empty($request->startday) && empty($request->endday)){
            $workingtimes->where('time','>=',$request->startday);
        }
        if(empty($request->startday) && !empty($request->endday)){
            $workingtimes->where('time','<=', $request->endday);
        }
        if (!empty($request->startday) && !empty($request->endday)){
            $startday = $request->startday;
            $endday = $request->endday;
            $workingtimes->where('time','>=',$startday)
                            ->where('time','<=', $endday);  
        }
        if($request->has('record')) $record = intval($request->record);
        else $record = 10;
        $workingtimes = $workingtimes->orderBy('time','desc')->paginate($record);
            return $workingtimes;
    }
    public function createTime()
    {
        $workingtimes = Employee::all();
        return $workingtimes;
    }
    public function store(Request $request)
    {
        DB::beginTransaction();
        $working = Working::create([
            'employee_id' => $request->name,
            'time' =>$request->time,
            'type' =>$request->type,
            'created_by' =>$request->created_by,
            'updated_by' =>$request->updated_by
        ]);
        DB::commit();
    }
    public function edit($id)
    {
        $workingtime = Working::where('id', $id)->with('employee')->first();
        return $workingtime;
    }
    public function update(Request $request,$id)
    {
        DB::beginTransaction();
        $request->validate([
            'time'=>'required|max:20|date',
            'type' => 'required|max:2|min:1'
        ]);
        $workingtime = Working::where('id','=',$id)->update([
            'time' => $request->time,
            'type' => $request->type,
        ]);
        DB::commit();
    }
    public function destroy($id)
    {
        $workingtime = Working::find($id);
        $workingtime->delete();
    }
}
