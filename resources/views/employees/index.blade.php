@extends('base')

@section('index')
<div class="main_container">
  
  @include('navigation/nav')

  <!-- page content -->
  <div class="right_col" role="main" style="min-height: 1102px;">
    <div class="">
     
      <div class="page-title">
       
      </div>
      <div class="clearfix">
        <h2><a href="/employees">{{ __('sentence.employee') }}</a></h2>
        <form class="row" method="get" action="{{route('search')}}" id="form">
          <div class="form-group col-sm-6 col-md-6 ">
            <label for="name" class="col-sm-2 col-form-label label-input">{{ __('sentence.name') }}</label>
            <div class="col-sm-10 div-input">
              <input type="text" class="form-control input" placeholder="{{ __('sentence.search for name') }}..."
                name="name" id="name" maxlength="50" @if(!empty($data['name'])) value="{{$data['name']}}" @endif>
            </div>
          </div>
          <div class="form-group col-sm-6 col-md-6 right">
            <label for="phone" class="col-sm-2 col-form-label label-input">{{ __('sentence.phone') }}</label>
            <div class="col-sm-10 div-input">
              <input type="text" class="form-control input " placeholder="{{ __('sentence.search for phone') }}..."
                name="phone" id="phone" maxlength="50" @if(!empty($data['phone'])) value="{{$data['phone']}}" @endif>
            </div>
          </div>
          <div class="form-group col-sm-6 col-md-6 ">
            <label for="email" class="col-sm-2 col-form-label label-input">{{ __('sentence.email') }}</label>
            <div class="col-sm-10 div-input">
              <input type="text" class="form-control input" placeholder="{{ __('sentence.search for email') }}..."
                name="email" id="email" maxlength="50" @if(!empty($data['email'])) value="{{$data['email']}}" @endif>
            </div>
          </div>
          <div class="form-group col-sm-6 col-md-6 right">
            <label for="age" class="col-sm-2 col-form-label label-input">{{ __('sentence.age') }}</label>
            <div class="col-sm-10 div-input">
              <input type="text" class="form-control input" placeholder="{{ __('sentence.search for age') }}..."
                name="age" id="age" maxlength="50" @if(!empty($data['age'])) value="{{$data['age']}}" @endif>
            </div>
          </div>
          <div class="form-group col-sm-12 col-md-12">

            <div class="d-flex justify-content-end">
              <button type="submit" class="btn btn-primary search" type="submit">{{ __('sentence.search') }}</button>
              <a class="btn btn-primary create" href="{{route('employees.create')}}">{{ __('sentence.create') }}</a>
            </div>
          </div>
          <div class="select input-group col-sm-12 col-md-12">
            <div class="input-group-prepend">
              <label class="input-group-text" for="record">{{ __('sentence.row') }}</label>
            </div>
            <select class="custom-select col-1" name='record' id="record" onchange="insertParam('record',value)">
              @foreach($values = array(25,50,100,250,500) as $value)
              <option value="{{$value}}" @if(request()->record == $value) selected @endif>
                {{$value}}
              </option>
              @endforeach
            </select>
            <p class="quantity d-flex align-items-center">
              @if(!@empty($data['quantity'])) &nbsp; Result of {{$data['quantity']}} @endif
            </p>
          </div>
        </form>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="x_panel">
            <div class="x_content">
              <section class="content invoice">
                <div class="row">
                  <table class="table table-striped">
                    <thead>
                      <?php $count = 1; ?>
                      <tr>
                        <th>No.</th>
                        <th>{{ __('sentence.name') }}</th>
                        <th>{{ __('sentence.phone') }}</th>
                        <th>{{ __('sentence.email') }}</th>
                        <th>{{ __('sentence.age') }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      @foreach($data['employees'] as $employee)
                      <tr>
                        <td>{{$data['employees'] ->perPage()*($data['employees']->currentPage()-1)+$count}}</td>
                        <td><a href="{{route('employees.show',$employee->id)}}">{{$employee->name}}</a></td>
                        <td>{{$employee->phone}}</td>
                        <td>{{$employee->email}}</td>
                        <td>{{$employee->age}}</td>
                      </tr>
                      <?php $count++; ?>
                      @endforeach
                    </tbody>
                  </table>
                  <div class="d-flex justify-content-end nav">
                    {!! $data['employees']->withQueryString()->links('pagination.paginate') !!}
                  </div>
                </div>
            </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- page content -->
@include('footer/footer')
@endsection

@section('index_js')
<script>
  $(document).ready(function () {
    $('#form').validate({ 
        rules: {
            age: {
                number:true,
                maxlength: 3
            },
            phone: {
                maxlength: 15
            },
            email:{
              maxlength: 40
            },
            name:{
              maxlength:40
            }

        },
          errorElement: 'span',
          errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
          },
          highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
          },
          unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
          }
    });
});
    function insertParam(key, value) {
        key = escape(key); 
        value = escape(value);
        var kvp = document.location.search.substr(1).split('&'); // return array ['record=50']
        if (kvp == '') {
            document.location.search = '?' + key + '=' + value;
        }
        else if(length.kvp == 1){
          var i = kvp.length; var x; while (i--) {
                x = kvp[i].split('='); // page,2
                
                if (x[0] == key) {
                    x[1] = value;
                    kvp[i] = x.join('=');
                    break;
                }
            }
            if (i < 0) { kvp[kvp.length] = [key, value].join('='); }
            // Reload the page, it's likely better to store this until finished
            document.location.search = kvp.join('&');
        }
        else {
          var i = kvp.length; var x; while (i--) {
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
            // Reload the page, it's likely better to store this until finished
            document.location.search = kvp.join('&');
        }     
    }
</script>
@endsection