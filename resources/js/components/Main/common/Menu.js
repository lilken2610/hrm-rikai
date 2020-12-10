import React from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

class Menu extends React.Component {
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
            <div className="col-md-3 left_col">
                <div className="left_col scroll-view">
                    <div className="navbar nav_title" style={{ border: 0 }}>
                    <Link to={'/'}>
                        <a className="site_title">
                            <i className="fa fa-paw" />
                            <span>Gentelella Alela!</span>
                            </a>
                            </Link>
                    </div>
                    <div className="clearfix" />

                    <br />
                    {/* sidebar menu */}
                    {(() => {
                        if (checkLogin.fullname != null) {
                            return(

                                <div
                                id="sidebar-menu"
                                className="main_menu_side hidden-print main_menu"
                            >
                                <div className="menu_section">
                                    <ul className="nav side-menu">
                                        <li>
                                            <a>
                                            <Link to={'/'}>   <i className="fa fa-home" /> HomePage</Link>
                                            </a>
                                        </li>
                                        <li>
                                        <a>
                                            <Link to={'/companies'}>   <i className="fa fa-building" />Companies</Link>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
)
                         }
                    })()}

                    <div className="sidebar-footer hidden-small">
                        <a
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Settings"
                        >
                            <span
                                className="glyphicon glyphicon-cog"
                                aria-hidden="true"
                            />
                        </a>
                        <a
                            data-toggle="tooltip"
                            data-placement="top"
                            title="FullScreen"
                        >
                            <span
                                className="glyphicon glyphicon-fullscreen"
                                aria-hidden="true"
                            />
                        </a>
                        <a
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Lock"
                        >
                            <span
                                className="glyphicon glyphicon-eye-close"
                                aria-hidden="true"
                            />
                        </a>
                        <a
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Logout"
                            href="/logout"
                        >
                            <span
                                className="glyphicon glyphicon-off"
                                aria-hidden="true"
                            />
                        </a>
                    </div>
                    {/* /menu footer buttons */}
                </div>
            </div>
        );
    }
}

export default Menu;
