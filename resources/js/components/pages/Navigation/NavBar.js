import React, { Component } from "react";
import MultiLanguage from "./MultiLanguage";
import NavDropdown from "./NavDropdown";
import Presentation from "./Presentation";
class NavTop extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <nav className="nav navbar-nav">
                <ul className=" navbar-right">
                </ul>
            </nav>
        );
    }
}

export default NavTop;
