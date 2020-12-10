<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laravel 8 & CRUD_APP</title>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet" type="text/css" />
    <!-- Bootstrap -->
    <link href="{{ asset('assets') }}/vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="{{ asset('assets') }}/vendors/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <!-- NProgress -->
    <link href="{{ asset('assets') }}/vendors/nprogress/nprogress.css" rel="stylesheet">
    <!-- Custom styling plus plugins -->
    <link href="{{ asset('assets') }}/build/css/custom.min.css" rel="stylesheet">
    {{-- Style css --}}
    <link rel="stylesheet" href="{{asset('css/style.css')}}">
    @yield('css')
    @yield('search_css')
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-toast-plugin/1.3.2/jquery.toast.min.css" 
    integrity="sha512-wJgJNTBBkLit7ymC6vvzM1EcSWeM9mmOu+1USHaRBbHkm6W9EgM0HY27+UtUaprntaYQJF75rc8gjxllKs5OIQ==" crossorigin="anonymous" />
   
    @toastr_css
</head>

<body class="nav-md">
    <div class="container body" >
        {{-- <div class="row justify-content-center success message">
           
          </div> --}}
        @yield('index')
        @yield('create')
        @yield('search')
        @yield('edit')
        @yield('show')
    </div>
    <script src="{{asset('js/app.js')}}" type="text/js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script src="{{ asset('assets') }}/vendors/validator/multifield.js"></script>
    <script src="{{ asset('assets') }}/vendors/validator/validator.js"></script>
    <!-- jQuery -->
    <script src="{{ asset('assets') }}/vendors/jquery/dist/jquery.min.js"></script>
    <!-- Bootstrap -->
    <script src="{{ asset('assets') }}/vendors/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <!-- FastClick -->
    <script src="{{ asset('assets') }}/vendors/fastclick/lib/fastclick.js"></script>
    <!-- NProgress -->
    <script src="{{ asset('assets') }}/vendors/nprogress/nprogress.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
    setTimeout(function() {
            $('.message').slideUp();
        }, 10000);
    });
    </script>
    <!-- Custom Theme Scripts -->
    <script src="{{ asset('assets') }}/build/js/custom.min.js"></script>
    <script src="https://cdn.jsdelivr.net/jquery.validation/1.16.0/jquery.validate.min.js"></script>

    @yield('index_js')
    @yield('search_js')
    @yield('create_js')
    @yield('show_js')
    @yield('edit_js')
    <script src="http://cdn.bootcss.com/jquery/2.2.4/jquery.min.js"></script>
    <script>
        $(document).ready(function (e) {
            $(document).on("click", ".delete-modal", function (e) {
                var delete_id = $(this).attr('data-value');
                $('button[name="delete_dividend"]').val(delete_id);
            });
        });
    </script>
</body>
@jquery
@toastr_js
@toastr_render

</html>