@extends('master')
@section('create')
<div role="main" style="min-height: 705px;">
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
          <h3>{{ __('sentence.Holidays') }}</h3>
        </div>
      </div>
            <div class="container">
              <form action="{{route('holidays.store')}}" method="post" novalidate="">
                @csrf
                <div class="field item form-group ">
                  <label class="col-form-label col-md-3 col-sm-12  label-align">{{ __('sentence.type') }}<span
                      class="required">*</span></label>
                  <div class="col-md-6 col-sm-6">
                    <input class="form-control" name="type" placeholder="Type" required="required">
                  </div>
                  <div class="alert">please put something here</div>
                </div>
                <div class="field item form-group ">
                  <label class="col-form-label col-md-3 col-sm-3  label-align">{{ __('sentence.day') }}<span
                      class="required">*</span></label>
                  <div class="col-md-6 col-sm-6">
                    <input class="form-control" type="number" name="days" id="days" required="required"  onblur="checkDay(this.value)"  ></div>
                    <strong id="valid_day" style="visibility: hidden; color: red"></strong>
                  <div class="alert">please put something here</div>
                </div>
                <div class="field item form-group ">
                  <label class="col-form-label col-md-3 col-sm-3  label-align">{{ __('sentence.status') }}<span
                      class="required">*</span></label>
                  <div class="col-md-6 col-sm-6">
                    <input class="form-control" name="status"  type="text"
                      required="required"></div>
                  <div class="alert">please put something here</div>
                </div>
                <div class="field item form-group ">
                  <label class="col-form-label col-md-3 col-sm-3  label-align">{{ __('sentence.description') }}<span
                      class="required">*</span></label>
                  <div class="col-md-6 col-sm-6">
                    <input class="form-control" type="text" name="description" required="required"></div>
                  <div class="alert">please put something here</div>
                </div>

                <div class="field item form-group ">
                  <label class="col-form-label col-md-3 col-sm-3  label-align">{{ __('sentence.start_time') }}<span
                      class="required">*</span></label>
                  <div class="col-md-6 col-sm-6">
                    <input class="form-control" type="date" name="start_time" id="start_time" required="required" onblur="checkDateDiff()"></div>
                  <div class="alert">please put something here</div>
                </div>
                <div class="field item form-group ">
                  <label class="col-form-label col-md-3 col-sm-3  label-align">{{ __('sentence.end_time') }} <span
                      class="required">*</span></label>
                  <div class="col-md-6 col-sm-6">
                    <input class="form-control" type="date" name="end_time" id="end_time" required="required" onblur="checkDateDiff()"></div>
                  <div class="alert">please put something here</div>
                  <strong id="valid_diff_date" style="visibility: hidden; color: red"></strong>
                </div>
                <div class="field item form-group ">
                  <label class="col-form-label col-md-3 col-sm-3  label-align">{{ __('sentence.company_id') }} <span
                      class="required">*</span></label>
                  <div class="col-md-6 col-sm-6">
                    <select class="form-control" type="text" name="company_id" required="required" id="company_id">
                      <@foreach($data['companies'] as $company)
                        <option value="{{$company->id}}" >
                        {{$company->id}}
                        </option>
              @endforeach
                    </select>
                  </div>
                  <div class="alert">please put something here</div>
                </div>
                <div class="field item form-group ">
                  <label
                    class="col-form-label col-md-3 col-sm-3  label-align">{{ __('sentence.created_by') }}<span
                      class="required">*</span></label>
                  <div class="col-md-6 col-sm-6">
                    <input class="form-control" type="text" name="created_by" required="required"></div>
                  <div class="alert">please put something here</div>
                </div>
                <div class="field item form-group ">
                  <label
                    class="col-form-label col-md-3 col-sm-3  label-align">{{ __('sentence.updated_by') }}<span
                      class="required">*</span></label>
                  <div class="col-md-6 col-sm-6">
                    <input class="form-control" type="text" name="updated_by" required="required"></div>
                  <div class="alert">please put something here</div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 text-center">
                <button type="submit" class="btn btn-primary">{{__('sentence.submit')}}</button>
            </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  
  
<!-- /page content -->
<!-- Javascript functions	-->
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
        function checkID(i){
            var id=document.getElementById('valid_id');
            if(isNaN(i)){
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
            }else if(e===""){
                day.innerText="Day must not be empty";
                day.style.visibility = "visible";  
            } else{
                if(e<1 || e>100){
                   day.innerText = "Days have min 1 max 100"; 
                   day.style.visibility = "visible";    
                }else{
                   day.style.visibility = "hidden";
                   checkDateDiff(); 
                }
            }   
        } 
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
                    valid_diff.innerText = "Range of Start time and End time must equal Days";
                } else{
                    valid_diff.style.visibility = "hidden";
                }
            }
        }
</script>



@endsection
