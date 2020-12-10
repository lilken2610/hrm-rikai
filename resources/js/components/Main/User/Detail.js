import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import Error from "../Message/Error";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

class DetailUser extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            error_server: {},
            error_client: {},
            newData: {
                fullname: '',
                status: 1,
            },
            fields: {
                fullname: '',
            },
            fullname: true,
            status: true,
            disable_message: "disable_message",
            enable_message: "enable_message",
            disable_border: "disable_border",
            enable_border: "enable_border",
            enable_server: "enable_server",
            disable_server: "disable_server",
            message_error_server: true
        };
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');
        axios.get("http://127.0.0.1:8000/api/auth/detail-user/" + this.props.match.params.id)
            .then(res => {
                this.setState({
                    user: res.data,
                    fields: {
                        fullname: res.data.fullname
                    },
                    newData: {
                        fullname: res.data.fullname
                    }
                });
            })
            .catch(err => console.log(err));
    }

    validateInfo() {
        const fields = this.state.fields;
        const error_client = {};
        var formIsValid = true;

        // Full name
        if (fields["fullname"] === "") {
            formIsValid = false;
            error_client["fullname"] = "Vui lòng nhập tên";
        }

        if (fields["fullname"].length > 1 && fields["fullname"].length < 10) {
            formIsValid = false;
            error_client["fullname"] = "Tên quá ngắn";
        }

        if (fields["fullname"].length > 255) {
            formIsValid = false;
            error_client["fullname"] = "Tên quá dài";
        }

        this.setState({ error_client: error_client });
        return formIsValid;
    };

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
    };

    handleUpdateInfo = (event) => {
        event.preventDefault();
        if (this.validateInfo() === true) {
            debugger;
            const { newData } = this.state;

            const newInfo = {
                fullname: newData.fullname,
                status: newData.status
            };
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');
            axios.put("http://127.0.0.1:8000/api/auth/update-info-user/" + this.props.match.params.id, newInfo)
                .then(res => {
                    console.log(res.data)
                    Swal.fire({
                        icon: "success",
                        title: "Wow!!!",
                        text: "Update successfully"
                    }).then((result) => {
                        this.props.history.push("/users")
                    })
            
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

    handleUpdatePassword = (event) => {
        event.preventDefault(); 
        if (this.validatePassword() === true) {
            const { newPassword } = this.state;
            const fd = new FormData();
            fd.append("currentPassword", newPassword.currentPassword);
            fd.append("password", newPassword.password);
            fd.append("confirmPassword", newPassword.confirmPassword);

            const reset = this.handleResetButton;

            const password = {
                oldPassword: this.state.newPassword.currentPassword,
                newPassword: this.state.newPassword.password,
                confirmPassword: this.state.newPassword.confirmPassword
            };
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');
            axios.put('http://127.0.0.1:8000/api/auth/update-password/', password)
                .then(res => {
                    console.log(res.data)
                    Swal.fire({
                        icon: "success",
                        title: "Wow!!!",
                        text: "Update successfully"
                    }).then(
                        reset
                    );
                    this.setState({
                        message_error_server: true
                    });

                })
                .catch(err => {
                    console.log(err.response)
                    if (err.response !== null && err.response.status === 401) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Ôi...',
                            text: 'Mật khẩu hiện tại không đúng!'
                        }).then(
                            reset
                        );
                    }
                });
        }else {
            Object.keys(this.state.fieldPassword)
                .filter(item => !this.state.fieldPassword[item])
                .map(item => {
                    this.setState({
                        [item]: false
                    });
                });
        }
    };

    handleResetButton = event => {
        document.getElementById("formUpdateUser").reset();
        this.setState({
            fields: {
                fullname: this.state.user.fullname,
                password: "",
            },
            fullname: true,
            password: true,
            message_error_server: true
        });
    };

    render() {
        console.log(this.state.fields)
        let imgPreview;
        if (this.state.file) {
            imgPreview = <img src={this.state.file} alt='' className="mx-auto img-fluid img-circle d-block rounded-circle" id="output" alt="avatar" style={{ maxHeight: '60%', maxWidth: '60%' }}/>;
        }
        return (
            <div className="right_col" role="main" style={{ minHeight: '720px' }}>
                <div className="row">
                    <div className="col-md-12 col-sm-12 ">
                        <div className="x_panel">
                            <div className="x_title">
                                <h2>
                                    <Link to={'/'}>Home Page / </Link><Link to={'/users'}>List Users</Link></h2>
                                <div className="clearfix" />
                            </div>
                            <div className="x_content">
                                <div className="container">
                                    <div className="row my-2">
                                        <div className="col-lg-8 order-lg-2">
                                            <ul className="nav nav-tabs">
                                                <li className="nav-item">
                                                    <a href data-target="#profile" data-toggle="tab" className="nav-link active">Profile</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href data-target="#edit_info" data-toggle="tab" className="nav-link">Edit Profile</a>
                                                </li>
                                            </ul>
                                            <div className="tab-content py-4">
                                                <div className="tab-pane active" id="profile">
                                                    <h5 className="mb-3">User Profile</h5>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <h6>Name</h6>
                                                            <p style={{ fontSize: '18px' }}>{this.state.user.fullname}</p>
                                                            <h6>Email</h6>
                                                            <p style={{ fontSize: '18px' }}>{this.state.user.email}</p>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <h6>Address</h6>
                                                            <p style={{ fontSize: '18px' }}>Khu 2, Hoàng Cương, Thanh Ba, Phú Thọ</p>
                                                            <hr />
                                                            <h6>Status</h6>
                                                            {(() => {
                                                                if (this.state.user.status == 1) {
                                                                    return (
                                                                        <>
                                                                            <p style={{ fontSize: '18px', color: 'blueviolet' }}>Active</p>
                                                                        </>
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <>
                                                                            <p style={{ fontSize: '18px', color: 'red' }}>Lock</p>
                                                                        </>
                                                                    )
                                                                }
                                                            })()}
                                                        </div>
                                                        <div className="col-md-12">
                                                            <h5 className="mt-2"><span className="fa fa-clock-o ion-clock float-right" /> Recent Activity</h5>
                                                            <table className="table table-sm table-hover table-striped">
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <strong>Abby</strong>joined ACME Project Team in<strong>`Collaboration`</strong>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <strong>Gary</strong>deleted My Board1 in<strong>`Discussions`</strong>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <strong>Kensington</strong>deleted MyBoard3 in<strong>`Discussions`</strong>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <strong>John</strong>deleted My Board1 in<strong>`Discussions`</strong>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <strong>Skell</strong>deleted his post Look at Why this is.. in<strong>`Discussions`</strong>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="tab-pane" id="edit_info">
                                                    <form onSubmit={(event) => this.handleUpdateInfo(event)} id="formUpdateUser">
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
                                                        <div className="form-group row">
                                                            <label className="col-lg-3 col-form-label form-control-label">Full name</label>
                                                            <div className="col-lg-9">
                                                                <input className="form-control" type="text" defaultValue={this.state.user.fullname} name="fullname" onChange={(event) => { this.handleChange(event) }} maxLength={255} />
                                                                <span className="error" style={{ color: "red", fontSize: 16 }}>
                                                                    {
                                                                        this.state.error_client[
                                                                        "fullname"
                                                                        ]
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-lg-3 col-form-label form-control-label">Status</label>
                                                            <div className="col-lg-9">
                                                                <select className="form-control" name="status" defaultValue={this.state.user.status} onChange={this.handleChange}>
                                                                    <option value="">Status</option>
                                                                    <option value="1">Active</option>
                                                                    <option value="2">Lock</option>
                                                                </select>

                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-lg-3 col-form-label form-control-label">Email</label>
                                                            <div className="col-lg-9">
                                                                <input className="form-control" type="email" disabled defaultValue={this.state.user.email} />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-lg-3 col-form-label form-control-label">Address</label>
                                                            <div className="col-lg-9">
                                                                <input className="form-control" type="text" disabled defaultValue="Khu 2, Hoàng Cương, Thanh Ba, Phú Thọ" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-lg-3 col-form-label form-control-label" />
                                                            <div className="col-lg-9">
                                                                <button className="btn btn-primary" type="button" onClick={this.handleResetButton}>Refresh</button>
                                                                <button type="submit" className="btn btn-success">Update</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 order-lg-1 text-center">
                                            {(() => {
                                                if (this.state.user.avatar != null) {
                                                    return (
                                                            
                                                        <>
                                                            {(() => {
                                                                if (this.state.file != null) {
                                                                    return (<>
                                                                        {imgPreview}
                                                                    </>
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <>
                                                                            <img src={this.state.user.avatar} className="mx-auto img-fluid img-circle d-block rounded-circle" id="output" alt="avatar" style={{ maxHeight: '60%', maxWidth: '60%' }} />
                                                                        </>
                                                                    )
                                                                }
                                                            })()}
                                                        </>
                                                    );
                                                } else {
                                                    return (
                                                        <>
                                                            {(() => {
                                                                if (this.state.file != null) {
                                                                    return (
                                                                        <>
                                                                            {imgPreview}
                                                                        </>
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <>
                                                                            <img src="https://image.ibb.co/jw55Ex/def_face.jpg" className="mx-auto img-fluid img-circle d-block rounded-circle" id="output" alt="avatar" style={{ maxHeight: '60%', maxWidth: '60%' }} />
                                                                        </>
                                                                    )
                                                                }
                                                            })()}
                                                            
                                                        </>
                                                    )
                                                }
                                            })()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default DetailUser;