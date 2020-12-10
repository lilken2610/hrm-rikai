import React, { Component } from "react";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="top_nav">
                <div className="nav_menu">
                    <div className="nav toggle">
                        <a id="menu_toggle">
                            <i className="fa fa-bars"></i>
                        </a>
                    </div>
                    <nav className="nav navbar-nav">
                        <ul className=" navbar-right">
                            <li
                                className="nav-item dropdown open"
                                style={{paddingLeft: "15px"}}
                            >
                                <a
                                    href="#"
                                    className="user-profile dropdown-toggle"
                                    aria-haspopup="true"
                                    id="navbarDropdown"
                                    data-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <img
                                        src="http://127.0.0.1:8000/images/girl.jpg"
                                        alt=""
                                    />
                                    John Doe
                                </a>
                                <div
                                    className="dropdown-menu dropdown-usermenu pull-right"
                                    aria-labelledby="navbarDropdown"
                                >
                                    <a
                                        className="dropdown-item"
                                        href="#"
                                    >
                                        {" "}
                                        Profile
                                    </a>
                                    <a
                                        className="dropdown-item"
                                        href="#"
                                    >
                                        <span className="badge bg-red pull-right">
                                            50%
                                        </span>
                                        <span>Settings</span>
                                    </a>
                                    <a
                                        className="dropdown-item"
                                        href="#"
                                    >
                                        Help
                                    </a>
                                    <a className="dropdown-item" href="login.html">
                                        <i className="fa fa-sign-out pull-right"></i>{" "}
                                        Log Out
                                    </a>
                                </div>
                            </li>
                            
                            <li className="language" >
                                <a href="http://127.0.0.1:8000/locale/en">
                                    <img
                                        src="http://127.0.0.1:8000/images/en.png"
                                        width="15"
                                        height="15"
                                    />
                                    <small>EN</small>
                                </a>
                            </li>
                            <li className="language">
                                <a href="http://127.0.0.1:8000/locale/jp">
                                    <img
                                        src="http://127.0.0.1:8000/images/jp.png"
                                        width="15"
                                        height="15"
                                    />
                                    <small>JP</small>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}

export default Header;
