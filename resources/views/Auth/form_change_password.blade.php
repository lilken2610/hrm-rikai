<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
    <meta charset="utf-8" />
    <title>{{__('sentence.ChangePassword')}}</title>
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
            <form action="{{URL::to('/send_password_with_token')}}" method="POST" id="changePassword">
                @csrf
                <h2 class="text-center">{{__('sentence.ChangePassword')}}</h2>
                @if (Session('message_error'))
                <div class="alert alert-danger text-center">{{Session::get('message_error')}}</div>
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

                <input type="hidden" name="token" required value="{{$token}}">

                <div class="form-group">
                    <input class="form-control" type="password" name="password" id="password"
                        placeholder="{{__('sentence.NewPassword')}}">
                </div>

                <div class="form-group">
                    <input class="form-control" type="password" name="re_password" id="re_password"
                        placeholder="{{__('sentence.ConfirmPassword')}}">
                </div>

                <div class="form-group">
                    <input class="form-control button" type="submit" name="signup"
                        value="{{__('sentence.ChangePassword')}}">
                </div>
                <div class="link login-link text-center">
                    {{__('sentence.DoYouHaveAccount')}} <a href="/login">{{__('sentence.LoginHere')}}</a></div>
            </form>
        </div>
    </div>
</div>
</body>

</html>
