@extends('base')

@section('create')
<div class="main_container">
  
  @include('navigation/nav')

  <!-- page content -->
  <div class="right_col" role="main" style="min-height: 705px;">
    <div class="">
      <div class="page-title">
        <div class="row justify-content-center message">
          @if ($errors->any())
          <div class="alert alert-danger">
            <ul>
              @foreach ($errors->all() as $error)
              <li>{{ $error }}</li>
              @endforeach
            </ul>
          </div><br />
          @endif
        </div>
        <div class="title_left">
          <h2><a href="/employees">{{ __('sentence.employee') }}</a><a href="/employees/create"> / {{ __('sentence.create') }}</a></h2>
        </div>
      </div>
      <div class="clearfix"></div>
      <div class="row mt-2">
        <div class="col-md-12 col-sm-12">
          <div class="x_panel">
            <div class="x_content">
              <form action="{{route('employees.store')}}" method="post" novalidate="" enctype = "multipart/form-data">
                @csrf
                <div class="field item form-group ">
                  <label
                    class="col-form-label col-md-3 col-sm-3  label-align">{{ __('sentence.upload') }}<span
                      class="required">*</span></label>
                  <div class="col-md-6 col-sm-6">
                  <input type="file" name="image" class="form-control" value="{{old('image')}}"></div>
                  <div class="alert">please put something here</div>
                </div>
                <div class="field item form-group ">
                  <label class="col-form-label col-md-3 col-sm-3  label-align">{{ __('sentence.name') }}<span
                      class="required">*</span></label>
                  <div class="col-md-6 col-sm-6">
                  <input class="form-control" name="name" placeholder="ex. John f. Kennedy" value="{{old('name')}}" required="required">
                  </div>
                  <div class="alert">please put something here</div>
                </div>
                <div class="field item form-group ">
                  <label class="col-form-label col-md-3 col-sm-3  label-align">{{ __('sentence.email') }}<span
                      class="required">*</span></label>
                  <div class="col-md-6 col-sm-6">
                    <input class="form-control" name="email" required="required" type="email" value="{{old('email')}}"></div>
                  <div class="alert">please put something here</div>
                </div>
                <div class="field item form-group ">
                  <label class="col-form-label col-md-3 col-sm-3  label-align">{{ __('sentence.confirm email') }}<span
                      class="required">*</span></label>
                  <div class="col-md-6 col-sm-6">
                    <input class="form-control" type="email" name="confirm_email" data-validate-linked="email" value="{{old('confirm_email')}}"
                      required="required" ></div>
                  <div class="alert">please put something here</div>
                </div>
                <div class="field item form-group ">
                  <label class="col-form-label col-md-3 col-sm-3  label-align">{{ __('sentence.day of birth') }}<span
                      class="required">*</span></label>
                  <div class="col-md-6 col-sm-6">
                    <input id="datefield" class="form-control" type="date" name="day_of_birth" value="{{old('day_of_birth')}}" 
                    required="required" max='2000-12-31'>
                  </div>
                  <div class="alert">please put something here</div>
                </div>

                <div class="field item form-group ">
                  <label class="col-form-label col-md-3 col-sm-3  label-align">{{ __('sentence.phone') }}<span
                      class="required">*</span></label>
                  <div class="col-md-6 col-sm-6">
                    <input class="form-control" type="tel" name="phone" value="{{old('phone')}}" required="required"></div>
                  <div class="alert">please put something here</div>
                </div>
                <div class="field item form-group ">
                  <label class="col-form-label col-md-3 col-sm-3  label-align">{{ __('sentence.address') }} <span
                      class="required">*</span></label>
                  <div class="col-md-6 col-sm-6">
                    <input class="form-control" type="text" name="address" value="{{old('address')}}" required="required"></div>
                  <div class="alert">please put something here</div>
                </div>
                <div class="field item form-group ">
                  <label class="col-form-label col-md-3 col-sm-3  label-align">{{ __('sentence.gender') }} <span
                      class="required">*</span></label>
                  <div class="col-md-6 col-sm-6">
               
                    <select class="form-control" type="text" name="gender" required="required">
                      <option value="0" {{ old('gender') == '0' ? 'selected' : '' }}>{{ __('sentence.female') }}</option>
                      <option value="1" {{ old('gender') == '1' ? 'selected' : '' }}>{{ __('sentence.male') }}</option>
                    </select>
                  </div>
                  <div class="alert">please put something here</div>
                </div>
                <div class="field item form-group ">
                  <label
                    class="col-form-label col-md-3 col-sm-3  label-align">{{ __('sentence.identification card') }}<span
                      class="required">*</span></label>
                  <div class="col-md-6 col-sm-6">
                    <input class="form-control" type="text" name="identification_card" value="{{old('identification_card')}}" required="required"></div>
                  <div class="alert">please put something here</div>
                </div>
                <div class="field item form-group ">
                  <label class="col-form-label col-md-3 col-sm-3  label-align">{{ __('sentence.position') }} <span
                      class="required">*</span></label>
                  <div class="col-md-6 col-sm-6">
                    <select class="form-control" name="position_id"  required="required">
                      <option value="">{{ __('sentence.choose positions') }}</option>
                      @foreach ($data['positions'] as $position)
                      <option value="{{$position->id}}"  {{ old('position_id') == $position->id ? 'selected' : '' }}>{{$position->name}} </option>
                      @endforeach
                    </select>
                  </div>
                  <div class="alert">please put something here</div>
                </div>
                <div class="field item form-group ">
                  <label class="col-form-label col-md-3 col-sm-3  label-align">{{ __('sentence.department') }}<span
                      class="required">*</span></label>
                  <div class="col-md-6 col-sm-6">
                    <select class="form-control" name="department_id" data-validate-minmax="10,100" required="required">
                      <option value="">{{ __('sentence.choose departments') }}</option>
                      @foreach ($data['departments'] as $department)
                      <option value="{{$department->id}}" {{ old('department_id') == $department->id ? 'selected' : '' }}>{{$department->name}}</option>
                      @endforeach
                    </select>
                  </div>
                  <div class="alert">please put something here</div>
                </div>

             
                <div class="ln_solid">
                  <div class="form-group">
                    <div class="col-md-6 offset-md-3">
                      <button type="submit" class="btn btn-primary">{{ __('sentence.submit') }}</button>
                      <button type="reset" class="btn btn-secondary">{{ __('sentence.reset') }}</button>
                    </div>
                  </div>
                </div>    
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- /page content -->
@include('footer/footer')
@endsection

@section('create_js')
<!-- Javascript functions	-->
<script>
  function hideshow(){
			var password = document.getElementById("password1");
			var slash = document.getElementById("slash");
			var eye = document.getElementById("eye");
			
			if(password.type === 'password'){
				password.type = "text";
				slash.style.display = "block";
				eye.style.display = "none";
			}
			else{
				password.type = "password";
				slash.style.display = "none";
				eye.style.display = "block";
			}

		}
</script>
<script>
  // initialize a validator instance from the "FormValidator" constructor.
        // A "<form>" element is optionally passed as an argument, but is not a must
        var validator = new FormValidator({
            "events": ['blur', 'input', 'change']
        }, document.forms[0]);
        // on form "submit" event
        document.forms[0].onsubmit = function(e) {
            var submit = true,
                validatorResult = validator.checkAll(this);
            console.log(validatorResult);
            return !!validatorResult.valid;
        };
        // on form "reset" event
        document.forms[0].onreset = function(e) {
            validator.reset();
        };
        // stuff related ONLY for this demo page:
        $('.toggleValidationTooltips').change(function() {
            validator.settings.alerts = !this.checked;
            if (this.checked)
                $('form .alert').remove();
        }).prop('checked', false);

</script>

@endsection