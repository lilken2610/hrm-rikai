import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { REQUEST_STORE } from "../../../../CONSTANT/Constants";
import { REQUEST_ADD } from "../../../../CONSTANT/Constants";
import CreateEmployeeValidateServer from "./CreateEmployeeValidateServer";
import CreateEmployeeTitlePage from "./CreateEmployeeTitlePage";
import CreateEmployeeForm from "./CreateEmployeeForm";
class AddEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listPosition: [],
            listDepartment: [],
            error_server: {},
            error_client: {},
            newData: {
                image: "",
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
                gender: "",
                address: "",
                identification_card: "",
                day_of_birth: "",
                position_id: "",
                department_id: ""
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
            enable_server: "enable_server",
            disable_server: "disable_server",
            message_error_server: true
        };
    }

    // Validation form
    handleValidation() {
        const fields = this.state.fields;
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
        if (!fields["gender"]) {
            formIsValid = false;
            error_client["gender"] = "*Please put something here";
        }

        // Identification Card
        if (!fields["identification_card"]) {
            formIsValid = false;
            error_client["identification_card"] = "*Please put something here";
        }

        // Position
        if (!fields["position_id"]) {
            formIsValid = false;
            error_client["position_id"] = "*Please put something here";
        }

        // Department
        if (!fields["department_id"]) {
            formIsValid = false;
            error_client["department_id"] = "*Please put something here";
        }
        this.setState({ error_client: error_client });
        return formIsValid;
    }

    // Get list position and department
    componentDidMount() {
        axios({
            url: REQUEST_ADD
        })
            .then(res => {
                this.setState({
                    listDepartment: res.data.departments,
                    listPosition: res.data.positions
                });
            })
            .catch(err => console.log(err));
    }

    // Handle set value from tag input to state
    isChangeInput = event => {
        const { newData, fields } = this.state;
        const name = event.target.name;
        const value = event.target.value;
        const data = { ...newData, [name]: value };
        this.setState({
            newData: data,
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
                this.state.error_client["email"] = "*Email is not valid";
            }
        }
    };

    // Handle create new employee
    handleSubmit = event => {
        event.preventDefault();
        if (this.handleValidation() === true) {
            const { newData } = this.state;
            const fd = new FormData();
            fd.append("image", newData.image);
            fd.append("name", newData.name);
            fd.append("email", newData.email);
            fd.append("phone", newData.phone);
            fd.append("day_of_birth", newData.day_of_birth);
            fd.append("address", newData.address);
            fd.append("identification_card", newData.identification_card);
            fd.append("gender", newData.gender);
            fd.append("position_id", newData.position_id);
            fd.append("department_id", newData.department_id);
            const config = {
                headers: { "Content-Type": "multipart/form-data" }
            };
            axios
                .post(REQUEST_STORE, fd, config)
                .then(res => {
                    this.setState({
                        message_error_server: true
                    });
                    Swal.fire({
                        icon: "success",
                        text: "Created employee successfully"
                    });
                    this.props.history.push("list-employee");
                })
                .catch(err => {
                    this.setState({
                        error_server: err.response.data.errors,
                        message_error_server: false
                    });
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

    // Handle input file Change
    isChangeInputFile = event => {
        const { newData, fields } = this.state;
        const name = event.target.name;
        const value = event.target.value;
        const data = { ...newData, [name]: event.target.files[0] };
        fields[name] = value;
        this.setState({
            newData: data,
            fields
        });
        if (data.image.name.trim() !== "") {
            this.setState({
                [name]: true
            });
        }
    };
    // Handle button reset form
    handleReset = () => {
       this.child.heading.reset();
        // Set fields object
        this.setState({
            fields: {
                image: "",
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
            message_error_server: true,
            refButtonReset:{}
        });
    };

    // Get ref of button reset
    getRefsButtonReset = (ref) => {
        this.setState({
            refButtonReset: ref
        });
       // console.log(this.state.refButtonReset);
    }

    render() {
        return (
            <div className="right_col" role="main" style={{ minHeight: 705 }}>
                <div className="content">
                    <CreateEmployeeTitlePage />
                    <div className="clearfix"></div>
                    <div className="row mt-2">
                        <div className="col-md-12 col-sm-12">
                            <div className="x_panel">
                                <div className="x_content">
                                    <CreateEmployeeValidateServer
                                        message_error_server={
                                            this.state.message_error_server
                                        }
                                        disable_server={
                                            this.state.disable_server
                                        }
                                        enable_server={this.state.enable_server}
                                        error_server={this.state.error_server}
                                    />
                                    <CreateEmployeeForm
                                        handleSubmit={this.handleSubmit}
                                        handleReset={this.handleReset}
                                        isChangeInputFile={
                                            this.isChangeInputFile
                                        }
                                        isChangeInput={this.isChangeInput}
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
                                        listPosition={this.state.listPosition}
                                        error_client={this.state.error_client}
                                        // Get ref from child component
                                        ref={(node) => { this.child = node; }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddEmployee;
