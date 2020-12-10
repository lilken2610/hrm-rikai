import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import Error from "../Message/Error";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

class CreateCompany extends Component{
    constructor(props) {
        super(props);
        this.state = {
            error_server: {},
            error_client: {},
            newData: {                
            companyName: '',
            companyDescription: '',
            },
            fields: {
                companyName: '',
                companyDescription: '',
            },
            companyName: true,
            companyDescription: true,
            disable_message: "disable_message",
            enable_message: "enable_message",
            disable_border: "disable_border",
            enable_border: "enable_border",
            enable_server: "enable_server",
            disable_server: "disable_server",
            message_error_server: true
        };

        this.handleResetButton = this.handleResetButton.bind(this);
    }

    handleValidation() {
        const fields = this.state.fields;
        const error_client = {};
        var formIsValid = true;

        // Email
        if (fields["companyName"] === "") {
            formIsValid = false;
            error_client["companyName"] = "Vui lòng nhập tên";
        }

        if (fields["companyName"].length > 1 && fields["companyName"].length < 10) {
            formIsValid = false;
            error_client["companyName"] = "Tên công ty quá ngắn";
        }

        if (fields["companyName"].length > 255) {
            formIsValid = false;
            error_client["companyName"] = "Tên công ty quá dài";
        }

        // Password
        if (!fields["companyDescription"]) {
            formIsValid = false;
            error_client["companyDescription"] = "Vui lòng nhập mô tả";
        }

        if (fields["companyDescription"].length > 1 && fields["companyDescription"].length < 10) {
            formIsValid = false;
            error_client["companyDescription"] = "Mô tả ty quá ngắn";
        }

        if (fields["companyDescription"].length > 10000) {
            formIsValid = false;
            error_client["companyDescription"] = "Mô tả ty quá dài";
        }
        this.setState({ error_client: error_client });
        return formIsValid;
    }    

    handleChange = (evt) => {
        const { newData } = this.state;
        const name = evt.target.name;
        const value = evt.target.value;
        const fields = this.state.fields;
        fields[name] = value;
        const data = { ...newData, [name]: value };
        this.setState({
            newData: data,
            fields
        });

        if (value.trim() !== "") {
            this.setState({
                [name]: true
            });
        }
    }

    handleCreate = (event) => {
        event.preventDefault();
        if (this.handleValidation() === true) {
            const { newData } = this.state;
            const reset = this.handleResetButton;
            const fd = new FormData();
            fd.append("companyName", newData.companyName);
            fd.append("companyDescription", newData.companyDescription);
            
            const newCompany = {
                name: this.state.newData.companyName,
                description: this.state.newData.companyDescription
            };
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');
            axios.post('http://127.0.0.1:8000/api/auth/create-company', newCompany)
                .then(res => {
                    this.setState({
                        message_error_server: true
                    });
                    Swal.fire({
                        icon: "success",
                        title: "Wow!!!",
                        text: "Created company successfully"
                    }).then(
                        reset
                    );

                })
                .catch(err => {
                    console.log(err.response)
                    if (err.response !== null && err.response.status === 422) {
                        this.setState({
                            error_server: err.response.data.message,
                            message_error_server: false
                        });
                    }
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

    handleResetButton = event => {
        document.getElementById("formCreate").reset();
        this.setState({
            fields: {
                companyName: "",
                companyDescription: "",
            },
            companyName: true,
            companyDescription: true,
            message_error_server: true
        });
    };


    render() {
        return (
            <div className="right_col" role="main" style={{ minHeight: '1000px' }}>
                <div className="row">
                    <div className="col-md-12 col-sm-12 ">
                        <div className="x_panel">
                            <div className="x_title">
                                <h2>
                                    <Link to={'/'}>Home Page / </Link><Link to={'/companies'}>List Companies / </Link><Link to={'/create-companies'}>Create Company</Link></h2>
                                <div className="clearfix" />
                            </div>
                            <div className="x_content">
                                <form onSubmit={(event) => this.handleCreate(event)} id="formCreate">
                                    <ul className="ul-error" style={{ color: "red", fontSize: 16 }}>
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
                                    <div className="item form-group">
                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Company Name
                <span className="required">*</span>
                                        </label>
                                        <div className="col-md-6 col-sm-6 ">
                                            <input type="text" className="form-control " name="companyName" onChange={(event) => { this.handleChange(event) }} maxLength={255} />
                                            <span className="error" style={{ color: "red", fontSize: 16 }}>
                                                {
                                                    this.state.error_client[
                                                    "companyName"
                                                    ]
                                                }
                                            </span>
                                        </div>
                                    </div>
                                    <div className="item form-group">
                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Description
                <span className="required">*</span>
                                        </label>
                                        <div className="col-md-6 col-sm-6 ">
                                            <textarea className="form-control " name="companyDescription" onChange={(event) => { this.handleChange(event) }} rows={8} maxLength={10000} defaultValue={""} />
                                            <span className="error" style={{ color: "red", fontSize: 16 }}>
                                                {
                                                    this.state.error_client[
                                                    "companyDescription"
                                                    ]
                                                }
                                            </span>
                                        </div>
                                    </div>
                                    <div className="ln_solid"> </div>
                                    <div className="item form-group">
                                        <div className="col-md-6 col-sm-6 offset-md-3">
                                            <button className="btn btn-primary" type="reset">Refresh</button>
                                            <button type="submit" className="btn btn-success">Create</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    };
}

export default CreateCompany;