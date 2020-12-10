@extends('workingtimeLayout') 
@section('content')
<div class="right_col" >
<h2><a href="/workingtimes">Workingtime/ </a><a href="">Edit</a></h2>
    <div class="col-sm-8 offset-sm-2">
        <h6 class="display-4 title-edit" >{{__('sentence.ctitle')}}</h6>
        @if ($errors->any())
        <div class="alert alert-danger">
            <ul style="text-align: center;list-style: none;">
                @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
        <br /> 
        @endif
        <form method="post" action="{{ route('workingtimes.update', $workingtime) }}" id="edit-form">
            @method('put') 
            @csrf
            <fieldset disabled>
            <div class="form-group">
                <label for="name">{{__('sentence.ename')}}: </label>
                <input type="text" id="disabledTextInput" class="form-control input-edit" placeholder="{{$workingtime->employee->name}}" >
            </div>
            </fieldset>
            <div class="form-group">
                <label for="time">{{__('sentence.etime')}}:</label>
                <input type="text" class="form-control input-edit" name="time" value="{{ $workingtime->time }}"maxlength="20"/>
            </div>
            <div class="form-group">
                <label for="type">{{__('sentence.etype')}}:</label>
                <select name="type" id="" class="form-control input-edit">
                  @if ($workingtime->type == 1)
                  <option value="1">Check-in</option>
                  <option value="2">Check-out</option>
                  @else ($workingtime->type == 2)
                  <option value="2">Check-out</option>
                  <option value="1">Check-in</option>
                  @endif
                </select>
            </div>
            <button type="submit" class="btn btn-primary-edit confirm-edit">{{__('sentence.smedit')}}</button>
        </form>
    </div>
</div>
@endsection