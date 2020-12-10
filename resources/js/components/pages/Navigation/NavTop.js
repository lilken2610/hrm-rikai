import React, { Component } from "react";
import NavBar from "./NavBar";
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
                    <NavBar />
                </div>       
            </div>
        );
    }
}

export default Header;
