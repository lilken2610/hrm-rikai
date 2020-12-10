@extends('master')
<!-- Navbar -->
<!-- Navbar -->

<!-- Navbar -->
@section('show')
    <div class="row">
        <div class="col-lg-12 margin-tb">
            <div class="pull-left">
                <h2>Show detail Holiday</h2>
            </div>
            <div class="pull-right">
                <a class="btn btn-primary" href="{{ route('employee_holidays.index') }}"><i class="fa fa-backward "></i> </a>
            </div>
        </div>
    </div>
      
         <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12">
               @foreach($employee_holidays as $employee_holiday)
                <div class="form-group">
                    <strong>Type:</strong>
                    <input type="text" name="type" value="{{ $employee_holiday->name }}" class="form-control" placeholder="Type">
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Days</strong>
                    <input type="text" class="form-control" name="days" value ="{{ $employee_holiday->days }}" placeholder="Days">
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Status:</strong>
                    <input type="text" name="status" class="form-control" placeholder="Status"value ="{{ $employee_holiday->status }}">
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Description:</strong>
                    <input type="text" name="description" class="form-control" placeholder="Description" value ="{{ $employee_holiday->description }}">
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Start time:</strong>
                    <input type="date" name="start_time" class="form-control" placeholder="Start time" value ="{{ $employee_holiday->start_time }}">
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>End Time</strong>
                    <input type="date" name="end_time" class="form-control" placeholder="End Time" value ="{{ $employee_holiday->end_time }}">
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Company_id:</strong>
                    <input type="text" name="company_id" class="form-control" placeholder="Company_id" value ="{{ $employee_holiday->company_id }}">
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Created_by:</strong>
                    <input type="text" name="created_by" class="form-control" placeholder="Created_by" value ="{{ $employee_holiday->created_by }}">
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Updated_by:</strong>
                    <input type="text" name="updated_by" class="form-control" placeholder="Updated_by" value ="{{ $employee_holiday->updated_by }}">
                </div>
               @endforeach
            </div>
           
        </div>
        @endsection
  

