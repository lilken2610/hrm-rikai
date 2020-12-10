import React, {Component} from 'react';
class ButtonFooterMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="sidebar-footer hidden-small">
                <a
                    data-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-original-title="Settings"
                >
                    <span
                        className="glyphicon glyphicon-cog"
                        aria-hidden="true"
                    ></span>
                </a>
                <a
                    data-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-original-title="FullScreen"
                >
                    <span
                        className="glyphicon glyphicon-fullscreen"
                        aria-hidden="true"
                    ></span>
                </a>
                <a
                    data-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-original-title="Lock"
                >
                    <span
                        className="glyphicon glyphicon-eye-close"
                        aria-hidden="true"
                    ></span>
                </a>
                <a
                    data-toggle="tooltip"
                    data-placement="top"
                    title=""
                    href="login.html"
                    data-original-title="Logout"
                >
                    <span
                        className="glyphicon glyphicon-off"
                        aria-hidden="true"
                    ></span>
                </a>
            </div>
        );
    }
}

export default ButtonFooterMenu;
