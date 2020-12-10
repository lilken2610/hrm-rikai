import React from "react";
import axios from "axios";
import Error from "../Message/Error";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { Link } from 'react-router-dom';

class ResetPass extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            error_server: {},
            error_client: {},
            newData: {
                password: '',
                confirmPassword: ''
            },
            fields: {
                password: '',
                confirmPassword: ''
            },
            password: true,
            confirmPassword: true,
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
    }

    componentDidMount() {
        axios.get("http://127.0.0.1:8000/api/auth/get-reset-password/" + this.props.match.params.token)
            .then(res => {
                this.setState({
                    token: this.props.match.params.token
                })
            })
            .catch(err => {
                if (err.response !== null && err.response.status === 403) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ôi...',
                        text: 'Đường dẫn không đúng hoặc đã hết hạn, vui lòng thử lại!'
                      }).then(function() {
                        window.location.href = "#/login";
                    });
                }
            });
    }

    handleValidation() {
        const fields = this.state.fields;
        const error_client = {};
        var formIsValid = true;

        //Password
        if (fields["password"] === "") {
            formIsValid = false;
            error_client["password"] = "Vui lòng nhập mật khẩu";
        }

        if (fields["password"].length > 1 && fields["password"].length < 10) {
            formIsValid = false;
            error_client["password"] = "Mật khẩu quá ngắn";
        }

        if (fields["password"].length > 255) {
            formIsValid = false;
            error_client["password"] = "Mật khẩu quá dài";
        }

        //Confirm Password
        if (fields["confirmPassword"] === "") {
            formIsValid = false;
            error_client["confirmPassword"] = "Vui lòng nhập xác nhận mật khẩu";
        }

        if (fields["confirmPassword"].length > 1 && fields["confirmPassword"].length < 10) {
            formIsValid = false;
            error_client["confirmPassword"] = "Mật khẩu quá ngắn";
        }

        if (fields["confirmPassword"].length > 255) {
            formIsValid = false;
            error_client["confirmPassword"] = "Mật khẩu quá dài";
        }

        if (fields["confirmPassword"] !== fields["password"]) {
            formIsValid = false;
            error_client["confirmPassword"] = "Mật khẩu không giống nhau";
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
    };

    handleResetPass = (evt) => {
        evt.preventDefault();
        if (this.handleValidation() === true) {
            const { newData } = this.state;
            const fd = new FormData();
            fd.append("password", newData.password);
            fd.append("confirmPassword", newData.confirmPassword);
            const body = { password: this.state.newData.password, re_password: this.state.newData.confirmPassword, token:this.state.token }
            axios.post('http://127.0.0.1:8000/api/auth/do-reset-password', body)
                .then((res) => {
                    Swal.fire(
                        {
                            icon: "success",
                            title: "Wow!!!",
                            text: res.data.message
                        }
                    ).then(function () {
                        window.location.href = "#/login";
                    });
                })
                .catch(err => {
                    console.log(err.response);
                    if (err.response !== null && err.response.status === 402) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Ôi...',
                            text: err.response.message
                          }).then(function () {
                            window.location.href = "/login";
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

                                    <h5 className="card-title text-center">Reset Password</h5>
                                    <form className="form-signin" onSubmit={event =>
                                        this.handleResetPass(event)
                                    }>
                                        <div className="form-label-group">
                                            <input type="password" name="password" onChange={this.handleChange} className="form-control" placeholder="New Password" />
                                            <span className="error" style={{ color: "red", fontSize: 16 }}>
                                                {
                                                    this.state.error_client[
                                                    "password"
                                                    ]
                                                }
                                            </span>
                                            
                                        </div>

                                        <br />
                                        <div className="form-label-group">
                                            <input type="password" name="confirmPassword" onChange={this.handleChange} className="form-control" placeholder="Confirm Password" />
                                            <span className="error" style={{ color: "red", fontSize: 16 }}>
                                                {
                                                    this.state.error_client[
                                                    "confirmPassword"
                                                    ]
                                                }
                                            </span>
                                        </div>

                                            
<br />
                                        <div className="text-center">
                                            <button className="btn btn-lg btn-primary" type="submit">Change</button>
                                        </div>

<br />
                                        <div className="link login-link text-center" style={{ fontSize: 16 }}>Your account already? <Link to={'/login'}><a
                                        >Login here</a></Link></div>
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

export default ResetPass;