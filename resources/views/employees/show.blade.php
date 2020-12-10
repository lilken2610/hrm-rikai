@extends('base')

@section('show')
<div class="main_container">
    
    @include('navigation/nav')

    <!-- page content -->
    <div class="right_col" role="main" style="min-height: 895px;" >
        <div class="">
            <div class="page-title">             
                <div class="title_left">
                    <h2><a href="/employees">{{ __('sentence.employee') }}</a><a href="/employees/{{$employee->id}}"> / {{$employee->name}}</a></h2>
                </div>
            </div>
            <div class="clearfix"></div>

            <div class="row mt-2">
                <div class="col-md-12 col-sm-12">
                    <div class="x_panel">
                        <div class="x_content">                        
                            <div class="col-sm-9 col-md-9">
                                <div class="field item form-group  ">
                                    <label class="col-form-label col-md-3 col-sm-3  label-align">{{ __('sentence.name') }} <span
                                            class="required">*</span></label>
                                    <div class="col-md-8 col-sm-8">
                                        <p class="form-control bottom" name="name"
                                            data-validate-minmax="10,100" 
                                    >{{$employee->name}}</p></div>                               
                                </div>
                                <div class="field item form-group  ">
                                    <label class="col-form-label col-md-3 col-sm-3  label-align">{{ __('sentence.email') }} <span
                                            class="required">*</span></label>
                                    <div class="col-md-8 col-sm-8">
                                        <p class="form-control bottom"  name="email"
                                            data-validate-minmax="10,100" 
                                           >{{$employee->email}}</p></div>                               
                                </div>

                                <div class="field item form-group  ">
                                    <label class="col-form-label col-md-3 col-sm-3  label-align">{{ __('sentence.day of birth') }} <span
                                            class="required">*</span></label>
                                    <div class="col-md-8 col-sm-8">
                                        <p class="form-control bottom" name="day_of_birth"
                                            data-validate-minmax="10,100" >{{$employee->day_of_birth}}</p></div>
                                
                                </div>
                                <div class="field item form-group  ">
                                    <label class="col-form-label col-md-3 col-sm-3  label-align">{{ __('sentence.address') }} <span
                                            class="required">*</span></label>
                                    <div class="col-md-8 col-sm-8">
                                        <p class="form-control bottom" name="address"
                                            data-validate-minmax="10,100"  >{{$employee->address}}</p></div>
                                
                                </div>
                              
                                <div class="field item form-group  ">
                                    <label class="col-form-label col-md-3 col-sm-3  label-align">{{ __('sentence.gender') }}<span
                                            class="required">*</span></label>
                                    <div class="col-md-8 col-sm-8">
                                        @if($employee->gender == 1)    <p class="form-control bottom" 
                                        data-validate-minmax="10,100" >{{ __('sentence.male') }}</p>
                                        @else  <p class="form-control bottom" 
                                        data-validate-minmax="10,100"  >{{ __('sentence.female') }}</p>
                                        @endif
                                     </div>                                
                                </div>                            
                                <div class="field item form-group  ">
                                    <label class="col-form-label col-md-3 col-sm-3  label-align">{{ __('sentence.identification card') }}<span class="required">*</span></label>
                                    <div class="col-md-8 col-sm-8">
                                        <p class="form-control bottom" name="identification_card"
                                    data-validate-minmax="10,100"  >{{$employee->identification_card}}</p></div>                               
                                </div>
                                <div class="field item form-group  ">
                                    <label class="col-form-label col-md-3 col-sm-3  label-align">{{ __('sentence.phone') }}<span
                                            class="required">*</span></label>
                                    <div class="col-md-8 col-sm-8">
                                        <p class="form-control bottom" name="phone"
                                    data-validate-minmax="10,100"  >{{$employee->phone}}</p>
                                    </div>
                                
                                </div>
                                <div class="field item form-group  ">
                                    <label class="col-form-label col-md-3 col-sm-3  label-align">{{ __('sentence.position') }} <span
                                            class="required">*</span></label>
                                    <div class="col-md-8 col-sm-8">
                                        <p class="form-control bottom" name="phone"
                                        data-validate-minmax="10,100"  >{{$employee->position_name}}</p>
                                    </div>                             
                                </div>
                                <div class="field item form-group  ">
                                    <label class="col-form-label col-md-3 col-sm-3  label-align">{{ __('sentence.department') }}<span
                                            class="required">*</span></label>
                                    <div class="col-md-8 col-sm-8">
                                        <p class="form-control bottom" name="phone"
                                        data-validate-minmax="10,100"  >{{$employee->department_name}}</p>
                                    </div>                               
                                </div>

                                <div class="ln_solid">
                                    <div class="form-group">
                                      <div class="col-md-6 offset-md-3">
                                        <a href="/employees/{{$employee->id}}/edit" class="btn btn-success edit">
                                            {{ __('sentence.edit') }} </a>
                                        <a href="{{'#'}}" class="delete-modal btn btn-danger delete" data-value="{{$employee->id}}" data-toggle="modal" data-target="#myModal">{{ __('sentence.delete') }}</a>
                                      </div>
                                    </div>
                                  </div>
                            </div>
                            <div class="col-sm-3 col-md-3 image shadow-sm  bg-light rounded">
                                <img class="image" src="/images/{{$employee->image}}" alt="Content imgage" >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    @include('modal/delete')

</div>
<!-- /page content -->

@include('footer/footer')

@endsection
@section('show_js')
@endsection