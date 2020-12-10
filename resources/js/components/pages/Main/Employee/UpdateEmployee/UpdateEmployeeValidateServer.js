import React, { Component } from "react";
import ServerErrorMessage from "../../Common/ServerErrorMessage";

class UpdateEmployeeValidateServer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div
                className={
                    this.props.message_error_server
                        ? this.props.disable_server
                        : this.props.enable_server
                }
            >
                <ul className="ul-error">
                    {Object.keys(this.props.error_server).map(
                        (error, index) => (
                            <ServerErrorMessage
                                message={this.props.error_server[error][0]}
                                key={index}
                            />
                        )
                    )}
                </ul>
            </div>
        );
    }
}

export default UpdateEmployeeValidateServer;
