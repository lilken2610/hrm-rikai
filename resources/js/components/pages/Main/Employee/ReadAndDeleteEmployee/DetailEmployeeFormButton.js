import React, { Component } from "react";
import { Link } from "react-router-dom";
class DetailEmployeeFormButton extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="ln_solid">
                <div className="form-group">
                    <div className="col-md-6 offset-md-3">
                        <Link
                            to={
                                "/detail-employee/" +
                                this.props.employee.id +
                                "/edit"
                            }
                            className="btn btn-success edit"
                        >
                            Edit
                        </Link>
                        <button
                            id='button'
                            type="button"
                            className="btn btn-danger delete"
                            onClick={event => this.props.deleteEmployee()}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default DetailEmployeeFormButton;
