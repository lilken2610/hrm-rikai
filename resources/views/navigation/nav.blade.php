<div class="col-md-3 left_col">
    <div class="left_col scroll-view">
      <div class="navbar nav_title" style="border: 0;">
        <a href="{{route('employees.index')}}" class="site_title"><i class="fa fa-paw"></i>
          <span>{{ __('sentence.home') }}</span></a>
      </div>
      <div class="clearfix"></div>
      <!-- menu profile quick info -->
      <div class="profile clearfix">
        <div class="profile_pic">
          <img src="{{asset('assets')}}/images/cropper.jpg" class="img-circle profile_img">
        </div>
        <div class="profile_info">
          <span>{{ __('sentence.welcome') }}</span>
          <h2>John Doe</h2>
        </div>
      </div>
      <!-- /menu profile quick info -->
      <br>
      <!-- sidebar menu -->
      <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
        <div class="menu_section">
          <h3>{{ __('sentence.general') }}</h3>
          <ul class="nav side-menu">
            <li><a><i class="fa fa-user"></i> {{ __('sentence.employee') }} <span class="fa fa-chevron-down"></span></a>
              <ul class="nav child_menu">
                <li><a href="index.html">Dashboard</a></li>
                <li><a href="index2.html">Dashboard2</a></li>
                <li><a href="index3.html">Dashboard3</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <!-- /sidebar menu -->

      <!-- /menu footer buttons -->
      <div class="sidebar-footer hidden-small">
        <a data-toggle="tooltip" data-placement="top" title="" data-original-title="Settings">
          <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
        </a>
        <a data-toggle="tooltip" data-placement="top" title="" data-original-title="FullScreen">
          <span class="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>
        </a>
        <a data-toggle="tooltip" data-placement="top" title="" data-original-title="Lock">
          <span class="glyphicon glyphicon-eye-close" aria-hidden="true"></span>
        </a>
        <a data-toggle="tooltip" data-placement="top" title="" href="login.html" data-original-title="Logout">
          <span class="glyphicon glyphicon-off" aria-hidden="true"></span>
        </a>
      </div>
      <!-- /menu footer buttons -->
    </div>
  </div>

  <!-- top navigation -->
  <div class="top_nav">
    <div class="nav_menu">
      <div class="nav toggle">
        <a id="menu_toggle"><i class="fa fa-bars"></i></a>
      </div>
      <nav class="nav navbar-nav">
        <ul class=" navbar-right">
          <li class="nav-item dropdown open" style="padding-left: 15px;">
            <a href="javascript:;" class="user-profile dropdown-toggle" aria-haspopup="true" id="navbarDropdown"
              data-toggle="dropdown" aria-expanded="false">
              <img src="http://127.0.0.1:8000/assets/images/cropper.jpg" alt="">John Doe
            </a>
            <div class="dropdown-menu dropdown-usermenu pull-right" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="javascript:;"> Profile</a>
              <a class="dropdown-item" href="javascript:;">
                <span class="badge bg-red pull-right">50%</span>
                <span>Settings</span>
              </a>
              <a class="dropdown-item" href="javascript:;">Help</a>
              <a class="dropdown-item" href="login.html"><i class="fa fa-sign-out pull-right"></i> Log
                Out</a>
            </div>
          </li>
          <li role="presentation" class="nav-item dropdown open">
            <a href="javascript:;" class="dropdown-toggle info-number" id="navbarDropdown1" data-toggle="dropdown"
              aria-expanded="false">
              <i class="fa fa-envelope-o"></i>
              <span class="badge bg-green">6</span>
            </a>
            <ul class="dropdown-menu list-unstyled msg_list" role="menu" aria-labelledby="navbarDropdown1">
              <li class="nav-item">
                <a class="dropdown-item">
                  <span class="image"><img src="http://127.0.0.1:8000/assets/images/cropper.jpg"
                      alt="Profile Image"></span>
                  <span>
                    <span>John Smith</span>
                    <span class="time">3 mins ago</span>
                  </span>
                  <span class="message" style="display: none;">
                    Film festivals used to be do-or-die moments for movie makers. They were
                    wherehttp://127.0.0.1:8000/assets.
                  </span>
                </a>
              </li>
              <li class="nav-item">
                <a class="dropdown-item">
                  <span class="image"><img src="http://127.0.0.1:8000/assets/images/cropper.jpg"
                      alt="Profile Image"></span>
                  <span>
                    <span>John Smith</span>
                    <span class="time">3 mins ago</span>
                  </span>
                  <span class="message" style="display: none;">
                    Film festivals used to be do-or-die moments for movie makers. They were
                    wherehttp://127.0.0.1:8000/assets.
                  </span>
                </a>
              </li>
              <li class="nav-item">
                <a class="dropdown-item">
                  <span class="image"><img src="http://127.0.0.1:8000/assets/images/cropper.jpg"
                      alt="Profile Image"></span>
                  <span>
                    <span>John Smith</span>
                    <span class="time">3 mins ago</span>
                  </span>
                  <span class="message" style="display: none;">
                    Film festivals used to be do-or-die moments for movie makers. They were
                    wherehttp://127.0.0.1:8000/assets.
                  </span>
                </a>
              </li>
              <li class="nav-item">
                <a class="dropdown-item">
                  <span class="image"><img src="http://127.0.0.1:8000/assets/images/cropper.jpg"
                      alt="Profile Image"></span>
                  <span>
                    <span>John Smith</span>
                    <span class="time">3 mins ago</span>
                  </span>
                  <span class="message" style="display: none;">
                    Film festivals used to be do-or-die moments for movie makers. They were
                    wherehttp://127.0.0.1:8000/assets.
                  </span>
                </a>
              </li>
              <li class="nav-item">
                <div class="text-center">
                  <a class="dropdown-item">
                    <strong>See All Alerts</strong>
                    <i class="fa fa-angle-right"></i>
                  </a>
                </div>
              </li>
            </ul>
          </li>
          <li class="language"><a href="http://127.0.0.1:8000/locale/en"><img
                src="http://127.0.0.1:8000/assets/images/england.png" width="10" height="10"> <small>EN</small></a></li>
          <li class="language"><a href="http://127.0.0.1:8000/locale/jp"><img
                src="http://127.0.0.1:8000/assets/images/japan.png" width="10" height="10"> <small>JP</small></a></li>
        </ul>
      </nav>
    </div>
  </div>
    <!-- top navigation -->
