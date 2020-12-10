import React, { Component } from "react";
import ButtonFooterMenu from "./ButtonFooterMenu";
import ProfileMenu from "./ProfileMenu";
import SidebarMenu from "./SidebarMenu";
class MenuMain extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="col-md-3 left_col">
                <div className="left_col scroll-view">
                    <div className="navbar nav_title" style={{ border: "0" }}>
                        <a href="/" className="site_title">
                            <i className="fa fa-paw"></i> <span>HOME</span>
                        </a>
                    </div>
                    <div className="clearfix"></div>
                    <ProfileMenu />
                    <br />
                    <SidebarMenu />
                    <ButtonFooterMenu />
                </div>
            </div>
        );
    }
}

export default MenuMain;
