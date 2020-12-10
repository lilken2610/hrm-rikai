import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
class SidebarMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
          user: [],
        };
      }

      componentDidMount() {
        axios.defaults.headers.common["Authorization"] = localStorage.getItem(
          "Authorization"
        );
        axios
          .get("http://127.0.0.1:8000/api/auth/user")
            .then((res) => {
              console.log(res.data.id)
            this.setState({
              user: res.data
            });
          })
          .catch((error) => console.log(error));
      }

    render() {
        const checkLogin = this.state.user;
        console.log(checkLogin)
        return (
            <div
                id="sidebar-menu"
                className="main_menu_side hidden-print main_menu"
            >
                <div className="menu_section active">
                    <h3>General</h3>
                    {(() => {
                        if (checkLogin.id != null) {
                            return (
                            <ul className="nav side-menu">
                                <li className="">
                                    <a>
                                        <i className="fa fa-edit"></i> EMPLOYEE
                                <span className="fa fa-chevron-down"></span>
                                    </a>
                                    <ul
                                        className="nav child_menu"
                                        style={{ display: "none" }}
                                    >
                                        <li>
                                            <Link to={"/list-employee"}>
                                                List Employee
                                    </Link>
                                        </li>
                                        <li>
                                            <Link to={"/add-employee"}>
                                                Create Employee
                                    </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="">
                                    <a>
                                        <i className="fa fa-user"></i> Users
                                <span className="fa fa-chevron-down"></span>
                                    </a>
                                    <ul
                                        className="nav child_menu"
                                        style={{ display: "none" }}
                                    >
                                        <li>
                                            <Link to={"/users"}>
                                                List Users
                                    </Link>
                                        </li>
                                        <li>
                                            <Link to={"/users/create"}>
                                                Create User
                                    </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="">
                                    <a>
                                        <i className="fa fa-building-o"></i> Companies
                                <span className="fa fa-chevron-down"></span>
                                    </a>
                                    <ul
                                        className="nav child_menu"
                                        style={{ display: "none" }}
                                    >
                                        <li>
                                            <Link to={"/companies"}>
                                                List Companies
                                    </Link>
                                        </li>
                                        <li>
                                            <Link to={"/create-companies"}>
                                                Create Company
                                    </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="">
                                    <a>
                                        <i className="fa fa-calendar"></i> WORKING TIME
                                <span className="fa fa-chevron-down"></span>
                                    </a>
                                    <ul
                                        className="nav child_menu"
                                        style={{ display: "none" }}
                                    >
                                        <li>
                                            <Link to={"/workingtimes"}>
                                                List Working Time
                                    </Link>
                                        </li>
                                        <li>
                                            <Link to={"/add-time"}>
                                                Create Working Time
                                    </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="">
                                    <a>
                                        <i className="fa fa-briefcase"></i> Holly day
                                <span className="fa fa-chevron-down"></span>
                                    </a>
                                    <ul
                                        className="nav child_menu"
                                        style={{ display: "none" }}
                                    >
                                        <li>
                                            <Link to={"/list-holiday"}>
                                                List Holiday
                                    </Link>
                                        </li>
                                        <li>
                                            <Link to={"/add-holiday"}>
                                                Create Holiday
                                    </Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>)
                       }
                    })()}
                </div>
            </div>
        );
    }
}

export default SidebarMenu;
