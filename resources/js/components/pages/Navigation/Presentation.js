import React, {Component} from 'react';
class Presentation extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            
            <li
            role="presentation"
            className="nav-item dropdown open"
        >
            <a
                href="#"
                className="dropdown-toggle info-number"
                id="navbarDropdown1"
                data-toggle="dropdown"
                aria-expanded="false"
            >
                <i className="fa fa-envelope-o"></i>
                <span className="badge bg-green">6</span>
            </a>
            <ul
                className="dropdown-menu list-unstyled msg_list"
                role="menu"
                aria-labelledby="navbarDropdown1"
            >
                <li className="nav-item">
                    <a className="dropdown-item">
                        <span className="image">
                            <img
                                src="http://127.0.0.1:8000/assets/images/cropper.jpg"
                                alt="Profile Image"
                            />
                        </span>
                        <span>
                            <span>John Smith</span>
                            <span className="time">
                                3 mins ago
                            </span>
                        </span>
                        <span
                            className="message"
                            style={{display: "none"}}
                        >
                            Film festivals used to be
                            do-or-die moments for movie
                            makers. They were
                            wherehttp://127.0.0.1:8000/assets.
                        </span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="dropdown-item">
                        <span className="image">
                            <img
                                src="http://127.0.0.1:8000/assets/images/cropper.jpg"
                                alt="Profile Image"
                            />
                        </span>
                        <span>
                            <span>John Smith</span>
                            <span className="time">
                                3 mins ago
                            </span>
                        </span>
                        <span
                            className="message"
                            style={{display: "none"}}
                        >
                            Film festivals used to be
                            do-or-die moments for movie
                            makers. They were
                            wherehttp://127.0.0.1:8000/assets.
                        </span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="dropdown-item">
                        <span className="image">
                            <img
                                src="http://127.0.0.1:8000/assets/images/cropper.jpg"
                                alt="Profile Image"
                            />
                        </span>
                        <span>
                            <span>John Smith</span>
                            <span className="time">
                                3 mins ago
                            </span>
                        </span>
                        <span
                            className="message"
                            style={{display: "none"}}
                        >
                            Film festivals used to be
                            do-or-die moments for movie
                            makers. They were
                            wherehttp://127.0.0.1:8000/assets.
                        </span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="dropdown-item">
                        <span className="image">
                            <img
                                src="http://127.0.0.1:8000/assets/images/cropper.jpg"
                                alt="Profile Image"
                            />
                        </span>
                        <span>
                            <span>John Smith</span>
                            <span className="time">
                                3 mins ago
                            </span>
                        </span>
                        <span
                            className="message"
                            style={{display: "none"}}
                        >
                            Film festivals used to be
                            do-or-die moments for movie
                            makers. They were
                            wherehttp://127.0.0.1:8000/assets.
                        </span>
                    </a>
                </li>
                <li className="nav-item">
                    <div className="text-center">
                        <a className="dropdown-item">
                            <strong>See All Alerts</strong>
                            <i className="fa fa-angle-right"></i>
                        </a>
                    </div>
                </li>
            </ul>
        </li>
          );
    }
}
 
export default Presentation;