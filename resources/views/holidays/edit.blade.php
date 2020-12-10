
@extends('master')
@section('edit')

<!-- Navbar -->
    <div class="row">
        <div class="col-lg-12 margin-tb">
            <div class="pull-left">
                <h2>{{__('sentence.edit holidays')}}</h2>
            </div>
            <div class="pull-right">
                <a class="btn btn-primary" href="{{ route('holidays.index') }}"><i class="fa fa-backward "></i></a>
            </div>
        </div>
    </div>
   
    @if ($errors->any())
        <div class="alert alert-danger">
            <strong>Whoops!</strong> There were some problems with your input.<br><br>
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif
  
    <form action="{{ route('holidays.update',$data['holidays']->id) }}" method="POST">
        {{ csrf_field() }}
        {{ method_field('PATCH') }}
   
         <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>{{__('sentence.type')}}:</strong>
                    <input type="text" name="type" value="{{ $data['holidays']->type }}" class="form-control" placeholder="{{__('sentence.type')}}"  data-validate-minmax="1,100" required="required">
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>{{__('sentence.day')}}</strong>
                    <input type="text" class="form-control"  name="days" id="days" value ="{{$data['holidays']->days }}" placeholder="{{__('sentence.day')}}" data-validate-minmax="1,100" required="required">
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>{{__('sentence.status')}}:</strong>
                    <input type="text" name="status" class="form-control" placeholder="{{__('sentence.status')}}"value ="{{ $data['holidays']->status }}" data-validate-minmax="1,100" required="required"> 
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>{{__('sentence.description')}}:</strong>
                    <input type="text" name="description" class="form-control" placeholder="{{__('sentence.description')}}" value ="{{ $data['holidays']->description }}" data-validate-minmax="1,100" required="required">
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>{{__('sentence.start_time')}}:</strong>
                    <input type="date" name="start_time" id="start_time" class="form-control" placeholder="{{__('sentence.start_time')}}" onblur="checkDateDiff()" value ="{{ $data['holidays']->start_time }}" required="required">
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>{{__('sentence.end_time')}}</strong>
                    <input type="date" name="end_time" id="end_time" class="form-control" placeholder="{{__('sentence.end_time')}}" onblur="checkDateDiff()" value ="{{ $data['holidays']->end_time }}" data-validate-minmax="1,100" required="required">
                    <strong id="valid_diff_date" style="visibility: hidden; color: red"></strong>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 text-center">
            
              <button  type="submit" class="btn btn-primary">{{__('sentence.save')}}</button>
              <!-- <button type="button" st class="btn btn-primary" data-toggle="modal" data-target="#cancelModal">Cancel  -->
              </button>
            </div>
        </div>
   
    </form>
            
    <div class="modal fade" id="cancelModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content ">
            <div class="modal-header " >
                <span class="icon"><i class="fa fa-exclamation-triangle"></i></span>
                <p class="modal-title ml-2" id="myModalLabel">Are you sure cancel </p>
                <button type="button" class="close " data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>                 
            </div>
            <div class="modal-footer">
            <button type="button" id="yes" class="btn btn-default" data-dismiss="modal">{{__('sentence.yes')}}</button>
            <button type="submit" class="btn btn-primary" name="delete_dividend" >{{__('sentence.no')}}</button>
            </div>
   <script>

    $(document).ready(function() {
    $("#yes").click(function() {
        $("input").val("");
    });
});
   function DateDiff(date1, date2) {
            var datediff = date1.getTime() - date2.getTime();
            return (datediff / (24*60*60*1000)); 
        }

        function checkDateDiff(){
            start = document.getElementById("start_time");
            end = document.getElementById("end_time");

            if(start.value && end.value){
                var days = document.getElementById("days");
                var result = DateDiff(new Date(end.value) , new Date(start.value)) + 1;
                var valid_diff = document.getElementById("valid_diff_date");
                if(result<1){
                    valid_diff.style.visibility="visible";
                    valid_diff.innerText = "Start Date must bigger End Date";
                } else if(result != days.value){
                    valid_diff.style.visibility="visible";
                    valid_diff.innerText = "Range of Star Date and End Date must equal Days";
                } else{
                    valid_diff.style.visibility = "hidden";
                }
            }
        }
   

   </script>
    @endsection

