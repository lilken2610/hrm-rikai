<?php
namespace App\Http\Controllers;
use App;
use Session;
use Illuminate\Http\Request;
use App\Models\{Holiday,Company};
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Database\Eloquent\Collection;
use App\Service\HolidayService;


class HolidayController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

   protected $holidayService;

    public function __construct(HolidayService $holidayService)
    {
        $this->holidayService = $holidayService;
    }
    public function index()
    {
      $data = $this->holidayService->index();
    return view('holidays.index',compact('data'));
    }
   

    /**
     * Show the form for creating a ncew resource.
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
        $data = $this->holidayService->createHoliday();
        return view('holidays.create',compact(['data']));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {        
       $request->validate([
        'type'=>'required|max:255',
        'days'=>'required|numeric|min:1|max:100',
        'status'=>'required|max:255',
        'description'=>'required|max:255',
        'start_time'=>'required|date',
        'end_time'=>'required|date|after_or_equal:start_time',
        'company_id'=>'required',
        'created_by'=>'required',
        'updated_by'=>'required'
       ]);
       $holidays = Holiday::create([
            'type' => $request->type,
            'days' => $request->days,
            'status' => $request->status,
            'description' => $request->description,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'company_id'=>$request->company_id ,
            'created_by'=>$request->created_by,
            'updated_by'=>$request->updated_by
        ]);
        $this->holidayService->storeHoliday($request);
        toastr()->success('Holiday created!');
        return redirect('/holidays');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $holidays = $this->holidayService->showHoliday($id); 
        return view('holidays.show',compact('holidays'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        
        $data = $this->holidayService->editHoliday($id);
        return view('holidays.edit', compact('data'));
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
    $request->validate([
        'type'=>'required',
        'days'=>'required|numeric|min:1|max:100',
        'status'=>'required|max:255',
        'description'=>'required|max:255',
        'start_time'=>'required|date',
        'end_time'=>'required|date|after_or_equal:start_time',
        ]);
    $holidays = Holiday::where('id','=',$id)->update([
            'type' => $request->type,
            'days' => $request->days,
            'status' => $request->status,
            'description' => $request->description,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time
        ]);
    $this->holidayService->updateHoliday($request,$id);
   // return redirect('holidays'.$id)->with('success', 'Holiday updated!');
   toastr()->success('holiday updated successfully!');
    return redirect()->route('holidays.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->holidayService->deleteHoliday($id);
        toastr()->success('Data deleted successfully!');
        return redirect('/holidays');
        // Holiday::where('id',$id)->delete();
        // return redirect()->back()->with('success','delete successfully');
    }
    
    public function search(Request $request){ 
            $data = $this->holidayService->searchHoliday($request);
            return view('holidays.index',compact('data')); 
       }
       
}   

    // public function index()
    // {   
    //     //$holidays = Holiday::with('employee_holidays')->get();
    //     //$holidays = Holiday::paginate(15);
    //     //return view('holidays.index', compact('holidays'));
    //     //return view('holidays.index',['holidays'=>$holidays]);
    //    $holidays = Holiday::with('employee_holidays')->get();
    //   $holidays = Holiday::paginate(3);
    //   return view('holidays.index', compact(['holidays']));
    // }

    // /**
    //  * Show the form for creating a new resource.
    //  *
    //  * @return \Illuminate\Http\Response
    //  */
    // public function create()
    // {
    //     return view('holidays.create');
    // }

    // /**
    //  * Store a newly created resource in storage.
    //  *
    //  * @param  \Illuminate\Http\Request  $request
    //  * @return \Illuminate\Http\Response
    //  */
    // public function store(Request $request)
    // {
    //    $request->validate([
    //     'type'=>'required',
    //     'days'=>'required',
    //     'status'=>'required',
    //     'description'=>'required',
    //     'start_time'=>'required',
    //     'end_time'=>'required',
    //     'company_id'=>'required',
    //     'created_by'=>'required',
    //     'updated_by'=>'required',
    //     'deleted_at'=>'required',
    //     'created_at'=>'required',
    //     'updated_at'=>'required'

    //    ]);
    //    Holiday::create($request->all());
    //    return redirect()->back()->with('success','create successfully');
    // }

    // /**
    //  * Display the specified resource.
    //  *
    //  * @param  int  $id
    //  * @return \Illuminate\Http\Response
    //  */
    // public function show($id)
    // {
    //     $holidays = Holiday::find($id);
    //     return view('holidays.show',compact('holidays','id'));
    // }

    // /**
    //  * Show the form for editing the specified resource.
    //  *
    //  * @param  int  $id
    //  * @return \Illuminate\Http\Response
    //  */
    // public function edit($id)
    // {
    //     $holidays = Holiday::find($id);
    //     return view('holidays.edit',compact('holidays','id'));
    // }

    // *
    //  * Update the specified resource in storage.
    //  *
    //  * @param  \Illuminate\Http\Request  $request
    //  * @param  int  $id
    //  * @return \Illuminate\Http\Response
     
    // public function update(Request $request, $id)
    // {

    //     $holidays = Holiday::find($id);
    //     $holidays->type = request('type');
    //     $holidays->days = request('days');
    //     $holidays->status = request('status');
    //     $holidays->description = request('description');
    //     $holidays->start_time = request('start_time');
    //     $holidays->end_time = request('end_time');
    //     $holidays->company_id = request('company_id');
    //     // $holidays->created_by = request('created_by');
    //     // $holidays->updated_by = request('updated_by');
    //     // $holidays->deleted_at = request('deleted_at');
    //     // $holidays->created_at = request('created_at');
    //     // $holidays->updated_at = request('updated_at');

    //     $holidays->save();
    //             $request->validate([
    //             'type'=>'required',
    //             'days'=>'required',
    //             'status'=>'required',
    //             'description'=>'required',
    //             'start_time'=>'required',
    //             'end_time'=>'required',
    //             'company_id'=>'required',
    //             // 'created_by'=>'required',
    //             // 'updated_by'=>'required',
    //             // 'deleted_at'=>'required',
    //             // 'created_at'=>'required',
    //             // 'updated_at'=>'required'
    //      ]);  
    //    // Holiday::where('id',$id)->update($request->all());
    //    // return redirect()->back()->with('success','update successfully');

    //         $holidays->update($request->all());
  
    //     return redirect()->route('holidays.index')
    //                     ->with('success','holiday updated successfully');
    // }

    // /**
    //  * Remove the specified resource from storage.
    //  *
    //  * @param  int  $id
    //  * @return \Illuminate\Http\Response
    //  */
    // public function destroy($id)
    // {  //$holidays->delete();
    //     Holiday::where('id',$id)->delete();
    //     return redirect()->back()->with('success','delete successfully');
    // }
    
