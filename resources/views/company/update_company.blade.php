@extends('company_layout')
@section('title', 'Cập nhật công ty '. $company['name'])
@section('content')
<div class="right_col" role="main" style="min-height: 1000px">
    <div class="row">
        <div class="col-md-12 col-sm-12 ">
            <div class="x_panel">
                <div class="x_title">
                    <h2><a href="/home">{{__('sentence.HomePage')}} / </a><a
                            href="/companies">{{__('sentence.ListOfCompanies')}} / </a> <a
                            href="/companies/{{$company['id']}}/edit">{{__('sentence.CompanyUpdate')}}
                            {{$company['name']}}
                        </a></h2>
                    <div class="clearfix"></div>
                </div>
                <div class="x_content">
                    <br />
                    @if(Session::has('message_ok'))
                    <div class="modal" id="modalSuccess">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title">{{__('sentence.Notification')}}</h4>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div class="modal-body">
                                    {{__('sentence.SuccessfulCompanyUpdate')}} {{Session::get('message_ok')}}
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-info"
                                        data-dismiss="modal">{{__('sentence.Closed')}}</button>
                                </div>

                            </div>
                        </div>
                    </div>
                    @endif
                    @if ($errors->any())
                    <div class="modal" id="modalErrors">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title">{{__('sentence.Notification')}}</h4>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div class="modal-body">
                                    @foreach ($errors->all() as $error)
                                    <li style="color: red">{{ $error }}</li>
                                    @endforeach
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-info"
                                        data-dismiss="modal">{{__('sentence.Closed')}}</button>
                                </div>

                            </div>
                        </div>
                    </div>
                    @endif
                    <form action="/companies/update" method="POST" id="formUpdateCompany">
                        @method('PUT')
                        @csrf
                        <input type="text" hidden name="id" value="{{$company['id']}}">
                        <div class="item form-group">
                            <label class="col-form-label col-md-3 col-sm-3 label-align">{{__('sentence.CompanyName')}}
                                <span>*</span>
                            </label>
                            <div class="col-md-6 col-sm-6 ">
                                <input type="text" class="form-control " name="name" value="{{$company['name']}}"
                                    maxlength="255">
                            </div>
                        </div>

                        <div class="item form-group">
                            <label class="col-form-label col-md-3 col-sm-3 label-align">{{__('sentence.Description')}}
                                <span>*</span>
                            </label>
                            <div class="col-md-6 col-sm-6 ">
                                <textarea class="form-control " name="description" rows="8"
                                    maxlength="10000">{{$company['description']}}</textarea>
                            </div>
                        </div>

                        <div class="ln_solid"></div>
                        <div class="item form-group">
                            <div class="col-md-6 col-sm-6 offset-md-3">
                                <button class="btn btn-primary" type="reset">{{__('sentence.Refresh')}}</button>
                                <button type="submit" class="btn btn-success">{{__('sentence.Update')}}</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
