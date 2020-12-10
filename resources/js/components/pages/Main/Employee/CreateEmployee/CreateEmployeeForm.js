import React, { Component } from "react";
import { isValidStyle } from "../../../../CSS/ValidateClientStyle";
import CreateEmployeeFormButton from "./CreateEmployeeFormButton";
class CreateEmployeeForm extends Component {
    constructor(props) {
        super(props);
    }
    // Style message error
    styleBorderError = item => {
        return item ? isValidStyle.disable_border : isValidStyle.enable_border;
    };
    styleMessageError = item => {
        return item
            ? isValidStyle.disable_message
            : isValidStyle.enable_message;
    };
    render() {
        return (
            <form
                onSubmit={event => this.props.handleSubmit(event)}
                id="signupForm"
                ref={node => {
                    this.heading = node;
                }}
            >
                <div className="field item form-group ">
                    <label className="col-form-label col-md-3 col-sm-3  label-align">
                        Upload
                        <span className="required">*</span>
                    </label>
                    <div className="col-md-6 col-sm-6">
                        <input
                            className="form-control reset "
                            style={this.styleBorderError(this.props.image)}
                            type="file"
                            id="image"
                            name="image"
                            onChange={event => {
                                this.props.isChangeInputFile(event);
                            }}
                        />
                        <span
                            className="error"
                            style={this.styleMessageError(this.props.image)}
                        >
                            {this.props.error_client["image"]}
                        </span>
                    </div>
                </div>

                <div className="field item form-group ">
                    <label className="col-form-label col-md-3 col-sm-3  label-align">
                        Name
                        <span className="required">*</span>
                    </label>
                    <div className="col-md-6 col-sm-6">
                        <input
                            className="form-control reset"
                            type="text"
                            id="name"
                            name="name"
                            style={this.styleBorderError(this.props.name)}
                            onChange={event => {
                                this.props.isChangeInput(event);
                            }}
                        />
                        <span
                            className="error"
                            style={this.styleMessageError(this.props.name)}
                        >
                            {this.props.error_client["name"]}
                        </span>
                    </div>
                </div>
                <div className="field item form-group ">
                    <label className="col-form-label col-md-3 col-sm-3  label-align">
                        Email
                        <span className="required">*</span>
                    </label>
                    <div className="col-md-6 col-sm-6">
                        <input
                            className="form-control reset "
                            style={this.styleBorderError(this.props.email)}
                            type="email"
                            id="email"
                            name="email"
                            onChange={event => {
                                this.props.isChangeInput(event);
                            }}
                        />
                        <span
                            className="error"
                            style={this.styleMessageError(this.props.email)}
                        >
                            {this.props.error_client["email"]}
                        </span>
                    </div>
                </div>

                <div className="field item form-group ">
                    <label className="col-form-label col-md-3 col-sm-3  label-align">
                        Day or birth
                        <span className="required">*</span>
                    </label>
                    <div className="col-md-6 col-sm-6">
                        <input
                            id="day_of_birth"
                            className="form-control reset "
                            style={this.styleBorderError(
                                this.props.day_of_birth
                            )}
                            type="date"
                            name="day_of_birth"
                            max="2000-12-31"
                            onChange={event => {
                                this.props.isChangeInput(event);
                            }}
                        />
                        <span
                            className="error"
                            style={this.styleMessageError(
                                this.props.day_of_birth
                            )}
                        >
                            {this.props.error_client["day_of_birth"]}
                        </span>
                    </div>
                </div>
                <div className="field item form-group ">
                    <label className="col-form-label col-md-3 col-sm-3  label-align">
                        Phone number
                        <span className="required">*</span>
                    </label>
                    <div className="col-md-6 col-sm-6">
                        <input
                            className="form-control reset "
                            style={this.styleBorderError(this.props.phone)}
                            type="text"
                            id="phone"
                            name="phone"
                            onChange={event => {
                                this.props.isChangeInput(event);
                            }}
                        />
                        <span
                            className="error"
                            style={this.styleMessageError(this.props.phone)}
                        >
                            {this.props.error_client["phone"]}
                        </span>
                    </div>
                </div>
                <div className="field item form-group ">
                    <label className="col-form-label col-md-3 col-sm-3  label-align">
                        Address
                        <span className="required">*</span>
                    </label>
                    <div className="col-md-6 col-sm-6">
                        <input
                            className="form-control reset "
                            style={this.styleBorderError(this.props.address)}
                            type="text"
                            id="address"
                            name="address"
                            onChange={event => {
                                this.props.isChangeInput(event);
                            }}
                        />
                        <span
                            className="error"
                            style={this.styleMessageError(this.props.address)}
                        >
                            {this.props.error_client["address"]}
                        </span>
                    </div>
                </div>
                <div className="field item form-group ">
                    <label className="col-form-label col-md-3 col-sm-3  label-align">
                        Gender
                        <span className="required">*</span>
                    </label>
                    <div className="col-md-6 col-sm-6">
                        <select
                            className="form-control reset "
                            style={this.styleBorderError(this.props.gender)}
                            type="text"
                            id="gender"
                            name="gender"
                            onChange={event => {
                                this.props.isChangeInput(event);
                            }}
                        >
                            <option value="">Choose gender...</option>
                            <option value="0">Female</option>
                            <option value="1">Male</option>
                        </select>
                        <span
                            className="error"
                            style={this.styleMessageError(this.props.gender)}
                        >
                            {this.props.error_client["gender"]}
                        </span>
                    </div>
                </div>
                <div className="field item form-group ">
                    <label className="col-form-label col-md-3 col-sm-3  label-align">
                        Identification Card
                        <span className="required">*</span>
                    </label>
                    <div className="col-md-6 col-sm-6">
                        <input
                            className="form-control reset "
                            style={this.styleBorderError(
                                this.props.identification_card
                            )}
                            type="text"
                            id="identification_card"
                            name="identification_card"
                            onChange={event => {
                                this.props.isChangeInput(event);
                            }}
                        />
                        <span
                            className="error"
                            style={this.styleMessageError(
                                this.props.identification_card
                            )}
                        >
                            {this.props.error_client["identification_card"]}
                        </span>
                    </div>
                </div>
                <div className="field item form-group ">
                    <label className="col-form-label col-md-3 col-sm-3 label-align">
                        Position
                        <span className="required">*</span>
                    </label>
                    <div className="col-md-6 col-sm-6">
                        <select
                            className="form-control reset "
                            style={this.styleBorderError(
                                this.props.position_id
                            )}
                            id="position_id"
                            name="position_id"
                            onChange={event => {
                                this.props.isChangeInput(event);
                            }}
                        >
                            <option value="">Choose position...</option>

                            {this.props.listPosition.map((position, index) => (
                                <option key={index} value={position.id}>
                                    {position.name}
                                </option>
                            ))}
                        </select>
                        <span
                            className="error"
                            style={this.styleMessageError(
                                this.props.position_id
                            )}
                        >
                            {this.props.error_client["position_id"]}
                        </span>
                    </div>
                </div>
                <div className="field item form-group ">
                    <label className="col-form-label col-md-3 col-sm-3  label-align">
                        Department
                        <span className="required">*</span>
                    </label>
                    <div className="col-md-6 col-sm-6">
                        <select
                            className="form-control reset "
                            style={this.styleBorderError(
                                this.props.department_id
                            )}
                            id="department_id"
                            name="department_id"
                            data-validate-minmax="10,100"
                            onChange={event => {
                                this.props.isChangeInput(event);
                            }}
                        >
                            <option value="">Chooser department...</option>

                            {this.props.listDepartment.map(
                                (department, index) => (
                                    <option key={index} value={department.id}>
                                        {department.name}
                                    </option>
                                )
                            )}
                        </select>
                        <span
                            className="error"
                            style={this.styleMessageError(
                                this.props.department_id
                            )}
                        >
                            {this.props.error_client["department_id"]}
                        </span>
                    </div>
                </div>
                <CreateEmployeeFormButton
                    handleReset={this.props.handleReset}
                />
            </form>
        );
    }
}

export default CreateEmployeeForm;
