import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import Error from "../Message/Error";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

class InfoUser extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            file: null,
            base64: null,
            error_server: {},
            error_client: {},
            newData: {
                fullname: ''
            },
            newPassword: {
                currentPassword: '',
                password: '',
                confirmPassword: ''
            },
            fields: {
                fullname: '',
            },
            fieldPassword: {
                currentPassword: '',
                password: '',
                confirmPassword: ''
            },
            fullname: true,
            currentPassword: true,
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
        this.uploadSingleFile = this.uploadSingleFile.bind(this);
    }

    uploadSingleFile(e) {
        this.setState({
            file: URL.createObjectURL(e.target.files[0]),
        })

        let fileName = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(fileName);
        reader.onload = () => {
            var rawLog = reader.result;
            this.setState({
                base64: rawLog
            });        
        }
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');
        axios.get("http://127.0.0.1:8000/api/auth/user")
            .then(res => {
                console.log(res)
                this.setState({
                    user: res.data,
                    newData: {
                        fullname: res.data.fullname
                    },
                    fields: {
                        fullname: res.data.fullname
                    }
                });
            })
            .catch(err => console.log(err));
    }

    UpdateaAvatar = (event) => {
        event.preventDefault();
        const newCompany = {
            avatar: this.state.base64,
            file: this.state.file
        };
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');
            axios.put('http://127.0.0.1:8000/api/auth/update-avatar', newCompany)
                .then(res => {                    
                    console.log(res.data.avatar)
                    Swal.fire({
                        title: 'Đổi avatar thành công.',
                        width: 600,
                        padding: '3em',
                        background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
                        backdrop: `
                          rgba(0,0,123,0.4)
                          url("https://sweetalert2.github.io/images/nyan-cat.gif")
                          left top
                          no-repeat
                        `
                    })
                })
    };

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

    validatePassword() {
        const fields = this.state.fieldPassword;
        const error_client = {};
        var formIsValid = true;

        //Current Password
        if (fields["currentPassword"] === "") {
            formIsValid = false;
            error_client["currentPassword"] = "Vui lòng nhập mật khẩu hiện tại";
        }

        if (fields["currentPassword"].length > 255) {
            formIsValid = false;
            error_client["currentPassword"] = "Mật khẩu quá dài";
        }

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

        if (value.trim() !== "") {
            this.setState({
                [name]: true
            });
        }
    };

    handleChangePassword = (evt) => {
        const { newPassword } = this.state;
        const name = evt.target.name;
        const value = evt.target.value;
        const fields = this.state.fieldPassword;
        fields[name] = value;
        const data = { ...newPassword, [name]: value };
        this.setState({
            newPassword: data,
            fields
        });

        if (value.trim() !== "") {
            this.setState({
                [name]: true
            });
        }
    };

    handleUpdateInfo = (event) => {
        event.preventDefault();
        if (this.validateInfo() === true) {
            const { newData } = this.state;
            const fd = new FormData();
            fd.append("fullname", newData.fullname)
            
            const newInfo = {
                fullname: this.state.newData.fullname
            };
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');
            axios.put('http://127.0.0.1:8000/api/auth/update-info/', newInfo)
                .then(res => {
                    console.log(res.data)
                    Swal.fire({
                        icon: "success",
                        title: "Wow!!!",
                        text: "Update successfully"
                    });
                    this.setState({
                        message_error_server: true,
                        user: res.data.user
                    });

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
        document.getElementById("formUpdatePassword").reset();
        this.setState({
            fieldPassword: {
                currentPassword: "",
                password: "",
                confirmPassword: ""
            },
            currentPassword: true,
            password: true,
            confirmPassword: true,
            message_error_server: true
        });
    };

    render() {
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
                                    <Link to={'/'}>Home Page / </Link><Link to={'/user/info'}>Info User</Link></h2>
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
                                                <li className="nav-item">
                                                    <a href data-target="#change_password" data-toggle="tab" className="nav-link">Change Password</a>
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
                                                            <span className="badge badge-primary"><i className="fa fa-user" /> 900 Followers</span>
                                                            <span className="badge badge-success"><i className="fa fa-cog" /> 43 Forks</span>
                                                            <span className="badge badge-danger"><i className="fa fa-eye" /> 245 Views</span>
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
                                                    <form onSubmit={(event) => this.handleUpdateInfo(event)} id="formUpdateInfo">
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
                                                                <input className="form-control" type="text" name="fullname" defaultValue={this.state.user.fullname} onChange={(event) => { this.handleChange(event) }} maxLength={255} />
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
                                                                <button className="btn btn-primary" type="reset">Refresh</button>
                                                                <button type="submit" className="btn btn-success">Update</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                                <div className="tab-pane" id="change_password">
                                                    <form onSubmit={(event) => this.handleUpdatePassword(event)} id="formUpdatePassword">
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
                                                            <label className="col-lg-3 col-form-label form-control-label">Current Password</label>
                                                            <div className="col-lg-9">
                                                                <input className="form-control" type="password" name="currentPassword" onChange={(event) => { this.handleChangePassword(event) }} maxLength={255} />
                                                                <span className="error" style={{ color: "red", fontSize: 16 }}>
                                                                    {
                                                                        this.state.error_client[
                                                                        "currentPassword"
                                                                        ]
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-lg-3 col-form-label form-control-label">Password</label>
                                                            <div className="col-lg-9">
                                                                <input className="form-control" type="password" name="password" onChange={(event) => { this.handleChangePassword(event) }} maxLength={255} />
                                                                <span className="error" style={{ color: "red", fontSize: 16 }}>
                                                                    {
                                                                        this.state.error_client[
                                                                        "password"
                                                                        ]
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-lg-3 col-form-label form-control-label">Confirm password</label>
                                                            <div className="col-lg-9">
                                                                <input className="form-control" type="password" name="confirmPassword" onChange={(event) => { this.handleChangePassword(event) }} maxLength={255} />
                                                                <span className="error" style={{ color: "red", fontSize: 16 }}>
                                                                    {
                                                                        this.state.error_client[
                                                                        "confirmPassword"
                                                                        ]
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-lg-3 col-form-label form-control-label" />
                                                            <div className="col-lg-9">
                                                                <button className="btn btn-primary" type="reset">Refresh</button>
                                                                <button type="submit" className="btn btn-success">Update</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 order-lg-1 text-center">
                                            <form onSubmit={(event) => this.UpdateaAvatar(event)} id="changeAvatar">
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
                                                <h6 className="mt-2">Upload your avatar</h6>
                                                <label className="custom-file">
                                                    <input type="file" name="avatar" id="file-upload" accept="image/*" onChange={this.uploadSingleFile} className="custom-file-input" />
                                                    <span id="file-name" className="custom-file-control">Choose file</span>
                                                </label>
                                                <br />
                                                <hr />
                                                <div className="form-group row">
                                                    <label className="col-lg-3 col-form-label form-control-label" />
                                                    <div className="col-lg-6">
                                                        <button type="submit" className="btn btn-success">Update</button>
                                                    </div>
                                                </div>
                                            </form>
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

export default InfoUser;