import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { DelayInput } from 'react-delay-input';
import Error from "../Message/Error";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

class CreateUser extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            checkEmail: 1,
            error_server: {},
            error_client: {},
            newData: {
                email: '',
                fullname: '',
                password: '',
                employee: 0
            },
            fields: {
                email: '',
                fullname: '',
                password: '',
                employee: 0
            },
            email: true,
            fullname: true,
            password: true,
            employee: true,
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

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');
        axios.get("/api/add-time")
            .then(res => {
                this.setState({
                    data: res.data
                });
            })
            .catch(error => console.log(error));
    }    

    checkEmail() {        
        axios.defaults.headers.common["Authorization"] = localStorage.getItem(
            "Authorization"
          );
          axios
            .get("http://127.0.0.1:8000/api/auth/check-email?email="+this.state.fields.email )
              .then((res) => {
              this.setState({
                checkEmail: res.data.status
              });
            })
            .catch((error) => console.log(error));
    }

    handleValidation() {
        const fields = this.state.fields;
        const error_client = {};
        var formIsValid = true;

        // Email
        if (fields["email"] === "") {
            formIsValid = false;
            error_client["email"] = "Vui lòng nhập email";
        }

        if (this.state.checkEmail == 0) {
            formIsValid = false;
            error_client["email"] = "Email đã tồn tại, vui lòng chọn email khác";
        }

        if (fields["email"].length > 1 && fields["email"].length < 10) {
            formIsValid = false;
            error_client["email"] = "Email quá ngắn";
        }

        if (fields["email"].length > 255) {
            formIsValid = false;
            error_client["email"] = "Email quá dài";
        }

        // Email
        if (fields["fullname"] === "") {
            formIsValid = false;
            error_client["fullname"] = "Vui lòng nhập tên";
        }

        if (fields["fullname"].length > 1 && fields["email"].length < 10) {
            formIsValid = false;
            error_client["fullname"] = "Tên quá ngắn";
        }

        if (fields["fullname"].length > 255) {
            formIsValid = false;
            error_client["fullname"] = "Tên quá dài";
        }

        // Password
        if (!fields["password"]) {
            formIsValid = false;
            error_client["password"] = "Vui lòng nhập  mật khẩu";
        }

        if (fields["password"].length > 1 && fields["password"].length < 10) {
            formIsValid = false;
            error_client["password"] = "Mật khẩu quá ngắn";
        }

        if (fields["password"].length > 255) {
            formIsValid = false;
            error_client["password"] = "Mật khẩu quá dài";
        }

        if (fields["employee"] === "") {
            formIsValid = false;
            error_client["employee"] = "Vui lòng chọn nhân viên";
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
            
            const newUser = {
                email: newData.email,
                fullname: newData.fullname,
                password: newData.password,
                employee: newData.employee
            };
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');
            axios.post('http://127.0.0.1:8000/api/auth/create-user', newUser)
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
                email: "",
                fullname: "",
                password: "",
                employee: ""
            },
            email: true,
            fullname: true,
            password: true,
            employee: true,
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
                                    <Link to={'/'}>Home Page / </Link><Link to={'/users'}>List Users / </Link><Link to={'/users/create'}>Create User</Link></h2>
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
                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Email
                <span className="required">*</span>
                                        </label>
                                        <div className="col-md-6 col-sm-6 ">
                                            <DelayInput delayTimeout={500} type="text" className="form-control" name="email" onChange={(event) => { this.handleChange(event), this.checkEmail(event) }} maxLength={255} />
                                            <span className="error" style={{ color: "red", fontSize: 16 }}>
                                                {
                                                    this.state.error_client[
                                                    "email"
                                                    ]
                                                }
                                            </span>
                                        </div>
                                    </div>
                                    <div className="item form-group">
                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Full name
                <span className="required">*</span>
                                        </label>
                                        <div className="col-md-6 col-sm-6 ">
                                            <input type="text" className="form-control" name="fullname" onChange={(event) => { this.handleChange(event) }} maxLength={255} />
                                            <span className="error" style={{ color: "red", fontSize: 16 }}>
                                                {
                                                    this.state.error_client[
                                                    "fullname"
                                                    ]
                                                }
                                            </span>
                                        </div>
                                    </div>
                                    <div className="item form-group">
                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Password
                <span className="required">*</span>
                                        </label>
                                        <div className="col-md-6 col-sm-6 ">
                                            <input type="password" className="form-control" name="password" onChange={(event) => { this.handleChange(event) }} maxLength={255} />
                                            <span className="error" style={{ color: "red", fontSize: 16 }}>
                                                {
                                                    this.state.error_client[
                                                    "password"
                                                    ]
                                                }
                                            </span>
                                        </div>
                                    </div>
                                    <div className="item form-group">
                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Employee
                <span className="required">*</span>
                                        </label>
                                        <div className="col-md-6 col-sm-6 ">
                                        <select className="form-control" name="employee" onChange={(event) => { this.handleChange(event) }}>
                                                <option value="">                                                    
                                                            Select name:
                                                        </option>
                                                        {this.state.data.map(
                                                            (list, index) => (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        list.id
                                                                    }
                                                                >
                                                                    {
                                                                        list.name
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                            </select>
                                            <span className="error" style={{ color: "red", fontSize: 16 }}>
                                                {
                                                    this.state.error_client[
                                                    "employee"
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

export default CreateUser;