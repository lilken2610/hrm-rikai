@extends('master')
@section('content')
<div class="select input-group col-sm-12 col-md-12">
<div class="x_panel">
                <div class="x_title">
                  
                  <form action="{{route('search')}}" method="GET" role="search" id="formsearch">
                    <div class="row">
                      <div class="col-md-6 col-sm-6  form-group has-feedback">
                      <input type="text" class="form-control has-feedback-left" id="inputSuccess4" placeholder="{{__('sentence.ID')}}" name="id" value="{{ request()->input('daids') }}" onblur="checkID()">
                        <strong id="valid_id" style="visibility: hidden; color: red"></strong>
                        <span class="fa fa-indent form-control-feedback left" aria-hidden="true"></span>
                  
                      </div>

                      <div class="col-md-6 col-sm-6  form-group has-feedback">
                        <input type="text" class="form-control has-feedback-left" id="inputSuccess2" placeholder="{{__('sentence.type')}}" name="type" value="{{ request()->input('type') }}" >
                        <span class="fa fa-align-justify form-control-feedback left" aria-hidden="true"></span>
                       
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-md-6 col-sm-6  form-group has-feedback">
                        <input type="text" class="form-control has-feedback-left" id="inputSuccess4" placeholder="{{__('sentence.day')}}" name="days" value="{{ request()->input('days') }}" onblur="checkDay()">
                        <strong id="valid_day" style="visibility: hidden; color: red"></strong>
                        <span class="fa fa-table form-control-feedback left" aria-hidden="true"></span>
                      </div>
                     
                      <div class="col-md-6 col-sm-6  form-group has-feedback">
                        <input type="text" class="form-control has-feedback-left" id="inputSuccess2" " placeholder="{{__('sentence.description')}}" name="description" value="{{ request()->input('Description') }}" >
                        <span class="fa fa-audio-description form-control-feedback left" aria-hidden="true"></span>
                       
                      </div>
                      <i class="fas fa-prescription-bottle-alt"></i>

                  </div>
                    <div class="ln_solid"></div>
                    <div class="form-group row">
                      <div class="col-md-3 col-sm-12  offset-md-12" style="margin-left:135px">
                        <button style="" type="submit" class="btn btn-secondary btn-block" id='search'>{{__('sentence.search')}}</button>
                        
                      </div>
                      <div class="col-md-3 col-sm-12  offset-md-12">
                        <a href="{{route('holidays.create')}}" class="buttonPrevious btn btn-success buttonDisabled btn-block">{{__('sentence.create')}}</a>
                        
                      </div>
                      <div class="col-md-3 col-sm-12  offset-md-12">
                        <a href="#" class="buttonPrevious btn btn-primary buttonDisabled btn-block">{{__('sentence.import')}}</a><!-- Navbar -->
                      </div>
                    </div>
                    



                </div>
              </div>
  </div>
  <!-- Collapsible content -->

<div class="select input-group col-sm-12 col-md-12">
            <div class="input-group-prepend">
              <label class="input-group-text" for="record">{{ __('sentence.row') }}</label>
            </div>
            <select class="custom-select col-1" name='record' id="record" onchange="insertParam('record',value)">
              @foreach($values = array(5,10,15,20) as $value)
              <option value="{{$value}}" @if(request()->record == $value) selected @endif>
                {{$value}}
              </option>
              @endforeach
            </select>
            <p class="quantity d-flex align-items-center">
              @if(!@empty($data['quantity'])) &nbsp; Results of {{$data['quantity']}} @endif
            </p>
          </div>

 </form>
 </div>
<div class="col-md-12">
   
    <div class="table-responsive">
        <table class="table table-bordered table-condensed table-striped">
            <thead>
              <?php $count = 1; ?>
                <th>{{__('sentence.number')}}</th>
                <th>{{__('sentence.ID')}}</th>
                <th>{{__('sentence.type')}}</th>
                <th>{{__('sentence.day')}}</th>
                <th>{{__('sentence.status')}}</th>
                <th>{{__('sentence.description')}}</th>
                <th>{{__('sentence.action')}}</th>
            </thead>

            <tbody>
                @foreach($data['holidays'] as $holiday)
                <tr>
                    <td>{{$data['holidays'] ->perPage()*($data['holidays']->currentPage()-1)+$count}}</td>
                    <td>{{$holiday->id }}</td>
                    <td>{{$holiday->type }}</td>
                    <td>{{$holiday->days }}</td>
                    <td>{{$holiday->status }}</td>
                    <td>{{$holiday->description }}</td>
                    
                    <td>
                    <a href="{{route('holidays.show',$holiday->id)}}"><i class="fa fa-eye text-success  fa-lg"></i></a>
                    <a href="{{ route('holidays.edit', $holiday->id) }}"><i class="fa fa-edit"></i></a>
                    <a onClick="onClickDelete({{$holiday->id}})" class=" delete" data-value="{{$holiday->id}}" data-toggle="modal" data-target="#exampleModal"> <i class="fa fa-trash fa-lg text-danger"></i></a>
                    
                    </td>

                </tr>
                <?php $count++; ?>
                @endforeach
            </tbody>

        </table>
        
        <form style="display:inline" action="" method="POST" id="delete-form">
                @csrf
                @method('DELETE')
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content ">
            <div class="modal-header " >
                <span class="icon"><i class="fa fa-exclamation-triangle"></i></span>
                <p class="modal-title ml-2" id="myModalLabel">Are you sure delete this holidays? </p>
                <button type="button" class="close " data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>                 
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">{{__('sentence.cancel')}}</button>
            <button type="submit" class="btn btn-primary" name="delete_dividend" >{{__('sentence.delete')}}</button>
            </div>
            </form>
        </div>
    </div>
</div>
            </form>

    </div>
    <div>

        {!! $data['holidays']->withQueryString()->links('pagination.paginate') !!}
    
    </div>
   
</div>
   

<script>
  function checkID(i){
            var id=document.getElementById('valid_id');
            if(isInteger(i)){
                id.innerText="ID must number";
                id.style.visibility="visible";
            }
          
            else{
                id.style.visibility="hidden";
            }
        }
  function checkDay(e){
            var day = document.getElementById('valid_day');
            if(isNaN(e)){
                day.innerText = "Days must number";
                day.style.visibility = "visible";
            }if(e<1 || e>100){
                   day.innerText = "Days have min 1 max 100"; 
                   day.style.visibility = "visible";    
                }else{
                   day.style.visibility = "hidden";
                   checkDateDiff(); 
                }
            }   
  
   function insertParam(key, value) {
    key = escape(key);
    value = escape(value);
    var kvp = document.location.search.substr(1).split('&'); // return array ['record=50']
    if (kvp == '') {
        document.location.search = '?' + key + '=' + value;
    } else if (length.kvp == 1) {
        var i = kvp.length;
        var x;
        while (i--) {
            x = kvp[i].split('='); // page,2

            if (x[0] == key) {
                x[1] = value;
                kvp[i] = x.join('=');
                break;
            }
        }
        if (i < 0) { kvp[kvp.length] = [key, value].join('='); }
        //this will reload the page, it's likely better to store this until finished
        document.location.search = kvp.join('&');
    } else {
        var i = kvp.length;
        var x;
        while (i--) {
            x = kvp[i].split('='); // page,2

            if (x[0] == 'page') {
                x[1] = 1;
                kvp[i] = x.join('=');
            }
            if (x[0] == key) {
                x[1] = value;
                kvp[i] = x.join('=');
                break;
            }
        }
        if (i < 0) { kvp[kvp.length] = [key, value].join('='); }
        //this will reload the page, it's likely better to store this until finished
        document.location.search = kvp.join('&');
    }
}
    const onClickDelete = (id) => {
    const deleteForm = document.getElementById('delete-form');
    deleteForm.action = '/holidays/' + id;
};

    function submitdelete() {
    deleteForm.submit();
}

</script>


@endsection


