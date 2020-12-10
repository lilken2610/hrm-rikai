import React,{Component} from "react";

class Label extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <label>
                {this.props.value}
                <span className="required">*</span>
            </label>
        );
    }
}

export default Label;
