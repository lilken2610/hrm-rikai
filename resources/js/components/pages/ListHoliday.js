import React, { Component } from "react";
import axios from "axios";
import TableRow from "./TableRow";
import { Pagination } from "react-laravel-paginex";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { Link } from 'react-router-dom';
class ListHoliday extends Component {
    constructor(props) {
        super(props);
        this.state = {
            holidays: [],
            rows: ["5", "10", "15", "20", "25"],
            totalRecord : 0,
            data: {},
            
            oldData: {
                record: 5,
                id: "",
                type: "",
                days: "",
                description: "",
                status:"",
                start_time:"",
                end_time:""
            },
            newData: {
                record: 5,
                id: "",
                type: "",
                days: "",
                description: "",
                status:"",
                start_time:"",
                end_time:""
            }
        };
    }
    // Load list holiday from server
    componentDidMount() {
        const { newData } = this.state;
        axios
            .get(
                "/api/list-holiday?record=" +
                    newData.record +
                    "&id=" +
                    newData.id +
                    "&type=" +
                    newData.type +
                    "&days=" +
                    newData.days +
                    "&description=" +
                    newData.description+
                    "&status=" +
                    newData.status+
                    "&start_time=" +
                    newData.start_time +
                    "&end_time=" +
                    newData.end_time
            )
            .then(res => {
                this.setState({
                    holidays: res.data.data,
                    data: res.data,
                    totalRecord: res.data.total
                });
                
            })
            .catch(err => console.log(err));
    }
    // Show list holiday into table
    tabRow() {
        if (this.state.holidays instanceof Array) {
            return this.state.holidays.map(function(holiday, index) {
                return (
                    <TableRow
                    holiday={holiday}
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
    searchListHoliday = event => {
        event.preventDefault();
        const {newData} = this.state;
        axios
            .get(
                "/api/search-list-holiday?record=" +
                newData.record +
                "&id=" +
                newData.id +
                "&type=" +
                newData.type +
                "&days=" +
                newData.days +
                "&description=" +
                newData.description +
                "&status=" +
                    newData.status+
                    "&start_time=" +
                    newData.start_time +
                    "&end_time=" +
                    newData.end_time
            )
            .then(res => {
                this.setState({
                    holidays: res.data.data,
                    oldData : newData,
                    data: res.data,
                    totalRecord: res.data.total,
                    
                });
            })
            .catch(err => console.log(err));
    };

    // Search list holiday among rows
    searchRowListHoliday = (event) =>{
        // Get current row
        const {oldData} = this.state;
        const name = event.target.name;
        const value = event.target.value;
        const currentInputData = {...oldData,[name]:value}
        // Submit form
        event.preventDefault();
        axios
            .get(
                "/api/search-list-holiday?record=" +
                    currentInputData.record +
                    "&id=" +
                    currentInputData.id +
                    "&type=" +
                    currentInputData.type +
                    "&days=" +
                    currentInputData.days +
                    "&description=" +
                    currentInputData.description +
                    "&status=" +
                    currentInputData.status +
                    "&start_time=" +
                    currentInputData.start_time +
                    "&end_time=" +
                    currentInputData.end_time 
            )
            .then(res => {
                this.setState({
                    holidays: res.data.data, 
                    data: res.data,
                    totalRecord: res.data.total
                });
            })
            .catch(err => console.log(err));
    }

    // Handle pagination
    getData=(data)=>{
        const {oldData} = this.state;
        axios.get('api/search-list-holiday?record='+ oldData.record +
        '&id=' +oldData.id +
        '&type=' + oldData.type + 
        '&days=' + oldData.days + 
        '&description=' + oldData.description +
        '&status=' + oldData.status +
        '&start_time=' + oldData.start_time +
        '&end_time=' + oldData.end_time 
        + '&page=' + data.page).then(res => {
            this.setState({
                holidays: res.data.data,
                data: res.data   
            });
        });

    }
    handleResetButton = event => {
        document.getElementById("form").reset();
        this.setState({
            newData: {
                type: "",
                days: "",
                status: "",
                description: "",
                start_time: "",
                end_time: "",
                company_id: ""
            }
        });
    };
    deleteHoliday = (id) => {
        Swal.fire({
            title: "Are you sure delete?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(result => {
            if (result.isConfirmed) {
                axios
                    .delete(
                        "/api/delete-holiday/" + id
                    )
                    
                    .then((res) => {
                        console.log(res.data)
                        console.log('holdiay successfully delete')
                        console.log(res);
                      })
                      Swal.fire(
                        '',
                         'delete holiday successfully',
                        'success'
                    ).then(function() {
                        window.location.href = "/#/list-holiday";
                        window.location.reload(false);
                    })
                      .catch((error) => {
                        console.log(error)
                      })
                  }
                
           
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
                            <a href="/list-holiday">Holidays</a>
                        </h2>
                        <form
                            className="row"
                            method="get"
                            id="form"
                            onSubmit={event => {
                                this.searchListHoliday(event);
                            }}
                        >
                            <div className="form-group col-sm-4 col-md-4 ">
                            <input type="text" className="form-control has-feedback-left" id="inputSuccess4" placeholder="ID" name="id"  onChange={event => {
                                            this.setValueInput(event);
                                        }}/>
                       
                        <span className="fa fa-indent form-control-feedback left" aria-hidden="true"></span>
                            </div>
                            <div className="form-group col-sm-4 col-md-4 right">
                            <input type="text" className="form-control has-feedback-left" id="inputSuccess2" placeholder="Type" name="type"onChange={event => {
                                            this.setValueInput(event);
                                        }}  />
                        <span className="fa fa-align-justify form-control-feedback left" aria-hidden="true"></span>
                            </div>
                            <div className="form-group col-sm-4 col-md-4 ">
                            <input type="date" className="form-control has-feedback-left" id="inputSuccess4" placeholder="Start_time" name="start_time" onChange={event => {
                                            this.setValueInput(event);
                                        }}  />
                            
                       
                        <span className="fa fa-table form-control-feedback left" aria-hidden="true"></span>
                            </div>
                            <div className="form-group col-sm-4 col-md-4 right">
                            <input type="text" className="form-control has-feedback-left" id="inputSuccess2"  placeholder="Description" name="description" onChange={event => {
                                            this.setValueInput(event);
                                        }}  />
                        <span className="fa fa-audio-description form-control-feedback left" aria-hidden="true"></span>
                            </div>
                            
                       
                        <span className="fa fa-table form-control-feedback left" aria-hidden="true"></span>
                        <div className="form-group col-sm-4 col-md-4 ">
                            <input type="text" className="form-control has-feedback-left" id="inputSuccess4" placeholder="Days" name="days" onChange={event => {
                                            this.setValueInput(event);
                                        }}  />
                            <span className="fa fa-table form-control-feedback left" aria-hidden="true"></span>
                            </div>
                            <div className="form-group col-sm-4 col-md-4 right">
                            <input type="date" className="form-control has-feedback-left" id="inputSuccess2"  placeholder="End_time" name="end_time" onChange={event => {
                                            this.setValueInput(event);
                                        }}  />
                        <span className="fa fa-table form-control-feedback left" aria-hidden="true"></span>
                            </div>


                            
                    <div className="select input-group col-sm-12 col-md-12">
                    <div className="col-md-3 col-sm-12  offset-md-12">
                        
                        </div>
                      <div className="col-md-2 col-sm-12  offset-md-12">
                        <button  type="submit" className="btn btn-secondary btn-block" id='search'>Search</button>
                        
                      </div>
                     
                      <div className="col-md-2 col-sm-12  offset-md-12">
                      <Link to={'/add-holiday'} className="buttonPrevious btn btn-success buttonDisabled btn-block">Create</Link>
                        
                      </div>
                     
                      <div className="col-md-2 col-sm-12  offset-md-12">
                      <button
                                                        type="button"
                                                        className="btn btn-primary buttonDisabled btn-block"
                                                        onClick={event => {
                                                            this.handleResetButton(
                                                                event
                                                            );
                                                        }}
                                                    >
                                                        Clear
                                                    </button>
                      </div>
                      <div className="col-md-3 col-sm-12  offset-md-12">
                        
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
                                    onChange = {event => {this. searchRowListHoliday(event) }}
                                >
                                    {this.state.rows.map((row, index) => (
                                        <option value={row} 
                                        key={index}>
                                            {row}
                                        </option>
                                    ))}
                                </select> &nbsp; 
                                <p className="quantity d-flex align-items-center">Result of {this.state.totalRecord} holidays</p>
                            </div>

                        </form>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            
                                    <section className="content invoice">
                                        <div className="row">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        {/* <th>No.</th> */}
                                                        <th>ID</th>
                                                        <th>Type</th>
                                                        <th>Days</th>
                                                        <th>Description</th>
                                                        <th>Status</th>
                                                        <th>Start_time</th>
                                                        <th>End_time</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                {
                                    this.state.holidays.map((holiday, i) =>
                                     <TableRow
                                        holiday={holiday} 
                                        key={i}
                                    deleteHoliday={this.deleteHoliday}
                                    />)
                                }
                            </tbody>

                                            </table>
                                            <Pagination changePage={this.getData} data={this.state.data}/>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                
        );
    }
}


export default ListHoliday;
