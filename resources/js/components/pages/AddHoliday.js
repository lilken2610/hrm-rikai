import React, { Component, createRef } from "react";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import Error from "../Main/Message/Error";
import { map } from "jquery";
class AddHoliday extends Component {
    constructor(props) {
        super(props);
        this.days = React.createRef();
        this.start_time = React.createRef();
        this.end_time = React.createRef();
        this.state = {
            listCompany: [],
            error_server: {},
            error_client: {
                type: "",
                days: "",
                status: "",
                description: "",
                start_time: "",
                end_time: "",
                company_id: ""
            },
            newData: {
                
                type: "",
                days: "",
                status: "",
                description: "",
                start_time: "",
                end_time: "",
                company_id: ""
            },
            fields: {
              
                type: "",
                days: "",
                status: "",
                description: "",
                start_time: "",
                end_time: "",
                company_id: ""
            },
           
            type: true,
            days: true,
            status: true,
            description: true,
            start_time: true,
            end_time: true,
            company_id: true,
            disable_message: "disable_message",
            enable_message: "enable_message",
            disable_border: "disable_border",
            enable_border: "enable_border",
            enable_server: "enable_server",
            disable_server: "disable_server",
            message_error_server: true
        };
    }
    // Validation form
    handleValidation() {
        const {fields} = this.state;
        const error_client = {};
        var formIsValid = true;
        if (fields["days"] === "") {
            formIsValid = false;
            error_client["days"] = "please put something here";
        }
      
        if (!fields["type"]) {
            formIsValid = false;
            error_client["type"] = "please put something here";
        }

       
        if (!fields["status"]) {
            formIsValid = false;
            error_client["status"] = "please put something here";
        }

        
        if (!fields["description"]) {
            formIsValid = false;
            error_client["description"] = "please put something here";
        }

      
        if (!fields["start_time"]  ) {
            formIsValid = false;
            error_client["start_time"] = "please put something here";
        }

        
        if (!fields["end_time"]) {
            formIsValid = false;
            error_client["end_time"] = "please put something here";
        }

        if(this.state.error_client["end_time"] === "End time is not valid"){
            formIsValid = false;
            error_client["end_time"] = "End time is not valid";
        }
       
        if (!fields["company_id"]) {
            formIsValid = false;
            error_client["company_id"] = "please put something here";
        }

        this.setState({ error_client: error_client });
        return formIsValid;
    }

    // Get list company
    componentDidMount() {
        axios
            .get("/api/add-holiday")
            .then(res => {
                this.setState({
                    listCompany: res.data.companies
                });
                console.log(res);
            })
            .catch(err => console.log(err));
    }

    // Handle set value from tag input to state
    isChangeInput = event => {
        const { newData,error_client } = this.state;
        const name = event.target.name;
        const value = event.target.value;
        const fields = this.state.fields;
        fields[name] = value;
        const data = { ...newData, [name]: value };
        this.setState({
            newData: data,
            fields
        });
        // Validate form

        // Multiple field
        if (value.trim() !== "") {
            this.setState({
                [name]: true
            });
        }
        // if(name === 'end_time'){
        //     const end_time = new Date(this.end_time.current.value); 
        //     const start_time = new Date(this.start_time.current.value); 
        //     const days = parseInt(this.days.current.value);
        //     const day = end_time.getDay() - start_time.getDay();
        //     const month = (end_time.getMonth() + 1) - (start_time.getMonth() + 1);
        //     const year = end_time.getFullYear() - start_time.getFullYear();
        //     if((day + month + year + 1) !== days && value.trim() !== ""){
        //         this.setState({
        //             [name]: false,
        //             error_client: {...error_client, [name] : 'End time is not valid' } 
        //         });
                         
        //     }
        // }
    
      
    };

    // Handle create new holidaay
    handleSubmit = event => {
        event.preventDefault();
        if (this.handleValidation() === true) {
            const { newData } = this.state;
            // const fd = new FormData();
            // fd.append("type", newData.type);
            // fd.append("days", newData.days);
            // fd.append("status", newData.status);
            // fd.append("description", newData.description);
            // fd.append("start_time", newData.start_time);
            // fd.append("end_time", newData.end_time);
            // fd.append("company_id", newData.company_id);
            const newCompany = {
                type: this.state.newData.type,
                days: this.state.newData.days,
                status: this.state.newData.status,
                description: this.state.newData.description,
                start_time: this.state.newData.start_time,
                end_time: this.state.newData.end_time,
                company_id: this.state.newData.company_id                
            };
            axios
                .post("api/store-holiday", newCompany)
                .then(res => {
                    this.setState({
                        message_error_server: true
                    });
                    Swal.fire(
                        'Good job!',
                         'Created holiday successfully',
                        'success'
                    ).then(function() {
                        window.location.href = "/#/list-holiday";
                    });
                })
                .catch(err => {
                    this.setState({
                        error_server: err.response.data.errors,
                        message_error_server: false
                    });
                });
        } else {
            Object.keys(this.state.fields)
                .filter(item => !this.state.fields[item])
                .map(item => {
                    this.setState({
                        [item]: false
                    });
                });
                
        }
    };

    // Handle button reset form
    handleResetButton = event => {
        document.getElementById("signupForm").reset();
        this.setState({
            fields: {
                type: "",
                days: "",
                status: "",
                description: "",
                start_time: "",
                end_time: "",
                company_id: ""
            },
            type:true,
            days: true,
            status: true,
            description: true,
            start_time: true,
            end_time: true,
            company_id: true,
            message_error_server: true
        });
    };

    render() {
        return (
            <div className="right_col" role="main" style={{ minHeight: 705 }}>
                <div className="">
                    <div className="page-title">
                        <div className="title_left">
                            <h2>
                                <a href="/#/list-holiday">Holiday</a>
                                <a href="/#/add-holiday"> / Create</a>
                            </h2>
                        </div>
                    </div>

                    <div className="clearfix"></div>
                    <div className="row mt-2">
                        <div className="col-md-12 col-sm-12">
                            <div className="x_panel">
                                <div className="x_content">
                                    <div
                                        className={
                                            this.state.message_error_server
                                                ? this.state.disable_server
                                                : this.state.enable_server
                                        }
                                    >
                                        <ul className="ul-error">
                                            {Object.keys(
                                                this.state.error_server
                                            ).map((error, index) => (
                                                <Error
                                                    message={
                                                        this.state.error_server[
                                                            error
                                                        ][0]
                                                    }
                                                    key={index}
                                                />
                                            ))}
                                        </ul>
                                    </div>
                                    <form
                                        onSubmit={event =>
                                            this.handleSubmit(event)
                                        }
                                        id="signupForm"
                                    >
                                        

                                        <div className="field item form-group ">
                                            <label className="col-form-label col-md-3 col-sm-3  label-align">
                                                Type
                                                <span className="required">
                                                    *
                                                </span>
                                            </label>
                                            <div className="col-md-6 col-sm-6">
                                                <input
                                                    className={
                                                        "form-control reset " +
                                                        (this.state.type
                                                            ? this.state
                                                                  .disable_message +
                                                              " " +
                                                              this.state
                                                                  .disable_border
                                                            : this.state
                                                                  .enable_message +
                                                              " " +
                                                              this.state
                                                                  .enable_border)
                                                    }
                                                    type="text"
                                                    id="type"
                                                    name="type"
                                                    onChange={event => {
                                                        this.isChangeInput(
                                                            event
                                                        );
                                                    }}
                                                />
                                                <span style={{color: "white"}} className='error'>
                                                    {
                                                        this.state.error_client[
                                                            "type"
                                                        ]
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                        <div className="field item form-group ">
                                            <label className="col-form-label col-md-3 col-sm-3  label-align">
                                                status
                                                <span className="required">
                                                    *
                                                </span>
                                            </label>
                                            <div className="col-md-6 col-sm-6">
                                                <input
                                                    className={
                                                        "form-control reset " +
                                                        (this.state.status
                                                            ? this.state
                                                                  .disable_message +
                                                              " " +
                                                              this.state
                                                                  .disable_border
                                                            : this.state
                                                                  .enable_message +
                                                              " " +
                                                              this.state
                                                                  .enable_border)
                                                    }
                                                    type="text"
                                                    id="status"
                                                    name="status"
                                                    onChange={event => {
                                                        this.isChangeInput(
                                                            event
                                                        );
                                                    }}
                                                />
                                                <span style={{color: "white"}} className='error'>
                                                    {
                                                        this.state.error_client[
                                                            "status"
                                                        ]
                                                    }
                                                </span>
                                            </div>
                                        </div>

                                        <div className="field item form-group ">
                                            <label className="col-form-label col-md-3 col-sm-3  label-align">
                                               Days
                                                <span className="required">
                                                    *
                                                </span>
                                            </label>
                                            <div className="col-md-6 col-sm-6">
                                                <input
                                                    ref={this.days}
                                                    id="days"
                                                    className={
                                                        "form-control reset " +
                                                        (this.state.days
                                                            ? this.state
                                                                  .disable_message +
                                                              " " +
                                                              this.state
                                                                  .disable_border
                                                            : this.state
                                                                  .enable_message +
                                                              " " +
                                                              this.state
                                                                  .enable_border)
                                                    }
                                                    type="number"
                                                    name="days"
                                                    min="1"
                                                    max="30"
                                                    onChange={event => {
                                                        this.isChangeInput(
                                                            event
                                                        );
                                                    }}
                                                />
                                                <span style={{color: "white"}} className='error'>
                                                    {
                                                        this.state.error_client[
                                                            "days"
                                                        ]
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                        <div className="field item form-group ">
                                            <label className="col-form-label col-md-3 col-sm-3  label-align">
                                                Description
                                                <span className="required">
                                                    *
                                                </span>
                                            </label>
                                            <div className="col-md-6 col-sm-6">
                                                <input
                                                    className={
                                                        "form-control reset " +
                                                        (this.state.description
                                                            ? this.state
                                                                  .disable_message +
                                                              " " +
                                                              this.state
                                                                  .disable_border
                                                            : this.state
                                                                  .enable_message +
                                                              " " +
                                                              this.state
                                                                  .enable_border)
                                                    }
                                                    type="text"
                                                    id="description"
                                                    name="description"
                                                    onChange={event => {
                                                        this.isChangeInput(
                                                            event
                                                        );
                                                    }}
                                                />
                                                <span style={{color: "white"}} className='error'>
                                                    {
                                                        this.state.error_client[
                                                            "description"
                                                        ]
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                        <div className="field item form-group ">
                                            <label className="col-form-label col-md-3 col-sm-3  label-align">
                                                Start_time
                                                <span className="required">
                                                    *
                                                </span>
                                            </label>
                                            <div className="col-md-6 col-sm-6">
                                                <input
                                                    ref={this.start_time}
                                                    className={
                                                        "form-control reset " +
                                                        (this.state.start_time
                                                            ? this.state
                                                                  .disable_message +
                                                              " " +
                                                              this.state
                                                                  .disable_border
                                                            : this.state
                                                                  .enable_message +
                                                              " " +
                                                              this.state
                                                                  .enable_border)
                                                    }
                                                    type="date"
                                                    id="start_time"
                                                    name="start_time"
                                                    onChange={event => {
                                                        this.isChangeInput(
                                                            event
                                                        );
                                                    }}
                                                />
                                                <span style={{color: "white" }} className='error'> 
                                                    {
                                                        this.state.error_client[
                                                            "start_time"
                                                        ]
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                        <div className="field item form-group ">
                                            <label className="col-form-label col-md-3 col-sm-3  label-align">
                                                End_time
                                                <span className="required">
                                                    *
                                                </span>
                                            </label>
                                            <div className="col-md-6 col-sm-6">
                                                <input
                                                    ref={this.end_time}
                                                    className={
                                                        "form-control reset " +
                                                        (this.state.end_time
                                                            ? this.state
                                                                  .disable_message +
                                                              " " +
                                                              this.state
                                                                  .disable_border
                                                            : this.state
                                                                  .enable_message +
                                                              " " +
                                                              this.state
                                                                  .enable_border)
                                                    }
                                                    type="date"
                                                    id="end_time"
                                                    name="end_time"
                                                    onChange={event => {
                                                        this.isChangeInput(
                                                            event
                                                        );
                                                    }}
                                                />
                                                <span style={{color: "white"}} className='error'>
                                                    {
                                                        this.state.error_client[
                                                            "end_time"
                                                        ]
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                       
                                        <div className="field item form-group ">
                                            <label className="col-form-label col-md-3 col-sm-3  label-align">
                                                 Company
                                                <span className="required">
                                                    *
                                                </span>
                                            </label>
                                            <div className="col-md-6 col-sm-6">
                                                <select
                                                    className={
                                                        "form-control reset " +
                                                        (this.state
                                                            .company_id
                                                            ? this.state
                                                                  .disable_message +
                                                              " " +
                                                              this.state
                                                                  .disable_border
                                                            : this.state
                                                                  .enable_message +
                                                              " " +
                                                              this.state
                                                                  .enable_border)
                                                    }
                                                    type="text"
                                                    id="company_id"
                                                    name="company_id"
                                                    onChange={event => {
                                                        this.isChangeInput(
                                                            event
                                                        );
                                                    }}
                                                >
                                                    <option value=''>Choose Company</option>
                                                {this.state.listCompany.map((each)=> (<option value={each.id}>{each.name}</option>))}

                                                    </select>


                                                <span style={{color: "white"}} className='error'>
                                                    {
                                                        this.state.error_client[
                                                            "company_id"
                                                        ]
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="ln_solid">
                                            <div className="form-group">
                                                <div className="col-md-6 offset-md-3">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary"
                                                    >
                                                        Submit
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-secondary"
                                                        onClick={event => {
                                                            this.handleResetButton(
                                                                event
                                                            );
                                                        }}
                                                    >
                                                        Reset
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddHoliday;
