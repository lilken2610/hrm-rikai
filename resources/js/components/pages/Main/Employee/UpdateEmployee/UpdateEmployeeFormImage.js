import React, { Component } from "react";
import {IMAGE_URL} from "../../../../CONSTANT/Constants";
class UpdateEmployeeFormImage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="col-sm-3 col-md-3 image shadow-sm bg-light rounded">
                <img
                    ref={(node) => { this.heading = node; }}
                    className="image row ml-0"
                    src={IMAGE_URL + '/' + this.props.fields.image}
                    alt="Content image"
                />
                <div className="field item form-group mt-3 d-flex justify-content-start " />
                <input
                    onChange={event => this.props.isChangeInputFile(event)}
                    type="file"
                    ref="file"
                    className="form-control p-0 hidden"
                    name="image"
                />

                <input
                    type="text"
                    hidden
                    name="image_current"
                    value={this.props.fields.image}
                />
            </div>
        );
    }
}

export default UpdateEmployeeFormImage;
