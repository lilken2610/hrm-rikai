import React, { Component } from "react";
import { isValidStyle } from "../../../../CSS/ValidateClientStyle";
import UpdateEmployeeFormButton from './UpdateEmployeeFromButton';
class UpdateEmployeeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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
            <div className="col-sm-9 col-md-9">
                <div className="field item form-group ">
                    <label className="col-form-label col-md-3 col-sm-3 d-flex align-items-center label-align">
                        Name
                        <span className="required">*</span>
                    </label>
                    <div className="col-md-8 col-sm-8">
                        <input
                            style={this.styleBorderError(this.props.name)}
                            className="form-control reset "
                            type="text"
                            name="name"
                            data-validate-minmax="10,100"
                            value={this.props.fields.name}
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
                    <label className="col-form-label col-md-3 col-sm-3 d-flex align-items-center label-align">
                        Email
                        <span className="required">*</span>
                    </label>
                    <div className="col-md-8 col-sm-8">
                        <input
                            style={this.styleBorderError(this.props.email)}
                            className="form-control reset "
                            type="email"
                            name="email"
                            data-validate-minmax="10,100"
                            value={this.props.fields.email}
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
                    <label className="col-form-label col-md-3 col-sm-3 d-flex align-items-center label-align">
                        Day of birth
                        <span className="required">*</span>
                    </label>
                    <div className="col-md-8 col-sm-8">
                        <input
                            style={this.styleBorderError(
                                this.props.day_of_birth
                            )}
                            className="form-control reset "
                            type="date"
                            name="day_of_birth"
                            data-validate-minmax="10,100"
                            max="2000-12-31"
                            value={this.props.fields.day_of_birth}
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
                    <label className="col-form-label col-md-3 col-sm-3 d-flex align-items-center label-align">
                        Address
                        <span className="required">*</span>
                    </label>
                    <div className="col-md-8 col-sm-8">
                        <input
                            style={this.styleBorderError(this.props.address)}
                            className="form-control reset "
                            type="text"
                            name="address"
                            data-validate-minmax="10,100"
                            value={this.props.fields.address}
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
                    <label className="col-form-label col-md-3 col-sm-3 d-flex align-items-center label-align">
                        Gender
                        <span className="required">*</span>
                    </label>
                    <div className="col-md-8 col-sm-8">
                        <select
                            style={this.styleBorderError(this.props.gender)}
                            className="form-control reset "
                            type="number"
                            id="gender"
                            name="gender"
                            data-validate-minmax="10,100"
                            value={this.props.targetSelectTagValue.gender}
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
                    <label className="col-form-label col-md-3 col-sm-3 d-flex align-items-center label-align">
                        Identification Card
                        <span className="required">*</span>
                    </label>
                    <div className="col-md-8 col-sm-8">
                        <input
                            style={this.styleBorderError(
                                this.props.identification_card
                            )}
                            className="form-control reset "
                            type="text"
                            name="identification_card"
                            data-validate-minmax="10,100"
                            value={this.props.fields.identification_card}
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
                    <label className="col-form-label col-md-3 col-sm-3 d-flex align-items-center label-align">
                        Phone
                        <span className="required">*</span>
                    </label>
                    <div className="col-md-8 col-sm-8">
                        <input
                            style={this.styleBorderError(this.props.phone)}
                            className="form-control reset "
                            type="text"
                            name="phone"
                            data-validate-minmax="10,100"
                            value={this.props.fields.phone}
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
                    <label className="col-form-label col-md-3 col-sm-3 d-flex align-items-center label-align">
                        Position
                        <span className="required">*</span>
                    </label>
                    <div className="col-md-8 col-sm-8">
                        <select
                            style={this.styleBorderError(
                                this.props.position_id
                            )}
                            className="form-control reset "
                            name="position_id"
                            data-validate-minmax="10"
                            value={this.props.targetSelectTagValue.position_id}
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
                    <label className="col-form-label col-md-3 col-sm-3 d-flex align-items-center label-align">
                        Department
                        <span className="required">*</span>
                    </label>
                    <div className="col-md-8 col-sm-8">
                        <select
                            style={this.styleBorderError(
                                this.props.department_id
                            )}
                            className="form-control reset "
                            name="department_id"
                            data-validate-minmax="10,100"
                            value={
                                this.props.targetSelectTagValue.department_id
                            }
                            onChange={event => {
                                this.props.isChangeInput(event);
                            }}
                        >
                            <option value="">
                                Choose department...
                            </option>
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
                  <UpdateEmployeeFormButton cancelButton = {this.props.cancelButton}/>
            </div>
        );
    }
}

export default UpdateEmployeeForm;
