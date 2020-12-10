import React, { Component } from "react";
import axios from "axios";
import TableRowWorkingTime from "./TableRowWorkingTime";
import { Pagination } from "react-laravel-paginex";
import { data } from "jquery";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import "../workingtimes.css";
import { styleWorking } from "../../../../CSS/styleworking";
import SearchForm from "./SearchForm";
import { REQUEST_LIST_TIME,REQUEST_SEARCH_TIME,REQUEST_DELETE_TIME } from "../../../../CONSTANT/Constants";

class ListTime extends Component {
    constructor(props) {
        super(props);
        this.name = React.createRef();
        this.id = React.createRef();
        this.startday = React.createRef();
        this.endday = React.createRef();
        this.state = {
            workingtimes: [],
            rows: ["25", "50", "100", "200"],
            currentPage: 1,
            data: {},
            totalRecord: 0,
            current_page: 0,
            totalCurrent: 0,
            oldData: {
                id: "",
                name: "",
                startday: "",
                endday: "",
                record: 25
            },
            newData: {
                id: "",
                name: "",
                startday: "",
                endday: "",
                record: 25
            }
        };
    }
    componentDidMount() {
        console.log(this.child)
        axios({
            url: REQUEST_LIST_TIME
        })
            .then(res => {
                this.setState({
                    workingtimes: res.data.data,
                    data: res.data,
                    totalRecord: res.data.total,
                    totalCurrent: res.data.to,
                    current_page: res.data.current_page
                });
                console.log(res.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    forceUpdate() {
        axios({
            url: REQUEST_LIST_TIME
        })
            .then(res => {
                this.setState({
                    workingtimes: res.data.data,
                    data: res.data
                });
                console.log(res.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    setValueInput = event => {
        const { newData} = this.state;
        const name = event.target.name;
        const value = event.target.value;
        const currentInputData = { ...newData, [name]: value };
        this.setState({
            newData: currentInputData
        });
    };
    searchListTime = event => {
        event.preventDefault();
        const { newData } = this.state;
        axios
            .get(
                REQUEST_SEARCH_TIME +
                "?record=" +
                newData.record +
                "&id=" +
                newData.id +
                "&name=" +
                newData.name +
                "&startday=" +
                newData.startday +
                "&endday=" +
                newData.endday +
                "&page=" +
                data.page
            )
            .then(res => {
                this.setState({
                    workingtimes: res.data.data,
                    oldData: newData,
                    data: res.data,
                    totalRecord: res.data.total,
                    totalCurrent: res.data.to,
                    current_page: res.data.current_page
                });
            });
    };
    searchRowListTime = event => {
        const { oldData } = this.state;
        const name = event.target.name;
        const value = event.target.value;
        const currentInputData = { ...oldData, [name]: value };
        event.preventDefault();
        axios
            .get(
                REQUEST_SEARCH_TIME +
                "?record=" +
                currentInputData.record +
                "&id=" +
                currentInputData.id +
                "&name=" +
                currentInputData.name +
                "&endday=" +
                currentInputData.endday +
                "&page=" +
                data.page
            )
            .then(res => {
                this.setState({
                    workingtimes: res.data.data,
                    data: res.data,
                    oldData: currentInputData
                });
                console.log(res.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    getData = data => {
        const { oldData } = this.state;
        axios
            .get(
                REQUEST_SEARCH_TIME +
                "?record=" +
                oldData.record +
                "&id=" +
                oldData.id +
                "&name=" +
                oldData.name +
                "&startday=" +
                oldData.startday +
                "&endday=" +
                oldData.endday +
                "&page=" +
                data.page
            )
            .then(res => {
                this.setState({
                    workingtimes: res.data.data,
                    data: res.data,
                    totalRecord: res.data.total,
                    totalCurrent: res.data.to,
                    current_page: res.data.current_page
                });
            });
    };
    deleteTime = id => {
        Swal.fire({
            text: "You want delete this time?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(result => {
            if (result.isConfirmed) {
                axios
                    .delete(REQUEST_DELETE_TIME + id)
                    .then(res => {
                        Swal.fire({
                            text: "Your time has been deleted!",
                            icon: "success"
                        });
                        this.forceUpdate();
                    })
                    .catch(err => console.log(err));
            }
        });
    };
    clearSearchInput = () => {
        this.child.id.heading.value = '';
        this.child.name.heading.value = '';
        this.child.startday.heading.value = '';
        this.child.endday.heading.value = '';
        this.props.history.push('/workingtimes');
        this.forceUpdate();
        this.setState({
            oldData: {
                id: "",
                name: "",
                startday: "",
                endday: "",
                record: 25
            },
            newData: {
                id: "",
                name: "",
                startday: "",
                endday: "",
                record: 25
            }
        })
    };
    render() {
        return (
            <div className="right_col" role="main" style={styleWorking.page}>
                <SearchForm
                    ref={(node) => { this.child = node; }}
                    rows={this.state.rows}
                    setValueInput={this.setValueInput}
                    searchListTime={this.searchListTime}
                    searchRowListTime={this.searchRowListTime}
                    clearSearchInput={this.clearSearchInput}
                    ref={(node) => { this.child = node; }}   
                />
                <div className="row">
                        <div className="col-md-12">
                            <div className="x_panel">
                                <div className="x_content">
                                    <section className="content invoice">
                                        <div className="row">
                    <div id="table" style={{width: '100$'}}>

                                            <table
                                                className="table table-striped"
                                                style={styleWorking.table}
                        >
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Check-in</th>
                                    <th scope="col">Check-out</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.workingtimes.map(
                                        (workingtime, index) => (
                                            <TableRowWorkingTime
                                                workingtime={workingtime}
                                                key={index}
                                                index={
                                                    this.state.current_page === 1
                                                        ? index + 1
                                                        : this.state.totalCurrent -
                                                        this.state.oldData
                                                            .record +
                                                        index +
                                                        1
                                                }
                                                deleteTime={this.deleteTime}
                                            />
                                        )
                                    )}
                            </tbody>
                        </table>
                        <Pagination
                            changePage={this.getData}
                            data={this.state.data}
                        />
                    </div>
                    </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}
export default ListTime;