import React, { Component } from "react";
import DetailEmployeeFormButton from "./DetailEmployeeFormButton";
import DetailEmployeeFormImage from "./DetailEmployeeFormImage";
class DetailEmployeeForm extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="row mt-2">
                <div className="col-md-12 col-sm-12">
                    <div className="x_panel">
                        <div className="x_content">
                            <div className="col-sm-9 col-md-9">
                                <div className="field item form-group  ">
                                    <label className="col-form-label col-md-3 col-sm-3  label-align">
                                        Name
                                        <span className="required">*</span>
                                    </label>
                                    <div className="col-md-8 col-sm-8">
                                        <p
                                            className="form-control bottom"
                                            name="name"
                                            data-validate-minmax="10,100"
                                        >
                                            {this.props.employee.name}
                                        </p>
                                    </div>
                                </div>
                                <div className="field item form-group  ">
                                    <label className="col-form-label col-md-3 col-sm-3  label-align">
                                        Email
                                        <span className="required">*</span>
                                    </label>
                                    <div className="col-md-8 col-sm-8">
                                        <p
                                            className="form-control bottom"
                                            name="email"
                                            data-validate-minmax="10,100"
                                        >
                                            {this.props.employee.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="field item form-group  ">
                                    <label className="col-form-label col-md-3 col-sm-3  label-align">
                                        Day of birth
                                        <span className="required">*</span>
                                    </label>
                                    <div className="col-md-8 col-sm-8">
                                        <p
                                            className="form-control bottom"
                                            name="day_of_birth"
                                            data-validate-minmax="10,100"
                                        >
                                            {this.props.employee.day_of_birth}
                                        </p>
                                    </div>
                                </div>
                                <div className="field item form-group  ">
                                    <label className="col-form-label col-md-3 col-sm-3  label-align">
                                        Address
                                        <span className="required">*</span>
                                    </label>
                                    <div className="col-md-8 col-sm-8">
                                        <p
                                            className="form-control bottom"
                                            name="address"
                                            data-validate-minmax="10,100"
                                        >
                                            {this.props.employee.address}
                                        </p>
                                    </div>
                                </div>

                                <div className="field item form-group  ">
                                    <label className="col-form-label col-md-3 col-sm-3  label-align">
                                        Gender
                                        <span className="required">*</span>
                                    </label>
                                    <div className="col-md-8 col-sm-8">
                                        <p
                                            className="form-control bottom"
                                            data-validate-minmax="10,100"
                                        >
                                            {this.props.getEmployeeGender()}
                                        </p>
                                    </div>
                                </div>
                                <div className="field item form-group">
                                    <label className="col-form-label col-md-3 col-sm-3  label-align">
                                        Identification Card
                                        <span className="required">*</span>
                                    </label>
                                    <div className="col-md-8 col-sm-8">
                                        <p
                                            className="form-control bottom"
                                            name="identification_card"
                                            data-validate-minmax="10,100"
                                        >
                                            {
                                                this.props.employee
                                                    .identification_card
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="field item form-group  ">
                                    <label className="col-form-label col-md-3 col-sm-3  label-align">
                                        Phone
                                        <span className="required">*</span>
                                    </label>
                                    <div className="col-md-8 col-sm-8">
                                        <p
                                            className="form-control bottom"
                                            name="phone"
                                            data-validate-minmax="10,100"
                                        >
                                            {this.props.employee.phone}
                                        </p>
                                    </div>
                                </div>
                                <div className="field item form-group  ">
                                    <label className="col-form-label col-md-3 col-sm-3  label-align">
                                        Position
                                        <span className="required">*</span>
                                    </label>
                                    <div className="col-md-8 col-sm-8">
                                        <p
                                            className="form-control bottom"
                                            name="phone"
                                            data-validate-minmax="10,100"
                                        >
                                            {this.props.positionName}
                                        </p>
                                    </div>
                                </div>
                                <div className="field item form-group  ">
                                    <label className="col-form-label col-md-3 col-sm-3  label-align">
                                        Department
                                        <span className="required">*</span>
                                    </label>
                                    <div className="col-md-8 col-sm-8">
                                        <p
                                            className="form-control bottom"
                                            name="phone"
                                            data-validate-minmax="10,100"
                                        >
                                            {this.props.departmentName}
                                        </p>
                                    </div>
                                </div>
                                <DetailEmployeeFormButton
                                    employee={this.props.employee}
                                    deleteEmployee={this.props.deleteEmployee}
                                />
                            </div>
                            <DetailEmployeeFormImage
                                employee={this.props.employee}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DetailEmployeeForm;
