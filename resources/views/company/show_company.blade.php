@extends('company_layout')
@section('title', 'Thông tin công ty')
@section('content')
<div class="main_container">
    <div class="right_col" role="main" style="min-height: 895px;">
        <div class="row">
            <div class="col-md-12 col-sm-12 ">
                <div class="x_panel">
                    <div class="x_title">
                        <div class="row justify-content-center message">
                            @if(session()->get('success'))
                            <div class="alert alert-success">
                                {{ session()->get('success') }}
                            </div>
                            @endif
                        </div>
                        <h2><a href="/home"> {{__('sentence.HomePage')}} / </a><a
                                href="/companies">{{__('sentence.ListOfCompanies')}} /
                            </a> <a href="/companies/{{$data['id']}}">{{__('sentence.CompanyInformation')}}
                                {{$data['name']}}
                            </a></h2>
                        <div class="clearfix">
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <div class="row">
                        <div class="container">
                            <div class="row justify-content-md-center">

                                <div class="col-md-6 col-sm-6 " style="border:0px solid #e5e5e5;">

                                    <h3 class="prod_title">{{__('sentence.CompanyName')}}: {{$data->name}}</h3>

                                    <br />

                                    <h3 class="prod_title">{{__('sentence.Description')}}: &#10;&#13;
                                        {{$data->description}}</h3>

                                    <br />

                                    <h3 class="prod_title">{{__('sentence.DateCreate')}}:
                                        {{$data->created_at->format('d/m/Y H:i:s')}}</h3>

                                    <br />

                                    <h3 class="prod_title">{{__('sentence.UpdateDate')}}:
                                        {{$data->updated_at->format('d/m/Y H:i:s')}}
                                    </h3>

                                    <br />

                                    <h3 class="prod_title">{{__('sentence.Creator')}}:
                                        {{$data->user_create->fullname}}</h3>

                                    <br />

                                    <h3 class="prod_title">{{__('sentence.TheUpdatedPerson')}}:
                                        {{$data->user_update->fullname}}
                                    </h3>

                                    <br />

                                    <button type="submit" class="btn btn-success edit btn-lg"
                                        onclick="window.location.href='/companies/{{$data->id}}/edit'">{{__('sentence.InformationCorrection')}}</button>


                                    <button type="button" class="btn btn-danger btn-lg" data-toggle="modal"
                                        data-target="#deleteModal">{{__('sentence.DeleteCompany')}}</button>

                                    <!-- Modal -->
                                    <div class="modal fade-scale" id="deleteModal" tabindex="-1" role="dialog"
                                        aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLongTitle">
                                                        {{__('sentence.DeleteCompany')}}
                                                    </h5>
                                                    <button type="button" class="close" data-dismiss="modal"
                                                        aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body"> {{__('sentence.DoYouWantToDelete')}}:
                                                    {{$data->name}}?
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary"
                                                        data-dismiss="modal">{{__('sentence.Closed')}}</button>
                                                    <button type="button" class="btn btn-danger"
                                                        onclick="window.location.href='/companies/delete/{{$data->id}}'">{{__('sentence.Delete')}}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
