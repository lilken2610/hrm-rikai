<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{__('sentence.Login')}} | Rikai Technology</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="{{asset('assets/css/customCss/loginResetPassWord.css')}}">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
    <script src="{{asset('assets/js/jquery.validate.js')}}"></script>
    <link rel="stylesheet" href="{{asset('assets/css/customCss/company.css')}}">
    <script src="{{asset('assets/js/customJs/login.js')}}"></script>
</head>

<body>
    <div class="container">
        <div class="row">
            <div class="col-md-4 offset-md-4 form login-form">
                <form action="/send_login" method="POST" id="formLogin">
                    @csrf
                    <h2 class="text-center">{{__('sentence.Login')}}</h2>
                    <p class="text-center">{{__('sentence.TextBelowLogin')}}</p>
                    @if (Session('message_error'))
                    <div class="alert alert-danger align-content-between">
                        <li>{{Session::get('message_error')}}</li>
                    </div>
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
                        <input class="form-control" name="email" placeholder="{{__('sentence.EmailAddress')}}">
                    </div>
                    <div class="form-group">
                        <input class="form-control" type="password" name="password"
                            placeholder="{{__('sentence.Password')}}">
                    </div>

                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" name="remember_me" id="checkbox">
                        <label class="form-check-label" for="exampleCheck1">{{__('sentence.RememberMe')}}</label>
                    </div>

                    <div class="form-group">
                        <input class="form-control button" type="submit" name="login" value="{{__('sentence.Login')}}">
                    </div>
                    <div class="link login-link text-center">
                        {{__('sentence.DoYouForgotPassword')}} <a
                            href="/reset_password">{{__('sentence.ResetPassword')}}</a></div>
                </form>
            </div>
        </div>
    </div>
</body>

</html>
