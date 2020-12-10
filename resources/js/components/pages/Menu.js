import React, { Component } from "react";

import {Link} from 'react-router-dom';
import { createPortal } from "react-dom";
class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="col-md-3 left_col">
            <div className="left_col scroll-view">
              <div className="navbar nav_title" style={{border: "0"}}>
                <a href="/" className="site_title"><i className="fa fa-paw"></i> <span>Gentelella Alela!</span></a>
              </div>
  
              <div className="clearfix"></div>
  
              {/* <!-- menu profile quick info --> */}
              <div className="profile clearfix">
                <div className="profile_pic">
                </div>
                <div className="profile_info">
                  <span>Welcome,</span>
                  <h2>John Doe</h2>
                </div>
              </div>
              {/* <!-- /menu profile quick info --> */}
  
              <br/>
  
              {/* <!-- sidebar menu --> */}
              <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
                <div className="menu_section active">
                  <h3>General</h3>
                  <ul className="nav side-menu" >
                    <li className=""><a><i className="fa fa-edit"></i> HOLIDAYS <span className="fa fa-chevron-down"></span></a>
                      <ul className="nav child_menu" style={{display:"none"}}>
                        <li><Link to={'/'}>Home</Link></li>
                        <li><Link to={'/list-holiday'}>List Holidays</Link></li>
                        <li><Link to={'/add-holiday'}>Create Holidays</Link></li>
                      </ul>
                    </li>
                  </ul>
                  <ul className="nav side-menu" >
                    <li className=""><a><i className="fa fa-edit"></i>EMPLOYEE HOLIDAYS <span className="fa fa-chevron-down"></span></a>
                      <ul className="nav child_menu" style={{display:"none"}}>
                        <li><Link to={'/'}>Home</Link></li>
                        <li><Link to={'/list-employee-holiday'}>List Employee Holidays</Link></li>
                        <li><Link to={'/add-employee-holiday'}>Create Employee Holiday</Link></li>
                      </ul>
                    </li>
                  </ul>
                </div>         
              </div>
              {/* <!-- /sidebar menu --> */}
  
              {/* <!-- /menu footer buttons --> */}
              <div className="sidebar-footer hidden-small">
                <a data-toggle="tooltip" data-placement="top" title="" data-original-title="Settings">
                  <span className="glyphicon glyphicon-cog" aria-hidden="true"></span>
                </a>
                <a data-toggle="tooltip" data-placement="top" title="" data-original-title="FullScreen">
                  <span className="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>
                </a>
                <a data-toggle="tooltip" data-placement="top" title="" data-original-title="Lock">
                  <span className="glyphicon glyphicon-eye-close" aria-hidden="true"></span>
                </a>
                <a data-toggle="tooltip" data-placement="top" title="" href="login.html" data-original-title="Logout">
                  <span className="glyphicon glyphicon-off" aria-hidden="true"></span>
                </a>
              </div>
              {/* <!-- /menu footer buttons --> */}
            </div>
          </div>
        );
    }
}

export default Menu;
