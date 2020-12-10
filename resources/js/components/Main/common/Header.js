import React, { useState } from "react";
import { Link } from "react-router-dom";
import Menu from './Menu';
import axios from "axios";

class Header extends React.Component {
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

  tabRow() {            
    return this.state.user.map(function (company, index) {
        return (
            <Menu
                company={company}
                key={index}
                index={index + 1}
            />
        );
    });
}

  render() {
    const checkLogin = this.state.user;
    return (
      <div className="top_nav">
        <div className="nav_menu">
          <div className="nav toggle">
            <a id="menu_toggle">
              <i className="fa fa-bars" />
            </a>
          </div>

          {(() => {
            if (checkLogin.fullname != null) {
              return (
                <nav className="nav navbar-nav">
                  <ul className=" navbar-right">
                    <li
                      className="nav-item dropdown open"
                      style={{ paddingLeft: "15px" }}
                    >
                      <a
                        className="user-profile dropdown-toggle"
                        aria-haspopup="true"
                        id="navbarDropdown"
                        data-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Profile
                      </a>
                      <div
                        className="dropdown-menu dropdown-usermenu pull-right"
                        aria-labelledby="navbarDropdown"
                      >
                    <Link to={"/user/info"}> <a className="dropdown-item">
                          Profile
                        </a></Link>   
                        <a className="dropdown-item">
                          <span className="badge bg-red pull-right">50%</span>
                          <span>Settings</span>
                        </a>
                        <Link to={"/logout"}>
                          <a className="dropdown-item">Help</a>{" "}
                          <a className="dropdown-item">
                            <i className="fa fa-sign-out pull-right" />
                            Log Out
                          </a>
                        </Link>
                      </div>
                    </li>
                  </ul>
                </nav>
              );
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
        </div>
      </div>
    );
  }
}

export default Header;
