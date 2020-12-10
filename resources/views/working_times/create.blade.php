@extends('workingtimeLayout')
@section('content')
<div class="right_col">   
<h2><a href="/workingtimes">Workingtime/</a><a href="">Create</a></h2>
<div class="row">
 <div class="col-sm-8 offset-sm-2">
    <h6 class="display-4 title-edit">{{__('sentence.etitle')}}</h6>
  <div>
    @if ($errors->any())
      <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
              <li>{{ $error }}</li>
            @endforeach
        </ul>
      </div><br />
    @endif
      <form method="POST" action="{{ route('workingtimes.store') }}" id="create-form">
          @csrf          
          <div class="form-group">
            <label for="name">{{__('sentence.ename')}}:</label>
              <select name="name" id="" class="form-control select-cre">
              @foreach($workingtimes as $workingtime)
                <option value="{{$workingtime->id}}">{{$workingtime->name}}</option>
                @endforeach
              </select>
          </div>
         
          <div class="form-group">
              <label for="time">{{__('sentence.etime')}}:<span class="required">*</span></label>
              <input type="text" class="form-control input-edit" name="time" placeholder="YYYY-MM-DD H:M:S" maxlength="20"/>
          </div>
          <div class="form-group">
              <label for="type">{{__('sentence.etype')}}:<span class="required">*</span></label>
              <!-- <input type="text" class="form-control" name="type" placeholder="Check-in = 1 || Check-out = 2"/> -->
              <select name="type" id="" class="form-control select-cre">
                <option  value="1">Check-in</option>
                <option  value="2">Check-out</option>
              </select>
          </div>     
          <div class="form-group">
              <label for="">{{__('sentence.created')}}:<span class="required">*</span></label>
              <input type="text" class="form-control input-edit" name="created_by"  maxlength="20"/>
          </div>        
          <div class="form-group">
              <label for="">{{__('sentence.updated')}}:<span class="required">*</span></label>
              <input type="text" class="form-control input-edit" name="updated_by"  maxlength="20"/>
          </div>      
          <button type="submit" class="btn btn-success-create" >{{__('sentence.smadd')}}</button>
          <!-- Modal -->
         
            <!-- Modal -->
      </form>
      
  </div>
</div>
</div>
</div>
@endsection