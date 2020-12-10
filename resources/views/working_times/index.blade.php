@extends('workingtimeLayout')
@section('content')
<div class="right_col">  
        @if (session('message'))
            <div class="alert alert-success section">
                {{ session('message') }}
            </div>
        @endif
    <div class="title">
        <header>
            <h2>
                {{__('sentence.title')}}
            </h2>
    </div>
<form action="{{route('search')}}" method="GET" class="frmsearch" id="searchform">
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text widthcol2" id="basic-addon1">ID:</span>
                    </div>
                    <input type="text" id="idemployee" class="form-control" name="id" placeholder="{{__('sentence.id')}}" maxlength="10"
                        aria-label="Username" aria-describedby="basic-addon1" value="{{request()->get('id')}}">
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text widthcol2" id="basic-addon1">{{__('sentence.tbname')}}:</span>
                    </div>
                    <input type="text" id="name" class="form-control" name="name" placeholder="{{__('sentence.name')}}"
                aria-label="Username" aria-describedby="basic-addon1" value="{{request()->get('name')}}" maxlength="115">
                </div>
            </div>
            <div class="col">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text widthcol2" id="basic-addon1" >{{__('sentence.startday')}}:</span>
                    </div>
                    <input type="date" id="startday" class="form-control" data-date-format="YYYY/MM/DD" name="startday" 
                    aria-label="Username" aria-describedby="basic-addon1" value="{{request()->get('startday')}}">
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text widthcol2" id="basic-addon1" >{{__('sentence.endday')}}:</span>
                    </div>
                    <input type="date" id="endday" class="form-control" data-date-format="YYYY/MM/DD" name="endday" 
                    aria-label="Username" aria-describedby="basic-addon1" value="{{request()->get('endday')}}">
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row" style="margin: 20px">
            <div class="col-md-3"></div>
            <div class=" col-12 col-ms-8 col-md-8 col-xs-6">
            <button type="submit" class="btn btn-primary col search" >{{__('sentence.search')}}</button> 
            <button type="button" class="btn btn-success col" onclick="printDiv()">{{__('sentence.print')}}</button>
            <a href="{{route('workingtimes.create')}}" class="">
                <button type="button" class="btn btn-info">{{__('sentence.create')}}</button>
            </a>
            <button type="button" class="btn btn-secondary" onclick="resetform()">{{__('sentence.clear')}}</button>
            </div>
        </div>
    </div>
    <div class="input-group-prepend col-md-2">
        <span class="input-group-text" id="basic-addon1" style="border-radius: 0px;">{{__('sentence.row')}}:</span>  
        <select class="custom-select form-control" name="limit" id="limit" onchange="insertParam('limit',value)"> 
            <option value="15" @if(request()->limit == '15') selected @endif>15</option>
            <option value="30" @if(request()->limit == '30') selected @endif>30</option>
            <option value="50" @if(request()->limit == '50') selected @endif>50</option>
        </select>
    </div>
       </form>
    <div class="col-md-12 col-ms-12">
        <div class="x_panel">
            <div class="x_title">
                <p class="found" >{{$number}} {{__('sentence.record')}}</p>
                <div class="clearfix"></div>
                <button type="button" data-toggle="modal" data-target="#modalDeleteMultiple"
                                        class="btn btn-danger" id="bulk-delete" style="display:none">{{__('sentence.deleteall')}}</button>
            </div>
        <div class="x_content" >
        <div id="table">    
        <form action="{{route('deleteAll')}}" method="POST">
             @csrf
            <div class="modal fade-scale" id="modalDeleteMultiple" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">
                                Delete time
                            </h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span></button>
                        </div>
                    <div class="modal-body"> Are you sure delete the select the row?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                        <button type="submit" class="btn btn-danger">Xóa</button>
                    </div>
                    </div>
                </div>
            </div>
         <table class="table table-striped center" >
                <thead>
                    <tr>
                        <th></th>
                        <th scope="col">No</th>
                        <th scope="col">ID</th>
                        <th scope="col">{{__('sentence.tbname')}}</th>
                        <th scope="col">Check-in</th>
                        <th scope="col">Check-out</th>
                        <th scope="col">{{__('sentence.action')}}</th>
                    </tr>
                </thead>
                <tbody>
                <?php $count = 1; ?>
                @foreach($workingtimes as $workingtime)
                    <tr>
                        <td>
                        <input type="checkbox" onClick="checkbox_is_checked()" name="id[]" value="{{$workingtime['id']}}" class="check-all"></td>                       
                        <th scope="row">{{$workingtimes->perPage()*($workingtimes->currentPage()-1)+$count}}</th>
                        <td>{{$workingtime->employee_id}}</td>
                        <td>{{$workingtime->employee->name}}</td>
                        <!-- If type == check-out -->
                        @if($workingtime->type == 2)
                        <td></td>
                        <td>{{$workingtime->time}}</td>
                        <!-- If type == check-in -->
                        @else($workingtime->type == 1)
                        <td>{{$workingtime->time}}</td>
                        <td></td>
                        @endif
                        <td>
                            <a href="{{route('workingtimes.edit', $workingtime->id) }}">
                                <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                </svg>
                            </a>
                            <a data-toggle="modal" data-target="#exampleModal" class="btndelete" onClick="onClickDelete({{$workingtime->id}})" style="color:red;">
                                <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                </svg>
                            </a>
                        </td>
                    </tr>
                <?php $count++; ?>
                @endforeach
                </tbody>
            </table>
            </form>
            </div>
            <iframe name="print_frame" width="200" height="0" frameborder="0" src="about:blank"></iframe>      
            <form style="display:inline" action="" method="post" id="delete-form">
                @csrf
                @method('DELETE')
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header" style="background-color: #2A3F54;">
                                <h5 class="modal-title" id="exampleModalLabel" style="color:white;">{{__('sentence.dltwarnning')}}</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                            </div>
                            <div class="modal-body">
                                <h1 style="text-align:center;">{{__('sentence.dltareyousure')}}?</h1>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal" style="width: 100px;">{{__('sentence.dltclose')}}</button>
                                <button type="submit" class="btn btn-danger" data-toggle="modal" data-target="#successdelete" onClick="submitdelete()" style="width: 67px;">{{__('sentence.dltyes')}}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-4" style="padding-left: 20px;">
        {!! $workingtimes->withQueryString()->links('working_times.pagination.paginate') !!}
        </div>
    </div>
@endsection