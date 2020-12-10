<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- Meta, title, CSS, favicons, etc. -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Gentelella Alela! | </title>

    <!-- Bootstrap -->
<link href="{{asset('vendors/bootstrap/dist/css/bootstrap.min.css') }}" rel="stylesheet">

<link href="{{asset('vendors/font-awesome/css/font-awesome.min.css')}}" rel="stylesheet">

<link href="{{asset('vendors/nprogress/nprogress.css')}}" rel="stylesheet">

<link href="{{asset('vendors/iCheck/skins/flat/green.css')}}" rel="stylesheet">

<link href="{{asset('vendors/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css')}}" rel="stylesheet">

<link href="{{asset('vendors/jqvmap/dist/jqvmap.min.css')}}" rel="stylesheet">

<link href="{{asset('vendors/bootstrap-daterangepicker/daterangepicker.css')}}" rel="stylesheet">

<link href="{{asset('vendors/build/css/custom.min.css')}}" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" integrity="sha512-vKMx8UnXk60zUwyUnUPM3HbQo8QfmNx7+ltw8Pm5zLusl1XIfwcxo8DbWCqMGKaWeNxWA8yrx5v3SaVpMvR3CA==" crossorigin="anonymous" />
<link href="toastr.css" rel="stylesheet"/>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>


<script  src=//code.jquery.com/jquery-3.5.1.slim.min.js integrity="sha256-4+XzXVhsDmqanXGHaHvgh1gMQKX40OUvDEBTu8JcmNs=" crossorigin=anonymous>
</script>
<script src="{{ asset('vendors/validator/multifield.js') }}"></script>
    <script src="{{ asset('vendors/validator/validator.js') }}"></script>

    <link rel="stylesheet" href="http://cdn.bootcss.com/toastr.js/latest/css/toastr.min.css">

    @toastr_css
  </head>

  <body class="nav-md">
    <div class="container body">
      <div class="main_container">
        <div class="col-md-3 left_col">
          <div class="left_col scroll-view">
            <div class="navbar nav_title" style="border: 0;">
              <a href="index.html" class="site_title"><i class="fa fa-paw"></i> <span>{{__('sentence.Employees Manager')}}</span></a>
            </div>

            <div class="clearfix"></div>

            <!-- menu profile quick info -->
            
            <!-- /menu profile quick info -->

            <br />

            <!-- sidebar menu -->
            <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
              <div class="menu_section">
                <ul class="nav side-menu">
                  <li><a href="/employee_holidays"><i class="fa fa-edit"></i>{{ __('sentence.Employees Holidays')}}  <span class="fa fa-chevron-down"></span></a>
                    
                  </li>
                  <li><a href="/holidays"><i class="fa fa-edit"></i>{{ __('sentence.Holidays')}}<span class="fa fa-chevron-down"></span></a>
                    
                  </li>
                  
                  
                  
                  
                </ul>
              </div>
              

            </div>
            <!-- /sidebar menu -->

            <!-- /menu footer buttons -->
            
            <!-- /menu footer buttons -->
          </div>
        </div>

        <!-- top navigation -->
        <div class="top_nav">
            <div class="nav_menu">
                
                <nav class="nav navbar-nav">
                <ul class=" navbar-right">
                  <li class="nav-item dropdown open" style="padding-left: 15px;">
                    <a href="javascript:;" class="user-profile dropdown-toggle" aria-haspopup="true" id="navbarDropdown" data-toggle="dropdown" aria-expanded="false">
                      John Doejj
                    </a>
                    
                  </li>
                  <li class="language"><a href="http://127.0.0.1:8000/locale/en"><img
                src="./images/en.jpg" width="10" height="10"> <small>EN</small></a></li>
          <li class="language"><a href="http://127.0.0.1:8000/locale/jp"><img
              src="{{ asset('images/en.jpg') }}" width="10" height="10"> <small>JP</small></a></li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        <!-- /top navigation -->

        <!-- page content -->
        <div class="right_col" role="main">
          <div class="">
            <div class="page-title">
              <div class="title_left">
                <h3>{{__('sentence.table')}} <small></small></h3>
              </div>

              
            </div>
                 @yield('content')
                 @yield('create')
                 @yield('show')
                 @yield('show_em')
                 @yield('import_holidays')
                 @yield('edit')
                
                 @yield('content_emp')
                 @yield('edit_emp')
                 @yield('create_emp')

                </div>
              </div>
            </div>
          </div>
        </div>
         
        <!-- /page content -->

        <!-- footer content -->
        <footer>
          <div class="pull-right">
            Gentelella - Bootstrap Admin Template by <a href="https://colorlib.com">Colorlib</a>
          </div>
          <div class="clearfix"></div>
        </footer>
        <!-- /footer content -->
      </div>
    </div>
    @jquery
    @toastr_js
    @toastr_render
    <script src="http://cdn.bootcss.com/toastr.js/latest/js/toastr.min.js"></script>
       
    <script src="{{asset('js/app.js')}}" type="text/js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script src="{{ asset('vendors') }}/validator/multifield.js"></script>
    <script src="{{ asset('vendors') }}/validator/validator.js"></script>
    <!-- jQuery -->
    <script src="{{ asset('vendors') }}/jquery/dist/jquery.min.js"></script>
    <!-- Bootstrap -->
    <script src="{{ asset('vendors') }}/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <!-- FastClick -->
    <script src="{{ asset('vendors') }}/fastclick/lib/fastclick.js"></script>
    <!-- NProgress -->
    <script src="{{ asset('vendors') }}/nprogress/nprogress.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js" integrity="sha512-VEd+nq25CkR676O+pLBnDW09R7VQX9Mdiij052gVCp5yVH3jGtH70Ho/UUv4mJDsEdTvqRCFZg0NKGiojGnUCw==" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <!-- Custom Theme Scripts -->
    <script src="{{asset('gentelella-master')}}/build/js/custom.min.js"></script>
    <script src="https://cdn.jsdelivr.net/jquery.validation/1.16.0/jquery.validate.min.js"></script>
    <script src="jquery.min.js"></script>
    <script src="toastr.js"></script>
  </body>
</html>

