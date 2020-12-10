import React from "react";
import axios from "axios";
import TableRow from "./TableRow";
import {Pagination} from 'react-laravel-paginex'
import {Link } from "react-router-dom";

class ListCompanies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            companies: [],
            rows: ["20", "30", "40", "50", "60"],
            currentPage: 1,
            data: {},
            users: [" "],
            total: 0,
            record: 20,
            current_page: 0,
            totalCurrent: 0,
            odlData: {
                companyName: '',
                companyDescription: '',
                created_at: '',
                updated_at: '',
                created_by: '',
                updated_by: ''
            },
            newData: {
                companyName: '',
                companyDescription: '',
                created_at: '',
                updated_at: '',
                created_by: '',
                updated_by: ''
            }
        };
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');
        axios.get("http://127.0.0.1:8000/api/auth/list-companies?record="+this.state.record )
            .then(res => {
                this.setState({
                    companies: res.data.companies.data,
                    data: res.data.companies,
                    users: res.data.users,
                    total: res.data.total,
                    totalCurrent: res.data.companies.to,
                    current_page: res.data.companies.current_page
                });
            })
            .catch(error => console.log(error));
    }    

    tabRow() {    
        const data = this.state;
        return this.state.companies.map(function (company, index) {
            return (
                <TableRow
                    company={company}
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
        axios.get('http://127.0.0.1:8000/api/auth/search-companies?record=' + this.state.record, {
            params: {
                companyName: odlData.companyName,
                companyDescription: odlData.companyDescription,
                created_at: odlData.created_at,
                updated_at: odlData.updated_at,
                created_by: odlData.created_by,
                updated_by: odlData.updated_by,
                page: data.page
            }
        })
            .then(res => {
                this.setState({
                    companies: res.data.companies.data,
                    data: res.data.companies,
                    total: res.data.total,
                    totalCurrent: res.data.companies.to,
                    current_page: res.data.companies.current_page
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

    handleSearch=(event)=> {
        event.preventDefault();
        const { newData } = this.state;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');
        axios.get('http://127.0.0.1:8000/api/auth/search-companies?record=' + this.state.record, {
            params: {
                companyName: newData.companyName,
                companyDescription: newData.companyDescription,
                created_at: newData.created_at,
                updated_at: newData.updated_at,
                created_by: newData.created_by,
                updated_by: newData.updated_by
            }
        })
            .then(res => {
                this.setState({
                    odlData: newData,
                    companies: res.data.companies.data,
                    data: res.data.companies,
                    total: res.data.total,
                    totalCurrent: res.data.companies.to,
                    current_page: res.data.companies.current_page
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
        axios.get('http://127.0.0.1:8000/api/auth/search-companies?record=' + currentInputData.record, {
            params: {
                companyName: currentInputData.companyName,
                companyDescription: currentInputData.companyDescription,
                created_at: currentInputData.created_at,
                updated_at: currentInputData.updated_at,
                created_by: currentInputData.created_by,
                updated_by: currentInputData.updated_by
            }
        })
            .then(res => {
                this.setState({
                    companies: res.data.companies.data,
                    data: res.data.companies,
                    total: res.data.total,
                    record: currentInputData.record,
                    totalCurrent: res.data.companies.to,
                    current_page: res.data.companies.current_page
                });
            })
            .catch(err => console.log(err));
    }

    handleFormReset = () => {
        document.getElementById("formSearch").reset();
        this.setState({
            odlData: {
                companyName: '',
                companyDescription: '',
                created_at: '',
                updated_at: '',
                created_by: '',
                updated_by: ''
            },
            newData: {
                companyName: '',
                companyDescription: '',
                created_at: '',
                updated_at: '',
                created_by: '',
                updated_by: ''
            }
        });
    };


    render() {
        return (
            <form className="form-horizontal form-label-left" onSubmit={(event) => this.handleSearch(event)} id="formSearch">
                <div className="right_col" role="main" style={{ minHeight: "1000px" }}>
                    <div className="row">
                        <div className="x_panel">
                            <div className="x_title">
                                <h2>
                                    <Link to={'/'}>Home Page / </Link>
                                    <Link to={'/companies'}>List Companies</Link>
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
                                                        Company Name:
                                                    </span>
                                                </div>
                                                <input
                                                    id="companyName"
                                                    type="text"
                                                    placeholder={"Rikai..."}
                                                    className="form-control"
                                                    name="companyName"
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
                                                        Description:
                                                    </span>
                                                </div>
                                                <input
                                                    id="companyDescription"
                                                    type="text"
                                                    placeholder={'Big city moi...'}
                                                    className="form-control"
                                                    name="companyDescription"
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
                                                        Created by:
                                                    </span>
                                                </div>
                                                <select
                                                    className="form-control"
                                                    name="created_by"
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
                                                        Created by
                                                    </option>
                                                    {this.state.users.map((user, index) => (
                                                        <option value={user.id} key={index}>
                                                            {user.fullname}
                                                        </option>
                                                    ))}
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
                                                        type="submit"
                                                        className="btn btn-primary text-left"
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
                                                        to={'/create-companies'}
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
                                                    <table className="table table-striped table-bordered table-sm" style={{ width: '100%' }}>
                                                        <thead className="thead-light">
                                                            <tr>
                                                                <th scope="col">No.</th>
                                                                <th scope="col">Name</th>
                                                                <th scope="col">Description</th>
                                                                <th style={{ width: '150px' }}>Created at</th>
                                                                <th style={{ width: '150px' }}>Updated at</th>
                                                                <th style={{ width: '150px' }}>Created by</th>
                                                                <th style={{ width: '150px' }}>Updated by</th>
                                                                <th style={{ textAlign: 'center', width: '100px' }}>Function</th>
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
    }
}

export default ListCompanies;