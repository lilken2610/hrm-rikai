<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
    <meta charset="utf-8" />
    <title>{{__('sentence.ChangePasswordSuccess')}}</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="{{asset('assets/css/customCss/loginResetPassWord.css')}}">
</head>
<div class="container">
    <div class="row">
        <div class="col-md-4 offset-md-4 form">
            <form action="/send_resetpassword" method="POST">
                @csrf
                <h2 class="text-center">Thành công</h2>
                @if (Session('message_email'))
                <div class="alert alert-danger text-center">{{__('sentence.ChangePasswordSuccess')}}</div>
                @endif
                @if (Session('message_ok'))
                <div class="alert alert-success text-center">{{__('sentence.ChangePasswordSuccess')}}</div>
                @endif
                <div class="link login-link text-center">
                    {{__('sentence.DoYouHaveAccount')}} <a href="/login">{{__('sentence.LoginHere')}}</a>
                </div>
            </form>
        </div>
    </div>
</div>
</body>

</html>
