@extends('company_layout')
@section('title', 'Đổi mật khẩu')
@section('content')
<div class="right_col" role="main" style="min-height: 1000px">

    <div class="">

        <div class="row">
            <div class="col-md-12 col-sm-12 ">
                <div class="x_panel">
                    <div class="x_title">
                        <h2><a href="/home">{{__('sentence.HomePage')}} / </a><a
                                href="/account/info">{{__('sentence.InfoAccount')}} / </a><a
                                href="/account/password/edit"> {{__('sentence.ChangePassword')}} </a></h2>
                        <div class="clearfix"></div>
                    </div>

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

                    <div class="x_content">
                        <form action="/account/password/update" method="POST" id="changePassword">
                            @csrf

                            <div class="col-md-6 col-sm-6 " style="border:0px solid #e5e5e5;">
                                <h3 class="prod_title">{{__('sentence.EmailAddress')}}: {{$user->email}}</h3>

                                <h3 class="prod_title">{{__('sentence.OldPassword')}}: </h3>
                                <input type="password" class="form-control " name="oldPassword">
                                <br />

                                <h3 class="prod_title">{{__('sentence.NewPassword')}}: </h3>
                                <input type="password" class="form-control " name="newPassword" id="newPassword">
                                <br />

                                <h3 class="prod_title">{{__('sentence.ConfirmPassword')}}: </h3>
                                <input type="password" class="form-control " name="confirmPassword">
                                <br />

                                <div class="">
                                    <button type="sumit"
                                        class="btn btn-primary btn-lg">{{__('sentence.ChangePassword')}}</button>
                                    <button type="reset" class="btn btn-info btn-lg">{{__('sentence.Refresh')}}</button>
                                </div>
                            </div>

                            <div class="col-md-6 col-sm-6 ">
                                <div class="product-image">
                                    <img class="img-thumbnail" src="{{asset('assets/images/avatar/'.$user->avatar)}}"
                                        alt=" {{$user->avatar}}" />
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
@endsection
