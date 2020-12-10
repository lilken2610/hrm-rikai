import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { REQUEST_DETAIL } from "../../../../CONSTANT/Constants";
import { REQUEST_UPDATE } from "../../../../CONSTANT/Constants";
import UpdateEmployeeForm from './UpdateEmployeeForm';
import UpdateEmployeeValidateServer from './UpdateEmployeeValidateServer';
import UpdateEmployeeTitlePage from './UpdateEmployeeTitlePage';
import UpdateEmployeeFormImage from './UpdateEmployeeFormImage';
class UpdateEmployeeMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listPosition: [],
            listDepartment: [],
            error_server: {},
            error_client: {},
            imagePreviewUrl: '',
            newData: {
                image: '',
                name: "",
                email: "",
                phone: "",
                gender: "",
                address: "",
                identification_card: "",
                day_of_birth: "",
                position_id: "",
                department_id: ""
            },
            fields: {
                image: "",
                name: "",
                email: "",
                phone: "",
                address: "",
                identification_card: "",
                day_of_birth: ""
            },
            image: true,
            name: true,
            email: true,
            phone: true,
            gender: true,
            address: true,
            identification_card: true,
            day_of_birth: true,
            position_id: true,
            department_id: true,
            disable_message: "disable_message",
            enable_message: "enable_message",
            disable_border: "disable_border",
            enable_border: "enable_border",
            enable_server: "enable_server",
            disable_server: "disable_server",
            message_error_server: true,
            // Keep target value of employee
            targetSelectTagValue: {
                position_id: "",
                department_id: "",
                gender: ""
            },
            nameEmployee: ""
        };
    }

    // Load data of employee
    componentDidMount() {
        axios({
            url: REQUEST_DETAIL + "/" + this.props.match.params.id + "/edit"
        })
            .then(res => {
                this.setState({
                    listDepartment: res.data.departments,
                    listPosition: res.data.positions,
                    fields: {
                        image: res.data.employeeInformation.image,
                        name: res.data.employeeInformation.name,
                        email: res.data.employeeInformation.email,
                        phone: res.data.employeeInformation.phone,
                        address: res.data.employeeInformation.address,
                        identification_card: res.data.employeeInformation.identification_card,
                        day_of_birth: res.data.employeeInformation.day_of_birth
                    },
                    newData: res.data.employeeInformation,
                    targetSelectTagValue: {
                        position_id: res.data.positionId,
                        department_id: res.data.departmentId,
                        gender: res.data.employeeInformation.gender
                    },
                    nameEmployee: res.data.employeeInformation.name
                });
            })
            .catch(err => console.log(err));
    }

    // Validation form
    handleValidation() {
        const {fields,targetSelectTagValue} = this.state;
        const error_client = {};
        var formIsValid = true;

        // Image
        if (!fields["image"]) {
            formIsValid = false;
            error_client["image"] = "*Please put something here";
        }

        // Name
        if (fields["name"] === "") {
            formIsValid = false;
            error_client["name"] = "*Please put something here";
        }

        // Email
        if (fields["email"] === "") {
            formIsValid = false;
            error_client["email"] = "*Please put something here";
        }

        // Day of birth
        if (!fields["day_of_birth"]) {
            formIsValid = false;
            error_client["day_of_birth"] = "*Please put something here";
        }

        // Phone
        if (!fields["phone"]) {
            formIsValid = false;
            error_client["phone"] = "*Please put something here";
        }

        // Address
        if (!fields["address"]) {
            formIsValid = false;
            error_client["address"] = "*Please put something here";
        }

        // Gender
        if (targetSelectTagValue["gender"] === '') {
            formIsValid = false;
            error_client["gender"] = "*Please put something here";
        }

        // Identification Card
        if (!fields["identification_card"]) {
            formIsValid = false;
            error_client["identification_card"] = "*Please put something here";
        }

        // Position
        if (targetSelectTagValue["position_id"] === '') {
            formIsValid = false;
            error_client["position_id"] = "*Please put something here";
        }

        // Department
        if (targetSelectTagValue["department_id"] === '') {
            formIsValid = false;
            error_client["department_id"] = "*Please put something here";
        }
        this.setState({ error_client: error_client });
        return formIsValid;
    }

    // Handle set value from tag input to state
    isChangeInput = event => {
        const { newData, targetSelectTagValue, fields } = this.state;
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            newData: { ...newData, [name]: value },
            targetSelectTagValue: {
                ...targetSelectTagValue,
                [name]: value
            },
            fields: { ...fields, [name]: value }
        });
        // Validate form

        // Multiple field
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
                this.state.error_client["email"] = "Email is not valid";
            }
        }
    };

    // Handle create new employee
    handleSubmit = event => {
        event.preventDefault();
        if (this.handleValidation() === true) {
            const { newData,targetSelectTagValue } = this.state;
            const fd = new FormData();
            fd.append("image_current", newData.image);
            fd.append("image", newData.image);
            fd.append("name", newData.name);
            fd.append("email", newData.email);
            fd.append("phone", newData.phone);
            fd.append("gender", newData.gender);
            fd.append("address", newData.address);
            fd.append("identification_card", newData.identification_card);
            fd.append("day_of_birth", newData.day_of_birth);
            fd.append("position_id", targetSelectTagValue.position_id);
            fd.append("department_id", targetSelectTagValue.department_id);
            fd.append("_method", "put");
    
            axios({
                method: "POST",
                url: REQUEST_UPDATE + "/" + newData.id,
                data: fd,
                headers: { "Content-Type": "multipart/form-data" }
            })
                .then(res => {
                    this.setState({
                        message_error_server: true
                    });
                    Swal.fire({
                        icon: "success",
                        text: "Updated employee successfully"
                    });
                    this.props.history.push("/detail-employee/" + newData.id);
                })
                .catch(err => {
                    this.setState({
                        error_server: err.response.data.errors,
                        message_error_server: false
                    });
                });
        }
        else{
            Object.keys(this.state.fields)
            .filter(item => !this.state.fields[item])
            .map(item => {
                this.setState({
                    [item]: false
                });
            });   
        }
       
    };

    // Handle input file Change
    isChangeInputFile = event => {
        const reader = new FileReader();
        const { newData,fields } = this.state;
        const name = event.target.name;
        const value = event.target.value;
        const file = event.target.files[0];
        const data = { ...newData, [name]: file };
        reader.onloadend = () => {
            this.setState({
                newData: data,
                fields: {...fields, [name]:value},
                imagePreviewUrl: reader.result
            });
        this.child.heading.src = reader.result
        }
        reader.readAsDataURL(file)
        
        if (data.image.name.trim() !== "") {
            this.setState({
                [name]: true
            });
        }
    };

    // Handle cancel button
    cancelButton = () => {
        Swal.fire({
            text: "Are you sure? You will lose everything!!!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(result => {
            if (result.isConfirmed) {
                this.props.history.push(
                    "/detail-employee/" + this.state.newData.id
                );
            }
        });
    };

    render() {
        return (
            <form
                className="right_col"
                role="main"
                style={{ height: 770 }}
                onSubmit={event => {
                    this.handleSubmit(event);
                }}
            >
                <div className="content">
                    <div className="page-title">
                        <UpdateEmployeeTitlePage 
                        newData = {this.state.newData}
                        nameEmployee = {this.state.nameEmployee}
                        />
                        <div className="clearfix"></div>
                        <div className="row mt-2">
                            <div className="col-md-12 col-sm-12">
                                <div className="x_panel">
                                    <div className="x_content">
                                    <UpdateEmployeeValidateServer
                                        message_error_server={
                                            this.state.message_error_server
                                        }
                                        disable_server={
                                            this.state.disable_server
                                        }
                                        enable_server={this.state.enable_server}
                                        error_server={this.state.error_server}
                                    />
                                    <UpdateEmployeeForm
                                    cancelButton = {this.cancelButton}
                                    isChangeInput = {this.isChangeInput}
                                    fields = {this.state.fields}
                                    error_client = {this.state.error_client}
                                    targetSelectTagValue ={this.state.targetSelectTagValue}
                                    listDepartment = {this.state.listDepartment}
                                    listPosition = {this.state.listPosition}                                 
                                    image={this.state.image}
                                    name={this.state.name}
                                    email={this.state.email}
                                    phone={this.state.phone}
                                    gender={this.state.gender}
                                    address={this.state.address}
                                    identification_card={
                                        this.state.identification_card
                                    }
                                    day_of_birth={this.state.day_of_birth}
                                    position_id={this.state.position_id}
                                    department_id={this.state.department_id}
                                    message_error_server={this.state.image}
                                    listDepartment={
                                        this.state.listDepartment
                                    }
                                    
                                    />
                                     <UpdateEmployeeFormImage 
                                       fields = {this.state.fields}
                                       isChangeInputFile = {this.isChangeInputFile}
                                       imagePreviewUrl = {this.state.imagePreviewUrl}
                                       ref={(node) => { this.child = node; }}  
                                     />   
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default UpdateEmployeeMain;
