import React from "react";
import axios from "axios";
import Error from "../Message/Error";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { Link } from 'react-router-dom';
import { REQUEST_LOGIN } from '../../CONSTANT/Constants';
import { post } from "jquery";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error_server: {},
            error_client: {},
            newData: {
                email: '',
                password: ''
            },
            fields: {
                email: '',
                password: ''
            },
            email: true,
            password: true,
            disable_message: "disable_message",
            enable_message: "enable_message",
            disable_border: "disable_border",
            enable_border: "enable_border",
            enable_server: "enable_server",
            disable_server: "disable_server",
            message_error_server: true
        };
        this.handleValidation = this.handleValidation.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
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

        // Password
        if (!fields["password"]) {
            formIsValid = false;
            error_client["password"] = "Vui lòng nhập mật khẩu";
        }
        this.setState({ error_client: error_client });
        return formIsValid;
    }

    handleChange(evt) {
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
        // Email
        if (name === "email" && value.trim() !== "") {
            const isEmailValid = /\S+@\S+\.\S+/;
            if (!isEmailValid.test(value)) {
                this.setState({
                    [name]: false
                });
                this.state.error_client["email"] = "Định dạng email không đúng";
            }
        }
    };

    handleLogin = (evt) => {
        evt.preventDefault();
        if (this.handleValidation() === true) {
            const { newData } = this.state;
            const fd = new FormData();
            fd.append("email", newData.email);
            fd.append("password", newData.password);
            const body = { email: this.state.newData.email, password: this.state.newData.password }
            axios({
                method: "POST",
                url: REQUEST_LOGIN,
                data: fd
            })
                .then((res) => {
                    console.log(res.data.status);
                    if (res.data.status === 'fails') {
                        this.setState({
                            error_server: res.data.errors,
                            message_error_server: false
                        });
                    }
                    if (res.data.status === 'success') {
                        localStorage.setItem('Authorization', res.data.token_type + " " + res.data.access_token);
                        window.location.href = "#/user/info";
                    }
                })
                .catch(err => {
                    console.log(err.response);
                    if (err.response !== null && err.response.status == 401) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Ôi...',
                            text: err.response.data.message,
                            footer: '<a href="/vcl">Lấy lại mật khẩu tại đây?</a>'
                          })
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


    render() {
        return (
            <div
                className="right_col"
                role="main"
                style={{ minHeight: 750 }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div className="card card-signin my-5">
                                <div className="card-body">
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

                                    <h5 className="card-title text-center">Sign In</h5>
                                    <form className="form-signin" onSubmit={event =>
                                        this.handleLogin(event)
                                    }>
                                        <div className="form-label-group">
                                            <input type="text" name="email" onChange={this.handleChange} className="form-control" placeholder="Email address" />
                                            <span className="error" style={{ color: "red", fontSize: 16 }}>
                                                {
                                                    this.state.error_client[
                                                    "email"
                                                    ]
                                                }
                                            </span>

                                        </div>

                                        <br />
                                        <div className="form-label-group">
                                            <input type="password" name="password" onChange={this.handleChange} className="form-control" placeholder="Password" />
                                            <span className="error" style={{ color: "red", fontSize: 16 }}>
                                                {
                                                    this.state.error_client[
                                                    "password"
                                                    ]
                                                }
                                            </span>


                                            <br />
                                        </div>
                                        <div className="text-center">
                                            <button className="btn btn-lg btn-primary" type="submit">Sign in</button>
                                        </div>

<br />
                                        <div className="link login-link text-center" style={{ fontSize: 16 }}>Do you forgot password? <Link to={'/send-email-reset'}>  <a
                                        >Reset password</a></Link></div>
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

export default Login;
