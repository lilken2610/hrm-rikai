import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
class NavDropDown extends Component {
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
            this.setState({
              user: res.data,
            });
          })
          .catch((error) => console.log(error));
    }

    render() {
        const checkLogin = this.state.user;
        return (
        <>
            {(() => {
                if (checkLogin != null) {
            <li
                className="nav-item dropdown open"
                style={{ paddingLeft: "15px" }}
            >
                <a
                    href="#"
                    className="user-profile dropdown-toggle"
                    aria-haspopup="true"
                    id="navbarDropdown"
                    data-toggle="dropdown"
                    aria-expanded="false"
                >
                    {checkLogin.fullname}
                </a>
                <div
                    className="dropdown-menu dropdown-usermenu pull-right"
                    aria-labelledby="navbarDropdown"
                >
                  <Link to={"/user/info"}> <a className="dropdown-item">
                                        Profile
                                    </a></Link>
                    <a className="dropdown-item" href="#">
                        <span className="badge bg-red pull-right">50%</span>
                        <span>Settings</span>
                    </a>
                    <a className="dropdown-item" href="#">
                        Help
                    </a>
                    <a className="dropdown-item" href="login.html">
                        <i className="fa fa-sign-out pull-right"></i>
                        Log Out
                    </a>
                </div>
            </li>
                    } else {
                        return (
                          <nav className="nav navbar-nav">
                            <ul className=" navbar-right">
                              <li className="nav-item dropdown open">
                              <Link to={"/login"}>  <a className="user-profile">Please Login</a></Link>
                              </li>
                            </ul>
                          </nav>
                        );
                      }
                })()}
                </>
        );
    }
}

export default NavDropDown;
