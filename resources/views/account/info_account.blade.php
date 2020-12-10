@extends('company_layout')
@section('title', 'Thông tin tài khoản')
@section('content')
<div class="right_col" role="main" style="min-height: 1000px">

    <div class="">

        <div class="row">
            <div class="col-md-12 col-sm-12 ">
                <div class="x_panel">
                    <div class="x_title">
                        <h2><a href="/home">{{__('sentence.HomePage')}} / </a><a
                                href="/account/info">{{__('sentence.InfoAccount')}}</a></h2>
                        <div class="clearfix"></div>
                    </div>

                    @if (Session::has('message'))
                    <div class="modal" id="modalSuccess">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title">{{__('sentence.Notification')}}</h4>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div class="modal-body">
                                    {{ Session::get('message') }}
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

                        <div class="col-md-6 col-sm-6 " style="border:0px solid #e5e5e5;">

                            <h3 class="prod_title">{{__('sentence.FullName')}}: {{$data['user']->fullname}}</h3>

                            <br />

                            <h3 class="prod_title">{{__('sentence.EmailAddress')}}: {{$data['user']->email}}</h3>

                            <br />

                            <h3 class="prod_title">{{__('sentence.Role')}}: {{$data['role']->name}}</h3>

                            <br />

                            <h3 class="prod_title">{{__('sentence.Address')}}: Khu 2, Xã Hoàng Cương, Huyện Thanh
                                Ba, Tỉnh Phú Thọ, Hoàng
                                Cương,
                                Thanh Ba, Phú Thọ, Việt Nam</h3>

                            <br />

                            <div class="">
                                <button type="submit" class="btn btn-primary btn-lg"
                                    onclick="window.location.href='/account/edit'">{{__('sentence.EditInfo')}}</button>

                                <button type="submit" class="btn btn-info btn-lg"
                                    onclick="window.location.href='/account/password/edit'">{{__('sentence.ChangePassword')}}</button>
                                </form>
                            </div>

                        </div>

                        <div class="col-md-6 col-sm-6 ">
                            <div class="product-image">
                                <img class="img-thumbnail"
                                    src="{{asset('assets/images/avatar/'.$data['user']->avatar)}}"
                                    alt=" {{$data['user']->avatar}}" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
