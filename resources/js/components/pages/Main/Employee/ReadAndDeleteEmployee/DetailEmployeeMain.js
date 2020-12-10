import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { REQUEST_DETAIL } from "../../../../CONSTANT/Constants";
import { REQUEST_DELETE } from "../../../../CONSTANT/Constants";
import DetailUrlTitle from './DetailUrlTitle';
import DetailEmployeeForm from './DetailEmployeeForm';
class DetailEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departmentName: "",
            positionName: "",
            employee: ""
        };
    }

    // Load data of employee
    componentDidMount() {
        axios({
            url: REQUEST_DETAIL + "/" + this.props.match.params.id
        })
            .then(res => {
                this.setState({
                    employee: res.data.employeeInformation,
                    departmentName: res.data.departmentName,
                    positionName: res.data.positionName
                });
            })
            .catch(err => console.log(err));
    }

    // Get gender of employee
    getEmployeeGender = () => {
        const { employee } = this.state;
        return employee.gender === 0 ? "Female" : "Male";
    };

    // Delete employee
    deleteEmployee = () => {
        Swal.fire({
            text: "Are you sure? You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(result => {
            if (result.isConfirmed) {
                axios({
                    method: "delete",
                    url: REQUEST_DELETE + "/" + this.props.match.params.id
                })
                    .then(res => {
                        Swal.fire({
                            icon: "success",
                            text: "Your file has been deleted."
                        });
                        this.props.history.push("/list-employee");
                    })
                    .catch(err => console.log(err));
            }
        });
    };

    render() {
        return (
            <div className="right_col" role="main" style={{ minHeight: 895 }}>
                <div className="content">
                    <DetailUrlTitle employee = {this.state.employee}/>
                    <div className="clearfix"></div>
                    <DetailEmployeeForm 
                    employee = {this.state.employee}
                    deleteEmployee = {this.deleteEmployee}
                    departmentName = {this.state.departmentName}
                    positionName = {this.state.positionName}
                    deleteEmployee = {this.deleteEmployee}
                    getEmployeeGender = {this.getEmployeeGender}
                    />
                </div>
            </div>
        );
    }
}

export default DetailEmployee;
