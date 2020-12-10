import React from "react";
import axios from "axios";
import TableRow from "./TableRow";
import {Pagination} from 'react-laravel-paginex'
import {Link } from "react-router-dom";

class ListUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allUsers: [],
            rows: ["15", "20", "25", "30", "35"],
            currentPage: 1,
            data: {},
            users: [" "],
            total: 0,
            record: 15,
            current_page: 0,
            totalCurrent: 0,
            odlData: {
                email: '',
                fullname: '',
                status: '',
                created_at: '',
                updated_at: '',
                updated_by: ''
            },
            newData: {
                email: '',
                fullname: '',
                status: '',
                created_at: '',
                updated_at: '',
                updated_by: ''
            }
        };
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');
        axios.get("http://127.0.0.1:8000/api/auth/list-users?record="+this.state.record )
            .then(res => {
                this.setState({
                    allUsers: res.data.allUsers.data,
                    data: res.data.allUsers,
                    users: res.data.users,
                    total: res.data.total,
                    totalCurrent: res.data.allUsers.to,
                    current_page: res.data.allUsers.current_page
                });
            })
            .catch(error => console.log(error));
    }    

    tabRow() {
        const data = this.state;
        return this.state.allUsers.map(function (user, index) {
            return (
                <TableRow
                user={user}
                    key={index}
                    index={
                        data.current_page === 1
                                                        ? index + 1
                                                        : data.totalCurrent -
                                                        data
                                                            .record +
                                                        index +
                                                        1
                    }
                />
            );
        });
    }

    getData = (data) => {
        const { odlData } = this.state;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');
        axios.get('http://127.0.0.1:8000/api/auth/search-users?record=' + this.state.record, {
            params: {
                email: odlData.email,
                fullname: odlData.fullname,
                created_at: odlData.created_at,
                updated_at: odlData.updated_at,
                status: odlData.status,
                updated_by: odlData.updated_by,
                page: data.page
            }
        })
            .then(res => {
                this.setState({
                    allUsers: res.data.allUsers.data,
                    data: res.data.allUsers,
                    total: res.data.total,
                    totalCurrent: res.data.allUsers.to,
                    current_page: res.data.allUsers.current_page
                });
            })
            .catch(err => console.log(err));
    }

    handleChange(event) {
        const { newData } = this.state;
        const name = event.target.name;
        const value = event.target.value;
        const currentInputData = { ...newData, [name]: value };
        this.setState({
            newData: currentInputData,
        });
    }

    handleSearch = (event) => {
        const { newData } = this.state;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');
        axios.get('http://127.0.0.1:8000/api/auth/search-users?record=' + this.state.record, {
            params: {
                email: newData.email,
                fullname: newData.fullname,
                created_at: newData.created_at,
                updated_at: newData.updated_at,
                status: newData.status,
                updated_by: newData.updated_by
            }
        })
            .then(res => {
                this.setState({
                    odlData: newData,
                    allUsers: res.data.allUsers.data,
                    data: res.data.allUsers,
                    total: res.data.total,
                    totalCurrent: res.data.allUsers.to,
                    current_page: res.data.allUsers.current_page
                })
            })
            .catch(err => console.log(err));
    }

    handleRowSearch = (event) => {
        const { odlData } = this.state;
        const name = event.target.name;
        const value = event.target.value;
        const currentInputData = { ...odlData, [name]: value };
        event.preventDefault();
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');
        axios.get('http://127.0.0.1:8000/api/auth/search-users?record=' + currentInputData.record, {
            params: {
                email: currentInputData.email,
                fullname: currentInputData.fullname,
                created_at: currentInputData.created_at,
                updated_at: currentInputData.updated_at,
                status: currentInputData.status,
                updated_by: currentInputData.updated_by,
            }
        })
            .then(res => {
                this.setState({
                    allUsers: res.data.allUsers.data,
                    data: res.data.allUsers,
                    total: res.data.total,
                    record: currentInputData.record,
                    totalCurrent: res.data.allUsers.to,
                    current_page: res.data.allUsers.current_page
                });
            })
            .catch(err => console.log(err));
    }

    handleFormReset = () => {
        document.getElementById("formSearch").reset();
        this.setState({
            odlData: {
                email: '',
                fullname: '',
                status: '',
                created_at: '',
                updated_at: '',
                updated_by: ''
            },
            newData: {
                email: '',
                fullname: '',
                status: '',
                created_at: '',
                updated_at: '',
                updated_by: ''
            }
        });
    };


    render() {
        console.log(this.state.newData)
        return (
            <form className="form-horizontal form-label-left" onSubmit={(event) => this.handleSearch(event)} id="formSearch">
                <div className="right_col" role="main" style={{ minHeight: "1000px" }}>
                    <div className="row">
                        <div className="x_panel">
                            <div className="x_title">
                                <h2>
                                    <Link to={'/'}>Home Page / </Link>
                                    <Link to={'/users'}>List Users</Link>
                                </h2>
                                <div className="clearfix"> </div>
                            </div>
                            <div className="x_content">
                                <br />
                                <div className="container">
                                    <div className="row">
                                        <div className="col-4">
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span
                                                        className="input-group-text widthcol2"
                                                        style={{
                                                            borderRadius:
                                                                "2rem 0rem 0rem 2rem",
                                                            width: "140px",
                                                            height: "38px"
                                                        }}
                                                    >
                                                        Email:
                                                    </span>
                                                </div>
                                                <input
                                                    id="email"
                                                    type="text"
                                                    placeholder={"Rikai@technology..."}
                                                    className="form-control"
                                                    name="email"
                                                    onChange={event => {
                                                        this.handleChange(event);
                                                    }}
                                                    maxLength={255}
                                                    style={{
                                                        borderRadius:
                                                            "0rem 2rem 2rem 0rem"
                                                    }}
                                                />
                                            </div>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span
                                                        className="input-group-text widthcol2"
                                                        style={{
                                                            borderRadius:
                                                                "2rem 0rem 0rem 2rem",
                                                            width: "140px",
                                                            height: "38px"
                                                        }}
                                                    >
                                                        Full name:
                                                    </span>
                                                </div>
                                                <input
                                                    id="fullname"
                                                    type="text"
                                                    placeholder={'Big city moi...'}
                                                    className="form-control"
                                                    name="fullname"
                                                    onChange={event => {
                                                        this.handleChange(event);
                                                    }}
                                                    maxLength={10000}
                                                    style={{
                                                        borderRadius:
                                                            "0rem 2rem 2rem 0rem"
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span
                                                        className="input-group-text widthcol2"
                                                        style={{
                                                            borderRadius:
                                                                "2rem 0rem 0rem 2rem",
                                                            width: "140px",
                                                            height: "38px"
                                                        }}
                                                    >
                                                        Created at:
                                                    </span>
                                                </div>
                                                <input
                                                    id="searchCreated_at"
                                                    className="date-picker
                                                form-control"
                                                    placeholder="dd/mm/yyyy"
                                                    name="created_at"
                                                    onChange={event => {
                                                        this.handleChange(event);
                                                    }}
                                                    type="date"
                                                    style={{
                                                        borderRadius:
                                                            "0rem 2rem 2rem 0rem"
                                                    }}
                                                />
                                            </div>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span
                                                        className="input-group-text widthcol2"
                                                        style={{
                                                            borderRadius:
                                                                "2rem 0rem 0rem 2rem",
                                                            width: "140px",
                                                            height: "38px"
                                                        }}
                                                    >
                                                        Updated at:
                                                    </span>
                                                </div>
                                                <input
                                                    id="searchUpdated_at"
                                                    className="date-picker form-control"
                                                    placeholder="dd/mm/yyyy"
                                                    name="updated_at"
                                                    onChange={event => {
                                                        this.handleChange(event);
                                                    }}
                                                    type="date"
                                                    style={{
                                                        borderRadius:
                                                            "0rem 2rem 2rem 0rem"
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span
                                                        className="input-group-text widthcol2"
                                                        style={{
                                                            borderRadius:
                                                                "2rem 0rem 0rem 2rem",
                                                            width: "140px",
                                                            height: "38px"
                                                        }}
                                                    >
                                                        Status:
                                                    </span>
                                                </div>
                                                <select
                                                    className="form-control"
                                                    name="status"
                                                    onChange={event => {
                                                        this.handleChange(event);
                                                    }}
                                                    id="searchCreated_by"
                                                    style={{
                                                        borderRadius:
                                                            "0rem 2rem 2rem 0rem"
                                                    }}
                                                >
                                                    <option value=''>
                                                        Status
                                                    </option>
                                                    <option value='1'>
                                                        Active
                                                    </option>
                                                    <option value='2'>
                                                        UnActive
                                                    </option>
                                                    
                                                </select>
                                            </div>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span
                                                        className="input-group-text widthcol2"
                                                        style={{
                                                            borderRadius:
                                                                "2rem 0rem 0rem 2rem",
                                                            width: "140px",
                                                            height: "38px"
                                                        }}
                                                    >
                                                        Updated by:
                                                    </span>
                                                </div>
                                                <select
                                                    className="form-control"
                                                    name="updated_by"
                                                    onChange={event => {
                                                        this.handleChange(event);
                                                    }}
                                                    id="searchUpdated_by"
                                                    style={{
                                                        borderRadius:
                                                            "0rem 2rem 2rem 0rem"
                                                    }}
                                                >
                                                    <option value=''>
                                                        Updated by
                                                    </option>
                                                    {this.state.users.map((user, index) => (
                                                        <option value={user.id} key={index}>
                                                            {user.fullname}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="container my">
                                        <div className="row justify-content-md-center">
                                            <div className="col-md-4 col-sm-6">
                                                <div className="col-md-4 col-sm-4  form-group">
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary text-left"
                                                        onClick={this.handleSearch}
                                                    >
                                                        Search
                                                    </button>
                                                </div>
                                                <div className="col-md-4 col-sm-4  form-group">
                                                    <button
                                                        type="reset"
                                                        className="btn btn-secondary text-left" onClick={this.handleFormReset}
                                                    >
                                                        Refresh
                                                    </button>
                                                </div>
                                                <div className="col-md-4 col-sm-4  form-group">
                                                    <Link
                                                     
                                                        className="btn btn-info text-left"
                                                        to={'/users/create'}
                                                    >
                                                        Create
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="clearfix" />
                    <div className="row">
                        <div className="col-md-12 col-sm-12 ">
                            <div className="x_panel">
                                <div className="col">
                                    <div className="float-left"><label>
                                        <select
                                            className="custom-select col-10"
                                            name="record"
                                            id="record"
                                            onChange={event => { this.handleRowSearch(event) }}
                                            value={this.state.record}
                                        >
                                            {this.state.rows.map((row, index) => (
                                                <option value={row} key={index}>
                                                    {row}
                                                </option>
                                            ))}
                                        </select>
                                &nbsp;results of&nbsp;{this.state.total}&nbsp;entities</label>
                                    </div>
                                    <div className="float-right">
                                        <Pagination changePage={this.getData} data={this.state.data} />
                                    </div>
                                </div>
                                <div className="x_content">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="col">

                                                <div className="table-responsive">
                                                    <table className="table table-striped table-bordered" style={{ width: '100%' }}>
                                                        <thead className="thead-light">
                                                            <tr style={{ textAlign: 'center' }}>
                                                                <th scope="col">No.</th>
                                                                <th scope="col">Email</th>
                                                                <th scope="col">Full name</th>
                                                                <th scope="col">Avatar</th>
                                                                <th style={{ width: '150px' }}>Created at</th>
                                                                <th style={{ width: '150px' }}>Updated at</th>
                                                                <th style={{ width: '100px' }}>Status</th>
                                                                <th style={{ width: '150px' }}>Updated by</th>
                                                                <th style={{ width: '100px' }}>Function</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.tabRow()}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    };
}

export default ListUsers;