import React, { Component } from "react";
import axios from "axios";
import queryString from "query-string";
import { REQUEST_LIST } from "../../../../CONSTANT/Constants";
import { LIST_EMPLOYEE_URL } from "../../../../CONSTANT/Constants";
import { REQUEST_SEARCH } from "../../../../CONSTANT/Constants";
import ListSearchForm from "./ListSearchForm";
import ListTable from "./ListTable";
class ListEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            rows: ["25", "50", "100", "200", "250"],
            data: {},
            totalRecord: 0,
            current_page: 0,
            totalCurrent: 0,
            oldData: {
                record: 25,
                name: "",
                phone: "",
                email: "",
                age: ""
            },
            newData: {
                record: 25,
                name: "",
                phone: "",
                email: "",
                age: ""
            },
            quantityEmployee: false
        };
    }

    // Load list employee from server
    componentDidMount() {
        
        axios({
            url: REQUEST_LIST
        })
            .then(res => {
                this.setState({
                    employees: res.data.data,
                    data: res.data,
                    totalRecord: res.data.total,
                    totalCurrent: res.data.to,
                    current_page: res.data.current_page
                });
            })
            .catch(err => console.log(err));
    }

    // Set query string parameter
    setQueryParameter = data => {
        return this.props.history.push({
            pathname: LIST_EMPLOYEE_URL,
            search:
                "?record=" +
                data.record +
                "&name=" +
                data.name +
                "&phone=" +
                data.phone +
                "&email=" +
                data.email +
                "&age=" +
                data.age
        });
    };

    // Get query string parameter
    getQueryParameter = () => {
        const query = queryString.parse(this.props.history.location.search);
        const record = query.record;
        const name = query.name;
        const phone = query.phone;
        const email = query.email;
        const age = query.age;
        const object = {
            record: record,
            name: name,
            phone: phone,
            email: email,
            age: age
        };
        return object;
    };

    // Set new data for search
    setValueInput = event => {
        const { newData } = this.state;
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            newData: { ...newData, [name]: value }
        });
    };

    // Set parameter into request api
    setRequestParameter = object => {
        const params = {
            record: object.record,
            name: object.name,
            phone: object.phone,
            email: object.email,
            age: object.age
        };
        return params;
    };

    // Search common
    handleSearch = currentData => {
        this.setQueryParameter(currentData);
        const object = this.getQueryParameter();
        const params = this.setRequestParameter(object);
        axios({
            url: REQUEST_SEARCH,
            params
        })
            .then(res => {
                this.setState({
                    employees: res.data.data,
                    data: res.data,
                    oldData: currentData, // keep data searched
                    totalRecord: res.data.total,
                    totalCurrent: res.data.to,
                    current_page: res.data.current_page,
                    quantityEmployee: true
                });
            })
            .catch(err => console.log(err));
    };

    // Search list employee
    searchListEmployee = event => {
        const { newData } = this.state;
        event.preventDefault();
        this.handleSearch(newData);
        // Set select row equal 25
        const record = this.getQueryParameter().record;
        this.child.heading.value = record;
    };

    // Search list employee among rows
    searchRowListEmployee = event => {
        // Get current row
        const { oldData } = this.state;
        const name = event.target.name;
        const value = event.target.value;
        const currentInputData = { ...oldData, [name]: value };
        // Submit form
        event.preventDefault();
        this.handleSearch(currentInputData);
    };

    forceUpdate() {
        axios({
            url: REQUEST_LIST
        })
            .then(res => {
                this.setState({
                    employees: res.data.data,
                    data: res.data,
                    newData: {
                        record: 25,
                        name: "",
                        phone: "",
                        email: "",
                        age: ""
                    },
                    oldData: {
                        record: 25,
                        name: "",
                        phone: "",
                        email: "",
                        age: ""
                    },
                    totalRecord: res.data.total,
                    totalCurrent: res.data.to,
                    current_page: res.data.current_page,
                    quantityEmployee: false
                });
            })
            .catch(err => console.log(err));
    }
    // Handle refresh page
    resetListTableComponent = () => {
        this.props.history.push({
            pathname: LIST_EMPLOYEE_URL,
            search: ""
        });
        this.forceUpdate();
    };
    // Handle pagination
    getData = data => {
        const { oldData } = this.state;
        axios({
            url: REQUEST_SEARCH,
            params: {
                record: oldData.record,
                name: oldData.name,
                phone: oldData.phone,
                email: oldData.email,
                age: oldData.age,
                page: data.page
            }
        })
            .then(res => {
                this.setState({
                    employees: res.data.data,
                    data: res.data,
                    newData: {
                        record: 25,
                        name: "",
                        phone: "",
                        email: "",
                        age: ""
                    },
                    totalRecord: res.data.total,
                    totalCurrent: res.data.to,
                    current_page: res.data.current_page
                });
            })

            .catch(err => console.log(err));
    };
    render() {
        return (
            <div
                className="right_col"
                role="main"
                style={{ minHeight: "1200px" }}
            >
                <div className="content">
                    <ListSearchForm
                        searchListEmployee={this.searchListEmployee}
                        searchRowListEmployee={this.searchRowListEmployee}
                        resetListTableComponent={this.resetListTableComponent}
                        setValueInput={this.setValueInput}
                        quantityEmployee={this.state.quantityEmployee}
                        totalRecord={this.state.totalRecord}
                        rows={this.state.rows}
                        ref={(node) => { this.child = node; }} 
                    />
                    <ListTable
                        data={this.state.data}
                        getData={this.getData}
                        current_page={this.state.current_page}
                        employees={this.state.employees}
                        oldData={this.state.oldData}
                        totalCurrent={this.state.totalCurrent}
                    />
                </div>
            </div>
        );
    }
}

export default ListEmployee;
