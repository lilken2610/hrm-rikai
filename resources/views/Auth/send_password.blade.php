<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
    <meta charset="utf-8" />
    <title>{{__('sentence.ResetPassword')}}</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="{{asset('assets/css/customCss/loginResetPassWord.css')}}">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
    <script src="{{asset('assets/js/jquery.validate.js')}}"></script>
    <link rel="stylesheet" href="{{asset('assets/css/customCss/company.css')}}">
    <script src="{{asset('assets/js/customJs/login.js')}}"></script>
</head>
<div class="container">
    <div class="row">
        <div class="col-md-4 offset-md-4 form">
            <form action="/send_resetpassword" method="POST" id="resetPassword">
                @csrf
                <h2 class="text-center">{{__('sentence.ResetPassword')}}</h2>
                @if (Session('message_email'))
                <div class="alert alert-danger text-center">{{Session::get('message_email')}}</div>
                @endif
                @if (Session('message_ok'))
                <div class="alert alert-success text-center">{{Session::get('message_ok')}}</div>
                @endif

                @if ($errors->any())
                <div class="alert alert-danger align-content-between">
                    <ul>
                        @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
                @endif

                <div class="form-group">
                    <input class="form-control" type="email" name="email" placeholder="{{__('sentence.EmailAddress')}}"
                        required value="">
                </div>

                <div class="form-group">
                    <input class="form-control button" type="submit" name="signup"
                        value="{{__('sentence.ResetPassword')}}">
                </div>
                <div class="link login-link text-center">
                    {{__('sentence.DoYOuHaveAccount')}} <a href="/login">{{__('sentence.LoginHere')}}</a></div>
            </form>
        </div>
    </div>
</div>
</body>

</html>
