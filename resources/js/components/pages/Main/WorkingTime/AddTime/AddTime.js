import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import ServerError from "../Common/ServerErrorMessage";
import TextField from "@material-ui/core/TextField";
import "../error.css";
import ClientError from "../Common/ClientErrorMessage";
import Title from "../Common/Title";
import Label from "../Common/Label";
import {REQUEST_ADD_TIME,LIST_TIME_URL,ADD_TIME_URL,REQUEST_STORE_TIME} from "../../../../CONSTANT/Constants"
class AddTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error_server: {},
            error_client: {},
            listName: [],
            newData: {
                employee_id: "",
                name: "",
                time: "",
                type: "",
                created_by: "",
                updated_by: ""
            },
            fields: {
                employee_id: "",
                name: "",
                time: "",
                type: "",
                created_by: "",
                updated_by: ""
            },
            employee_id: true,
            name: true,
            time: true,
            type: true,
            created_by: true,
            updated_by: true,
            disable_message: "disable_message",
            enable_message: "enable_message",
            disable_border: "disable_border",
            enable_border: "enable_border",
            enable_server: "enable_server",
            disable_server: "disable_server",
            message_error_server: true
        };
    }
    handleValidation() {
        const fields = this.state.fields;
        const error_client = {};
        var formIsValid = true;
        if (!fields["type"]) {
            formIsValid = false;
            error_client["type"] = "Please select type here";
        }
        if (fields["name"] === "") {
            formIsValid = false;
            error_client["name"] = "Please select name here";
        }
        if (fields["time"] === "") {
            formIsValid = false;
            error_client["time"] = "Please put something here";
        }
        if (!fields["created_by"]) {
            formIsValid = false;
            error_client["created_by"] = "Please put something here";
        }
        if (!fields["updated_by"]) {
            formIsValid = false;
            error_client["updated_by"] = "Please put something here";
        }
        this.setState({ error_client: error_client });
        return formIsValid;
    }
    componentDidMount() {
        
        axios({
            url: REQUEST_ADD_TIME
        })
            .then(res => {
                this.setState({
                    listName: res.data
                });
            })
            .catch(err => console.log(err));
    }
    isChangeInput = event => {
        const { newData } = this.state;
        const name = event.target.name;
        const value = event.target.value;
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
    handleSubmit = event => {
        event.preventDefault();
        if (this.handleValidation() === true) {
            const { newData } = this.state;
            const fd = new FormData();
            fd.append("name", newData.name);
            fd.append("time", newData.time);
            fd.append("type", newData.type);
            fd.append("created_by", newData.created_by);
            fd.append("updated_by", newData.updated_by);
            axios
                .post(REQUEST_STORE_TIME, fd)
                .then(res => {
                    $("#message-error").css("display", "none");
                    Swal.fire({
                        icon: "success",
                        text: "Created time successfully"
                    }).then(function () {
                        window.location.href = LIST_TIME_URL;
                    });
                })
                .catch(err => {
                    this.setState({
                        error_server: err.response.data.errors,
                        message_error_server: false
                    });
                    $("#message-error").css("display", "block");
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
            <div className="right_col">
                <h2>
                    <Title href={LIST_TIME_URL} value="Working times" />/<Title href={ADD_TIME_URL} value="Add time" />
                </h2>
                <div className="row">
                    <div className="col-sm-8 offset-sm-2">
                        <h6 className="display-4 title-edit"><Title href={ADD_TIME_URL} value="Add time" /></h6>
                        <div>
                            <div className="clearfix"></div>
                            <div className="row mt-2">
                                <div className="col-md-12 col-sm-12">
                                    <div className="x_panel">
                                        <div className="x_content">
                                            <div
                                                className={
                                                    this.state
                                                        .message_error_server
                                                        ? this.state
                                                            .disable_server
                                                        : this.state
                                                            .enable_server
                                                }
                                            >
                                                <ul className="ul-error">
                                                    {Object.keys(
                                                        this.state.error_server
                                                    ).map((error, index) => (
                                                        <ServerError
                                                            message={
                                                                this.state
                                                                    .error_server[
                                                                error
                                                                ][0]
                                                            }
                                                            key={index}
                                                        />
                                                    ))}
                                                </ul>
                                            </div>
                                            {/* <MainAdd
                                            handleSubmit={this.handleSubmit}
                                            isChangeInput={this.isChangeInput}
                                            /> */}
                                            <form
                                                method="POST"
                                                id="create-form"
                                                onSubmit={event =>
                                                    this.handleSubmit(event)
                                                }
                                            >
                                                <div className="form-group">
                                                    <Label value={"Name:"} />
                                                    <select
                                                        name="name"
                                                        id=""
                                                        className={
                                                            "form-control select-cre " +
                                                            (this.state.name
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
                                                        onChange={event => {
                                                            this.isChangeInput(
                                                                event
                                                            );
                                                        }}
                                                    >
                                                        <option>
                                                            Select name:
                                                        </option>
                                                        {this.state.listName.map(
                                                            (object, index) => (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        object.id
                                                                    }
                                                                >
                                                                    {
                                                                        object.name
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                    <ClientError
                                                        message={
                                                            this.state
                                                                .error_client[
                                                            "name"
                                                            ]
                                                        }
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <Label value={"Time:"} />
                                                    <TextField
                                                        className={
                                                            "form-control select-cre " +
                                                            (this.state.time
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
                                                        name="time"
                                                        onChange={event => {
                                                            this.isChangeInput(
                                                                event
                                                            );
                                                        }}
                                                        id="datetime-local"
                                                        type="datetime-local"
                                                        
                                                    />
                                                    <ClientError
                                                        message={
                                                            this.state
                                                                .error_client[
                                                            "time"
                                                            ]
                                                        }
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <Label value={"Type:"} />
                                                    <select
                                                        name="type"
                                                        id=""
                                                        className={
                                                            "form-control select-cre " +
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
                                                        onChange={event => {
                                                            this.isChangeInput(
                                                                event
                                                            );
                                                        }}
                                                    >
                                                        <option value="">
                                                            Select type
                                                        </option>
                                                        <option value="2">
                                                            Check-in
                                                        </option>
                                                        <option value="1">
                                                            Check-out
                                                        </option>
                                                    </select>
                                                    <ClientError
                                                        message={
                                                            this.state
                                                                .error_client[
                                                            "type"
                                                            ]
                                                        }
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <Label value={"Created by:"} />
                                                    <input
                                                        type="text"
                                                        className={
                                                            "form-control select-cre " +
                                                            (this.state
                                                                .created_by
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
                                                        name="created_by"
                                                        onChange={event => {
                                                            this.isChangeInput(
                                                                event
                                                            );
                                                        }}
                                                    />
                                                    <ClientError
                                                        message={
                                                            this.state
                                                                .error_client[
                                                            "created_by"
                                                            ]
                                                        }
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <Label value={"Updated by:"} />
                                                    <input
                                                        type="text"
                                                        className={
                                                            "form-control select-cre " +
                                                            (this.state
                                                                .updated_by
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
                                                        name="updated_by"
                                                        onChange={event => {
                                                            this.isChangeInput(
                                                                event
                                                            );
                                                        }}
                                                    />
                                                    <ClientError
                                                        message={
                                                            this.state
                                                                .error_client[
                                                            "updated_by"
                                                            ]
                                                        }
                                                    />
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="btn btn-success-create"
                                                >
                                                    Add time
                                                </button>
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
    }
}

export default AddTime;
