<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Welcome Admin</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css">
  <!-- Bootstrap core CSS -->
  <link href="css/bootstrap.min.css" rel="stylesheet">
  <!-- Material Design Bootstrap -->
  <link href="css/mdb.min.css" rel="stylesheet">
  <!-- Your custom styles (optional) -->
  <link href="css/style.css" rel="stylesheet">
  <script type="text/javascript" src="js/jquery-3.4.1.min.js"></script>
  <!-- Bootstrap tooltips -->
  <script type="text/javascript" src="js/popper.min.js"></script>
  <!-- Bootstrap core JavaScript -->
  <script type="text/javascript" src="js/bootstrap.min.js"></script>
  <!-- MDB core JavaScript -->
  <script type="text/javascript" src="js/mdb.min.js"></script>
   <link href='fullcalendar/main.css' rel='stylesheet' />
    <script src='fullcalendar/main.js'></script>
</head>
<!-- Navbar -->
<!-- Navbar -->
<!-- Navbar -->
<!-- Navbar -->
<!-- Navbar -->
<!-- Navbar -->
<div style="background:#875A7B">
<nav class="navbar navbar-expand-lg navbar-dark " style="background:#875A7B">

  <!-- Collapse button -->
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent3"
    aria-controls="navbarSupportedContent3" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <!-- Collapsible content -->
  <div class="collapse navbar-collapse" id="navbarSupportedContent3"style="background:#875A7B">

    <!-- Links -->
    <ul class="navbar-nav mr-auto">

      <!-- News -->
      <li class="nav-item active">
        <a class="nav-link " id="navbarDropdownMenuLink5" 
          aria-haspopup="true" aria-expanded="false" href="./trang_chu">Bảng Thông tin
        </a>
      </li>
      <button class="btn btn-primary dropdown-toggle " data-toggle="dropdown"
  aria-haspopup="true" aria-expanded="false" style="background:#875A7B">Nghỉ của tôi</button>

<div class="dropdown-menu" >
  <a class="dropdown-item" href="./holidays">Tóm tắt nghỉ</a>
  <a class="dropdown-item" href="./trang_chu">Xin nghỉ</a>
  
</div>
<!-- Basic dropdown -->
      <li class="nav-item active">
        <a class="nav-link " id="navbarDropdownMenuLink5" 
          aria-haspopup="true" aria-expanded="false" href="#">Nghỉ chờ duyệt
        </a>
      </li>
      
    </ul>
    <!-- Links -->

    <!-- Search form -->
    
      <div class="md-form my-0" style="background:#875A7B">
        <li class="nav-item active" style="list-style: none;" >
        <a class="navbar-nav " id="navbarDropdownMenuLink5" style="color: #fff" href="#">Admin
        </a>
      </li>
      
      </div>
    

  </div>
  <!-- Collapsible content -->

</nav>
</div >
<!-- Navbar -->
<!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-dark " style=" margin-top: 2px;margin-left: 1px;padding-left: 1px">

  <!-- Collapse button -->
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent3"
    aria-controls="navbarSupportedContent3" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <!-- Collapsible content -->
  <div class="collapse navbar-collapse" id="navbarSupportedContent3">

    <!-- Links -->
    <ul class="navbar-nav mr-auto">

      <!-- News -->
      <li class="nav-item active">
        <a class="nav-link " id="navbarDropdownMenuLink5" 
          aria-haspopup="true" aria-expanded="false" href="#" style="color:black;font-size:50px;margin-left: 0px">
          Tất cả ngày nghỉ
        </a>
      </li>



    </ul>
    <!-- Links -->

    <!-- Search form -->
    
<form action="./search_employee_holiday" method="GET" role="search">
    <div class="input-group">
        <input type="text" class="form-control" name="query2" id="query2"
            placeholder="Search..."> <span class="input-group-btn">
            <button type="submit" class="btn btn-default">
                <span class="glyphicon glyphicon-search"></span>
            </button>
        </span>
    </div>
</form>
    
  </div>

  <!-- Collapsible content -->

</nav>
<!-- Navbar -->
<br/>


<div class="col-md-12">

    @if(isset($employee_holidays))
        <p> The Search results for your query are :</p>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Days</th>
                <th>Status</th>
                <th>start_time</th>
                <th>end_time</th>
                <th>Created_by</th>
                <th>Updated_by</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            @foreach($employee_holidays as $employee_holiday)
            <tr>
                <td>{{ $employee_holiday->employee->name }}</td>
                <td>{{ $employee_holiday->holiday->type }}</td>
                <td>{{ $employee_holiday->days }}</td>
                <td>{{ $employee_holiday->status }}</td>
                <td>{{ $employee_holiday->start_time }}</td>
                <td>{{ $employee_holiday->end_time }}</td>
                <td>{{ $employee_holiday->created_by }}</td>
                <td>{{ $employee_holiday->updated_by }}</td>
                      
                   
            </tr>
            @endforeach
        </tbody>
    </table>
    @endif
    
</div>


</script>


</body>
</html>