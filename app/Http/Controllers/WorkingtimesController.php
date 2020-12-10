<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Working;
use App\Models\Employee;
use App\Services\WorkingtimeService;
use Session;

class WorkingtimesController extends Controller
{    
    protected $workingtimeService;
    public function __construct(WorkingtimeService $workingtimeService){
        $this->workingtimeService = $workingtimeService;
    }
    public function getListWorkingTime()
    {
        $workingtimes = $this->workingtimeService->index();
        return response()->json($workingtimes);
    }
    public function searchListWorkingtime(Request $request){ 
        $workingtimes = $this->workingtimeService->search($request);
        return response()->json($workingtimes); 
    }
    public function createTime(){
        $workingtimes = $this->workingtimeService->createTime();
        return response()->json($workingtimes);
    }
    public function store(Request $request)
    {        
        $request->validate([
            'name'=>'required',
            'time'=>'required|max:20|date',
            'type' => 'required',
            'created_by' => 'required|max:10|integer',
            'updated_by' => 'required|max:10|integer'
        ]);
        $this->workingtimeService->store($request);
        return response()->json();
    }
    public function edit($id)
    {
        $workingtime = $this->workingtimeService->edit($id);
        return response()->json($workingtime);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'time'=>'required|max:20|date'
        ]);
        $this->workingtimeService->update($request,$id);
        return response()->json();
    }

    public function destroy($id)
    {
        $this->workingtimeService->destroy($id);
        return response()->json();
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
 
    }