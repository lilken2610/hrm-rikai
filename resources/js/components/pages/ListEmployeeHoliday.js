import React, { Component } from "react";
import axios from "axios";
import TableRow from "./TableRow";
import { Pagination } from "react-laravel-paginex";
import {HashRouter , Link} from 'react-router-dom';
import TableRowEm from "./TableRowEm";
class ListEmployeeHoliday extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employee_holidays: [],
            rows: ["5", "10", "15", "20", "25"],
            currentPage: 1,
            data: {},
            oldData: {
                record: 5,
                id: "",
                type: "",
                days: "",
                name: ""
            },
            newData: {
                record: 5,
                id: "",
                type: "",
                days: "",
                name: ""
            }
        };
    }
    // Load list employee holiday from server
    componentDidMount() {
        const { newData } = this.state;
        axios
            .get(
                "/api/list-employee-holiday?record=" +
                    newData.record +
                    "&id=" +
                    newData.id +
                    "&type=" +
                    newData.type +
                    "&days=" +
                    newData.days +
                    "&name=" +
                    newData.name
            )
            .then(res => {
                this.setState({
                    employee_holidays: res.data.data,
                    listHoliday:res.data.holidays,
                    listHoliday:res.data.employees,
                    

                    data: res.data
                });
            })
            .catch(err => console.log(err));
    }
    // Show list employee  holiday into table
    tabRow() {
        if (this.state.employee_holidays instanceof Array) {
            return this.state.employee_holidays.map(function(employee_holiday, index) {
                return (
                    <TableRowEm
                    employee_holiday={employee_holiday}
                        key={index}
                        index={index + 1}
                    />
                );
            });
        }
    }

    // Handle set value input
    setValueInput = event => {
        const { newData, oldData } = this.state;
        const name = event.target.name;
        const value = event.target.value;
        const currentInputData = { ...newData, [name]: value };
        this.setState({
            newData: currentInputData,
        });
    };

    // Search list holiday
    searchListEmployeeHoliday = event => {
        event.preventDefault();
        const {newData} = this.state;
        axios
            .get(
                "/api/search-list-employee-holiday?record=" +
                newData.record +
                "&id=" +
                newData.id +
                "&type=" +
                newData.type +
                "&days=" +
                newData.days +
                "&name=" +
                newData.name
            )
            .then(res => {
                this.setState({
                    employee_holidays: res.data.data,
                    oldData : newData,
                    data: res.data
                });
            })
            .catch(err => console.log(err));
    };

    // Search list holiday among rows
    searchRowListEmployeeHoliday = (event) =>{
        // Get current row
        const {oldData} = this.state;
        const name = event.target.name;
        const value = event.target.value;
        const currentInputData = {...oldData,[name]:value}
        // Submit form
        event.preventDefault();
        axios
            .get(
                "/api/search-list-employee-holiday?record=" +
                    currentInputData.record +
                    "&id=" +
                    currentInputData.id +
                    "&type=" +
                    currentInputData.type +
                    "&days=" +
                    currentInputData.days +
                    "&name=" +
                    currentInputData.name
            )
            .then(res => {
                this.setState({
                    employee_holidays: res.data.data, 
                    data: res.data
                });
            })
            .catch(err => console.log(err));
    }

    // Handle pagination
    getData=(data)=>{
        const {oldData} = this.state;
        axios.get('api/search-list-employee-holiday?record='+ oldData.record +
        '&id=' +oldData.id +
        '&type=' + oldData.type + 
        '&days=' + oldData.days + 
        '&name=' + oldData.name + '&page=' + data.page).then(res => {
            this.setState({
                employee_holidays: res.data.data,
                data: res.data   
            });
        });

    }

    render() {
        return (
            <div
                className="right_col"
                role="main"
                style={{ minHeight: "1200px" }}
            >
                <div className="">
                    <div className="page-title"></div>
                    <div className="clearfix">
                        <h2>
                            <a href="/list-employee-holiday"> Employee Holidays</a>
                        </h2>
                        <form
                            className="row"
                            method="get"
                            id="form"
                            onSubmit={event => {
                                this.searchListHoliday(event);
                            }}
                        >
                            <div className="form-group col-sm-6 col-md-6 ">
                                <label
                                    htmlFor="id"
                                    className="col-sm-2 col-form-label label-input"
                                >
                                    ID
                                </label>
                                <div className="col-sm-10 div-input">
                                    <input
                                        type="text"
                                        className="form-control input"
                                        placeholder="search for id..."
                                        name="id"
                                        id="id"
                                        maxLength="50"
                                        onChange={event => {
                                            this.setValueInput(event);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="form-group col-sm-6 col-md-6 right">
                                <label
                                    htmlFor="type"
                                    className="col-sm-2 col-form-label label-input"
                                >
                                    Type
                                </label>
                                <div className="col-sm-10 div-input">
                                    <input
                                        type="text"
                                        className="form-control input "
                                        placeholder="search for type..."
                                        name="type"
                                        id="type"
                                        maxLength="50"
                                        onChange={event => {
                                            this.setValueInput(event);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="form-group col-sm-6 col-md-6">
                                <label
                                    htmlFor="name"
                                    className="col-sm-2 col-form-label label-input"
                                >
                                    Description
                                </label>
                                <div className="col-sm-10 div-input">
                                    <input
                                        type="text"
                                        className="form-control input"
                                        placeholder="search for name..."
                                        name="name"
                                        id="name"
                                        maxLength="50"
                                        onChange={event => {
                                            this.setValueInput(event);
                                        }}
                                    />
                                </div>
                            </div>
                           
                           
                            <div className="form-group col-sm-6 col-md-6 right ">
                                <label
                                    htmlFor="days"
                                    className="col-sm-2 col-form-label label-input"
                                >
                                    Days
                                </label>
                                <div className="col-sm-10 div-input">
                                    <input
                                        type="text"
                                        className="form-control input"
                                        placeholder="search for days..."
                                        name="days"
                                        id="days"
                                        maxLength="50"
                                        onChange={event => {
                                            this.setValueInput(event);
                                        }}
                                    />
                                </div>
                            </div>
                            
                            <div className="form-group col-sm-12 col-md-12">
                                <div className="d-flex justify-content-end">
                                    <button
                                        type="submit"
                                        className="btn btn-primary search"
                                        id="search"
                                    >
                                        Search
                                    </button>
                                    <Link
                                        className="btn btn-primary create"
                                        to={"/add_employee_holiday"}
                                    >
                                        Create
                                    </Link>
                                </div>
                            </div>
                            <div className="select input-group col-sm-12 col-md-12">
                                <div className="input-group-prepend">
                                    <label
                                        className="input-group-text"
                                        htmlFor="record"
                                    >
                                        Rows
                                    </label>
                                </div>
                                <select
                                    className="custom-select col-1"
                                    name="record"
                                    id="record"
                                    onChange = {event => {this. searchRowListEmployeeHoliday(event) }}
                                >
                                    {this.state.rows.map((row, index) => (
                                        <option value={row} key={index}>
                                            {row}
                                        </option>
                                    ))}
                                </select>
                                <p className="quantity d-flex align-items-center"></p>
                            </div>
                        </form>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="x_panel">
                                <div className="x_content">
                                    <section className="content invoice">
                                        <div className="row">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>No.</th>
                                                        <th>ID</th>
                                                        <th>Name</th>
                                                        <th>Type</th>
                                                        <th>Days</th>
                                                        
                                                    </tr>
                                                </thead>
                                                <tbody>{this.tabRow()}</tbody>
                                            </table>
                                            <Pagination changePage={this.getData} data={this.state.data}/>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default ListEmployeeHoliday;
