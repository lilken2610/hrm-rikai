@extends('company_layout')
@section('title', 'Tìm kiếm công ty')
@section('content')
<div class="right_col" role="main" style="min-height: 1000px">
    <div style="align-items: center">
        @if(Session::has('message_delete'))
        <div class="modal" id="modalDelete">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">
                            {{__('sentence.Notification')}}
                        </h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">{{__('sentence.DeletedSuccessfully')}} {{Session::get('message_delete')}}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-info"
                            data-dismiss="modal">{{__('sentence.Closed')}}</button>
                    </div>
                </div>
            </div>
        </div>
        @endif

        @if(Session::has('message_login_success'))
        <div class="modal" id="modalLogin">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">
                            {{__('sentence.LoggedInSuccessfully')}}
                        </h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        {{__('sentence.Hello')}}, {{Session::get('message_login_success')}} </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-info"
                            data-dismiss="modal">{{__('sentence.Closed')}}</button>
                    </div>
                </div>
            </div>
        </div>
        @endif
    </div>
    <div class="row">
        <div class="x_panel">
            <div class="x_title">
                <h2>
                    <a href="/home">{{__('sentence.HomePage')}} / </a>
                    <a href="/companies">{{__('sentence.ListOfCompanies')}}</a>
                </h2>
                <div class="clearfix"> </div>
            </div>
            <div class="x_content">
                <br />
                <form class="form-horizontal form-label-left" action="/companies/search" method="GET" id="formSearch">
                    <div class="container">
                        <div class="row">
                            <div class="col-4">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend"> <span class="input-group-text widthcol2" style="border-radius: 2rem 0rem 0rem 2rem; width:
                                            140px;">{{__('sentence.CompanyName')}}:</span>
                                    </div>
                                    <input id="companyName" type="text" placeholder="{{__('sentence.ExCompanyName')}}"
                                        class="form-control" name="companyName" @if(!empty($data[ 'companyName' ]))
                                        value="{{$data['companyName']}}" @endif maxlength="255"
                                        style="border-radius: 0rem 2rem 2rem 0rem;">
                                </div>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend"> <span class="input-group-text widthcol2" style="border-radius: 2rem 0rem 0rem 2rem; width:
                                            140px;">{{__('sentence.Description')}}:</span>
                                    </div>
                                    <input id="companyDescription" type="text"
                                        placeholder="{{__('sentence.ExDescription')}}" class="form-control"
                                        name="companyDescription" @if(!empty($data[ 'companyDescription' ]))
                                        value="{{$data['companyDescription']}}" @endif maxlength="10000"
                                        style="border-radius: 0rem 2rem 2rem 0rem;">
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend"> <span class="input-group-text widthcol2" style="border-radius: 2rem 0rem 0rem 2rem; width:
                                            140px;">{{__('sentence.DateCreate')}}:</span>
                                    </div>
                                    <input id="searchCreated_at" class="date-picker
                                                      form-control" placeholder="dd/mm/yyyy" name="created_at"
                                        type="text" @if(!empty($data[ 'created_at' ])) value="{{$data['created_at']}}"
                                        @endif onfocus="this.type='date'" onmouseover="this.type='date'"
                                        onclick="this.type='date'" onblur="this.type='text'"
                                        onmouseout="timeFunctionLong(this)" style="border-radius: 0rem 2rem 2rem 0rem;">
                                </div>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend"> <span class="input-group-text widthcol2" style="border-radius: 2rem 0rem 0rem 2rem; width:
                                            140px;">{{__('sentence.UpdateDate')}}:</span>
                                    </div>
                                    <input id="searchUpdated_at" class="date-picker form-control"
                                        placeholder="dd/mm/yyyy" name="updated_at" @if(!empty($data[ 'updated_at' ]))
                                        value="{{$data['updated_at']}}" @endif type="text" onfocus="this.type='date'"
                                        onmouseover="this.type='date'" onclick="this.type='date'"
                                        onblur="this.type='text'" onmouseout="timeFunctionLong(this)"
                                        style="border-radius: 0rem 2rem 2rem 0rem;">
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend"> <span class="input-group-text widthcol2" style="border-radius: 2rem 0rem 0rem 2rem; width:
                                            140px;">{{__('sentence.Creator')}}:</span>
                                    </div>
                                    <select class="form-control" name="created_by" id="searchCreated_by"
                                        style="border-radius: 0rem 2rem 2rem 0rem;">
                                        <option value=""> {{__('sentence.Creator')}}</option>
                                        @foreach ($data['users']
                                        as $item)
                                        <option value="{{$item->id}}" @if (!empty($data[ 'created_by' ]))
                                            {{ ( $item->id == $data['created_by']) ? 'selected' : '' }} @endif>
                                            {{$item->fullname}} </option> @endforeach
                                    </select>
                                </div>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend"> <span class="input-group-text widthcol2" style="border-radius: 2rem 0rem 0rem 2rem; width:
                                            140px;">{{__('sentence.TheUpdatedPerson')}}:</span> </div>
                                    <select class="form-control" name="updated_by" id="searchUpdated_by"
                                        style="border-radius: 0rem 2rem 2rem 0rem;">
                                        <option value=""> {{__('sentence.TheUpdatedPerson')}} </option>
                                        @foreach($data['users'] as $item)
                                        <option value="{{$item->id}}" @if (!empty($data[ 'updated_by' ]))
                                            {{ ( $item->id == $data['updated_by']) ? 'selected' : '' }} @endif>
                                            {{$item->fullname}} </option> @endforeach
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="container">
                            <div class="row justify-content-md-center">
                                <div class="col-md-5">
                                    <div class="col-md-3 col-sm-12  form-group">
                                        <button type="submit"
                                            class="btn btn-primary text-left">{{__('sentence.Search')}}</button>
                                    </div>
                                    <div class="col-md-3 col-sm-12  form-group">
                                        <button type="button" class="btn btn-secondary text-left"
                                            onclick="resetFunction()">{{__('sentence.Refresh')}}</button>
                                    </div>
                                    <div class="col-md-6 col-sm-12  form-group">
                                        <button type="button" class="btn btn-info text-left"
                                            onclick="location.href='/companies/create'">{{__('sentence.CreateANewCompany')}}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
    <div class="clearfix"></div>
    <div class="row">
        <div class="col-md-12 col-sm-12 ">
            <div class="x_panel">
                <div class="x_content">
                    <div class="row">
                        <div class="col-sm-12">
                            @if(!empty($data['companies']->total()))
                            <div class="col" style="text-align: left">
                                <div class="dataTables_length" id="datatable_length"> {{__('sentence.Show')}}
                                    <label>
                                        <select name="limit" id="searchLimit" class="form-control input-sm"
                                            onchange="insertParam('limit', value)"> @foreach ($arrayName =
                                            array(10, 20, 30, 40, 50 ); as $item)
                                            <option value="{{$item}}" @if (!empty($data['limit' ]))
                                                {{ ( $item== $data['limit']) ? 'selected' : '' }} @else
                                                {{ ( $item=='20' ) ? 'selected' : ''}} @endif> {{ $item }}
                                            </option> @endforeach </select>
                                        </form>
                                    </label> {{__('sentence.of')}} {{$data['companies']->total()}}
                                    {{__('sentence.result')}}&nbsp;&nbsp;
                                    <button type="button" data-toggle="modal" data-target="#modalDeleteMultiple"
                                        class="btn btn-danger" id="bulk-delete"
                                        style="display:none">{{__('sentence.Closed')}}</button>
                                </div>
                            </div>
                            <form action="/companies/deleteAll" method="POST">
                                @csrf
                                <div class="modal fade-scale" id="modalDeleteMultiple" tabindex="-1" role="dialog"
                                    aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLongTitle">
                                                    {{__('sentence.DeleteCompany')}}
                                                </h5>
                                                <button type="button" class="close" data-dismiss="modal"
                                                    aria-label="Close"> <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                {{__('sentence.DoYouWantToDeleteTheseCompanies')}}?
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary"
                                                    data-dismiss="modal">{{__('sentence.Closed')}}</button>
                                                <button type="submit"
                                                    class="btn btn-danger">{{__('sentence.Delete')}}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <table id="datatable" class="table table-striped table-bordered" style="width:100%">
                                    <thead>
                                        <tr>
                                            <th style="width: 60px;">{{__('sentence.Choose')}}</th>
                                            <th>{{__('sentence.No.')}} </th>
                                            <th>{{__('sentence.CompanyName')}} </th>
                                            <th>{{__('sentence.Description')}} </th>
                                            <th style="width: 150px;"> {{__('sentence.DateCreate')}} </th>
                                            <th style="width: 150px;"> {{__('sentence.UpdateDate')}} </th>
                                            <th style="width: 150px;">{{__('sentence.Creator')}} </th>
                                            <th style="width: 150px;"> {{__('sentence.TheUpdatedPerson')}} </th>
                                            <th style="text-align: center; width: 130px;">
                                                {{__('sentence.Function')}} </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        @php $count = 1; @endphp
                                        @foreach ($data['companies'] as $item)
                                        <tr>
                                            <td><input type="checkbox" onClick="checkbox_is_checked()" name="id[]"
                                                    value="{{$item['id']}}" class="check-all"></td>
                                            <th scope="row">
                                                {{$data['companies']->perPage()*($data['companies']->currentPage()-1)+$count}}
                                            </th>
                                            <td>{{$item->name}} </td>
                                            <td>{{Str::limit($item->description, 50)}} </td>
                                            <td>{{$item->created_at->format('d/m/Y H:i:s')}} </td>
                                            <td>{{$item->updated_at->format('d/m/Y H:i:s')}} </td>
                                            <td>{{$item->user_create->fullname }} </td>
                                            <td>{{$item->user_update->fullname }} </td>
                                            <td>
                                                <a style="color: Dodgerblue;" href="/companies/{{$item->id}}/edit"
                                                    target="_blank" aria-labelby="hero-title"><i
                                                        class="fa fa-edit fa-2x">&nbsp;&nbsp;</i></a>

                                                <a style="color: red" type="button" data-toggle="modal"
                                                    data-target="#deleteModal{{$item->id}}"><i
                                                        class=" fa fa-trash fa-2x">&nbsp;&nbsp;</i>
                                                </a>
                                                <div class="modal fade-scale" id="deleteModal{{$item->id}}"
                                                    tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                                                    aria-hidden="true">
                                                    <div class="modal-dialog" role="document">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h5 class="modal-title" id="exampleModalLongTitle">
                                                                    {{__('sentence.DeleteCompany')}}
                                                                </h5>
                                                                <button type="button" class="close" data-dismiss="modal"
                                                                    aria-label="Close"> <span
                                                                        aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div class="modal-body">
                                                                {{__('sentence.DoYouWantToDelete')}}:
                                                                {{$item->name}}?
                                                            </div>
                                                            <div class="modal-footer">
                                                                <button type="button" class="btn btn-secondary"
                                                                    data-dismiss="modal">{{__('sentence.Closed')}}</button>
                                                                <button type="button" class="btn btn-danger"
                                                                    onclick="window.location.href='/companies/delete/{{$item->id}}'">{{__('sentence.Delete')}}</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <a style="color: brown" type="button" data-toggle="modal"
                                                    data-target="#infoModal{{$item->id}}"
                                                    data-whatever="@getbootstrap"><i
                                                        class="fa fa-info-circle fa-2x"></i>
                                                </a>

                                                <div class="modal fade" id="infoModal{{$item->id}}" tabindex="-1"
                                                    role="dialog" aria-labelledby="exampleModalLabel"
                                                    aria-hidden="true">
                                                    <div class="modal-dialog" role="document">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h5 class="modal-title" id="exampleModalLabel">
                                                                    {{__('sentence.CompanyInformation')}}
                                                                </h5>
                                                                <button type="button" class="close" data-dismiss="modal"
                                                                    aria-label="Close"> <span
                                                                        aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <form>
                                                                    <div class="form-group">
                                                                        <label for="recipient-name"
                                                                            class="col-form-label-lg">{{__('sentence.CompanyName')}}:</label>
                                                                        <dd> - {{$item->name}} </dd>
                                                                    </div>
                                                                    <hr>
                                                                    <div class="form-group">
                                                                        <label for="message-text"
                                                                            class="col-form-label-lg">{{__('sentence.Description')}}:</label>
                                                                        <dd> - {{$item->description}} </dd>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                            <div class="modal-footer">
                                                                <button type="button" class="btn btn-secondary"
                                                                    data-dismiss="modal">{{__('sentence.Closed')}}</button>
                                                                <button type="button" class="btn btn-primary"
                                                                    onclick="window.location.href='/companies/{{$item->id}}'"
                                                                    data-target="_blank">{{__('sentence.Details')}}</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr> @php $count++; @endphp @endforeach
                                    </tbody>
                                </table>
                            </form>
                            @else
                            <div class="row justify-content-md-center" style="max-height: 55px">
                                <div class="col-md-auto">
                                    <div class="x_content bs-example-popovers">
                                        <div class="alert alert-danger alert-dismissible " role="alert">
                                            <strong>{{__('sentence.NoSearchResultsPleaseChooseAgain')}}!</strong>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
            <div class="row align-items-center justify-content-center"> {!!
                $data['companies']->appends(Request::except('page'))->render() !!} </div>
        </div>
    </div>
</div>
@endsection
