import React, { Component, createRef } from 'react';
import axios from 'axios';
import Swal from "sweetalert2/dist/sweetalert2.js";
import 'sweetalert2/src/sweetalert2.scss';
import ServerError from '../Common/ServerErrorMessage';
import TextField from '@material-ui/core/TextField';
import dayjs from 'dayjs';
import Title from '../Common/Title';
import {REQUEST_EDIT_TIME,REQUEST_UPDATE_TIME,LIST_TIME_URL} from "../../../../CONSTANT/Constants";
class EditTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error_server: {},
            error_client: {},
            newData: {
                id: '',
                name: '',
                time: ''
            },
            fields: {
                employee_id: "",
                name: "",
                time: "",
                type: "",
            },
            keepValueSelectTag: {
                type: ""
            },
            employee_id: true,
            name: true,
            time: true,
            type: true,
            disable_message: "disable_message",
            enable_message: "enable_message",
            disable_border: "disable_border",
            enable_border: "enable_border",
            enable_server: "enable_server",
            disable_server: "disable_server",
            message_error_server: true
        }
    }
    componentDidMount() {
        axios.get(REQUEST_EDIT_TIME + this.props.match.params.id)
            .then(res => {
                this.setState({
                    fields: {
                        employee_id: res.data.employee_id,
                        name: res.data.employee.name,
                        time: res.data.time,
                        type: res.data.type,
                    },
                    newData: {
                        id: res.data.id,
                        name: res.data.employee.name,
                        time: res.data.time
                    },
                    keepValueSelectTag: {
                        type: res.data.type,
                    },
                });
                console.log(res.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    isChangeInput = event => {
        const { newData, keepValueSelectTag, fields } = this.state;
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            newData: { ...newData, [name]: value },
            keepValueSelectTag: {
                ...keepValueSelectTag,
                [name]: value
            },
            fields: { ...fields, [name]: value }
        });
        if (value.trim() !== "") {
            this.setState({
                [name]: true
            });
        }
    }
    handleValidation() {
        const { fields, keepValueSelectTag } = this.state;
        const error_client = {};
        var formIsValid = true;
        if (!fields["type"]) {
            formIsValid = false;
            error_client["type"] = "Please select type here";
        }
        if (fields["time"] === "") {
            formIsValid = false;
            error_client["time"] = "Please put something here";
        }
        if (keepValueSelectTag["type"] === "") {
            formIsValid = false;
            error_client["type"] = "Please select type here";
        }
        this.setState({ error_client: error_client });
        return formIsValid;
    }
    handleSubmit = event => {
        event.preventDefault();
        if (this.handleValidation() === true) {
            const { newData, keepValueSelectTag } = this.state;
            const fd = new FormData();
            fd.append("name", newData.name);
            fd.append("time", newData.time);
            fd.append("type", keepValueSelectTag.type);
            fd.append("_method", 'put');
            axios({
                method: "POST",
                url: REQUEST_UPDATE_TIME + newData.id,
                data: fd,
            }).then(res => {
                this.setState({
                    message_error_server: true
                });
                Swal.fire({
                    icon: "success",
                    text: "Updated time successfully"
                }).then(function () {
                    window.location.href = LIST_TIME_URL
                });
            })
                .catch(err => {
                    this.setState({
                        error_server: err.response.data.errors,
                        message_error_server: false
                    });
                });
        }
        else {
            Object.keys(this.state.fields)
                .filter(item => !this.state.fields[item])
                .map(item => {
                    this.setState({
                        [item]: false
                    });
                });
        }
    }
    render() {
        return (
            <div className="right_col" >
                <h2>
                    <Title href={LIST_TIME_URL} value="Working times" />/<Title  value="Edit time" />
                </h2>
                <div className="clearfix"></div>
                <div className="row mt-2">
                    <div className="col-md-12 col-sm-12">
                        <div className="x_panel">
                            <div className="x_content">
                                <div className="col-sm-8 offset-sm-2">
                                    <h6 className="display-4 title-edit" ><Title  value="Edit time" /></h6>
                                    <div className={this.state.message_error_server ? this.state.disable_server : this.state.enable_server}>
                                        <ul className="ul-error">
                                            {Object.keys(this.state.error_server).map((error, index) => (
                                                <ServerError message={this.state.error_server[error][0]} key={index} />))}
                                        </ul>
                                    </div>
                                    <form method="post" action="" id="edit-form" onSubmit={event => { this.handleSubmit(event); }}>
                                        <div className="form-group">
                                            <label >Name: </label>
                                            <p type="text" id="disabledTextInput" className="form-control input-edit">{this.state.newData.name}</p>
                                        </div>
                                        {/* <div className="form-group">
                                            <label >Time:</label>
                                            <input type="text" className={"form-control select-cre " + (this.state.time ? this.state.disable_message + " " + this.state.disable_border : this.state.enable_message + " " + this.state.enable_border)} name="time" value={this.state.newData.time} onChange={event => { this.isChangeInput(event); }} />
                                            <span className="error">{this.state.error_client["time"]}</span>
                                        </div> */}
                                        <div className="form-group">
                                            <label>Time:<span className="required">*</span></label>
                                            <TextField
                                                className={"form-control select-cre " + (this.state.time ? this.state.disable_message + " " + this.state.disable_border : this.state.enable_message + " " + this.state.enable_border)} name="time" value={dayjs(this.state.newData.time).format('YYYY-MM-DDThh:mm')} onChange={event => { this.isChangeInput(event); }}
                                                id="datetime-local"type="datetime-local"
                                                />
                                            <span className="error">{this.state.error_client["time"]}</span>
                                        </div>
                                        <div className="form-group">
                                            <label >Type:</label>
                                            <select name="type" id="" className={"form-control select-cre " + (this.state.type ? this.state.disable_message + " " + this.state.disable_border : this.state.enable_message + " " + this.state.enable_border)} value={this.state.keepValueSelectTag.type} onChange={event => { this.isChangeInput(event); }}>
                                                <option value="">Select type</option>
                                                <option value="2">Check-in</option>
                                                <option value="1">Check-out</option>
                                            </select>
                                            <span className="error">{this.state.error_client["type"]}</span>
                                        </div>
                                        <button type="submit" className="btn btn-primary-edit confirm-edit">Submit </button>
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

export default EditTime;
