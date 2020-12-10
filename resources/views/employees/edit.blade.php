@extends('base')

@section('edit')
<div class="main_container">

    @include('navigation/nav')

    <!-- page content -->
    <form class="right_col" role="main" style="height: 730px;" 
        action="{{route('employees.update',$data['employee']->id)}}" method="post" novalidate="" enctype = "multipart/form-data" >
        @method('PATCH')
        @csrf
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
                    <h2><a href="/employees">{{ __('sentence.employee') }}</a>
                        <a href="/employees/{{$data['employee']->id}}"> / {{$data['employee']->name}}</a>
                        <a href="/employees/{{$data['employee']->id}}/edit"> / {{ __('sentence.edit') }}</a></h2>
                </div>
                <div class="clearfix">
                </div>
                <div class="row mt-2">
                    <div class="col-md-12 col-sm-12">
                        <div class="x_panel">
                            <div class="x_content">
                             
                                <div class="col-sm-9 col-md-9">
                                    <div class="field item form-group ">
                                        <label
                                            class="col-form-label col-md-3 col-sm-3 d-flex align-items-center label-align">{{ __('sentence.name') }}
                                            <span class="required">*</span></label>
                                        <div class="col-md-8 col-sm-8">
                                            <input class="form-control" type="text" name="name"
                                                data-validate-minmax="10,100"  required="required"
                                                value="{{$data['employee']->name}}"></div>
                                        <div class="alert">please put something here</div>
                                    </div>
                                    <div class="field item form-group ">
                                        <label
                                            class="col-form-label col-md-3 col-sm-3 d-flex align-items-center label-align">{{ __('sentence.email') }}<span
                                                class="required">*</span></label>
                                        <div class="col-md-8 col-sm-8">
                                            <input class="form-control" type="email" name="email"
                                                data-validate-minmax="10,100" required="required" 
                                                value="{{$data['employee']->email}}">
                                        </div>
                                        <div class="alert">please put something here</div>
                                    </div>

                                    <div class="field item form-group ">
                                        <label
                                            class="col-form-label col-md-3 col-sm-3 d-flex align-items-center label-align">{{ __('sentence.day of birth') }}
                                            <span class="required">*</span></label>
                                        <div class="col-md-8 col-sm-8">
                                            <input class="form-control" type="date" name="day_of_birth"
                                                data-validate-minmax="10,100" required="required"  max='2000-12-31'
                                                value="{{$data['employee']->day_of_birth}}">
                                        </div>
                                        <div class="alert">please put something here</div>
                                    </div>
                                    <div class="field item form-group ">
                                        <label
                                            class="col-form-label col-md-3 col-sm-3 d-flex align-items-center label-align">{{ __('sentence.address') }}
                                            <span class="required">*</span></label>
                                        <div class="col-md-8 col-sm-8">
                                            <input class="form-control" type="text" name="address"
                                                data-validate-minmax="10,100" required="required"
                                                value="{{$data['employee']->address}}"></div>
                                        <div class="alert">please put something here</div>
                                    </div>
                                    <div class="field item form-group ">
                                        <label
                                            class="col-form-label col-md-3 col-sm-3 d-flex align-items-center label-align">{{ __('sentence.gender') }}
                                            <span class="required">*</span></label>
                                        <div class="col-md-8 col-sm-8">
                                            <select class="form-control" type="number" name="gender"
                                                data-validate-minmax="10,100" required="required">
                                                <option value="0">{{ __('sentence.female') }}</option>
                                                <option value="1">{{ __('sentence.male') }}</option>
                                            </select>
                                        </div>
                                        <div class="alert">please put something here</div>
                                    </div>
                                    <div class="field item form-group ">
                                        <label
                                            class="col-form-label col-md-3 col-sm-3 d-flex align-items-center label-align">{{ __('sentence.identification card') }}<span
                                                class="required">*</span></label>
                                        <div class="col-md-8 col-sm-8">
                                            <input class="form-control" type="text" name="identification_card"
                                                data-validate-minmax="10,100" required="required"
                                                value="{{$data['employee']->identification_card}}"></div>
                                        <div class="alert">please put something here</div>
                                    </div>

                                    <div class="field item form-group ">
                                        <label
                                            class="col-form-label col-md-3 col-sm-3 d-flex align-items-center label-align">{{ __('sentence.phone') }}
                                            <span class="required">*</span></label>
                                        <div class="col-md-8 col-sm-8">
                                            <input class="form-control" type="text" name="phone"
                                                data-validate-minmax="10,100" required="required"
                                                value="{{$data['employee']->phone}}"></div>
                                        <div class="alert">please put something here</div>
                                    </div>
                                    <div class="field item form-group ">
                                        <label
                                            class="col-form-label col-md-3 col-sm-3 d-flex align-items-center label-align">{{ __('sentence.position') }}
                                            <span class="required">*</span></label>
                                        <div class="col-md-8 col-sm-8">
                                            <select class="form-control" name="position_id" data-validate-minmax="10"
                                                required="required">
                                                <option value="">{{ __('sentence.choose positions') }}</option>
                                                @foreach ($data['positions'] as $position)
                                                <option value="{{$position->id}}" {{ old('position_id') == $position->id ? 'selected' : '' }}>{{$position->name}}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                        <div class="alert">please put something here</div>
                                    </div>
                                    <div class="field item form-group ">
                                        <label
                                            class="col-form-label col-md-3 col-sm-3 d-flex align-items-center label-align">{{ __('sentence.department') }}<span
                                                class="required">*</span></label>
                                        <div class="col-md-8 col-sm-8">
                                            <select class="form-control" name="department_id"
                                                data-validate-minmax="10,100" required="required">
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
                                            <button type="submit" class="btn btn-success save">{{ __('sentence.save') }} </button>
                                            <a href="{{'#'}}" class="cancel-modal btn btn-secondary cancel"  data-toggle="modal" data-target="#cancel">{{ __('sentence.cancel') }}</a>
                                          </div>
                                        </div>
                                      </div>
                                </div>
                                <div class="col-sm-3 col-md-3 image shadow-sm bg-light rounded">
                                    <img  class="image row ml-0" src="/images/{{$data['employee']->image}}"  alt="Content imgage">
                                    <div class="field item form-group mt-3 d-flex justify-content-start ">                                  
                                        <input type="file"  class="form-control p-0 hidden" name="image" value="{{old('image')}}">
                                        <input type="text" hidden value="{{$data['employee']->image}}" name="image_current">                                                                          
                                   </div>
                                </div>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
    </form>
    @include('modal/cancel')
</div>
@include('footer/footer')
@endsection

@section('edit_js')
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