import React, { Component } from "react";
import { styleWorking } from "../../../../CSS/styleworking";
class InputSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (  
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span
            className="input-group-text "
            style={styleWorking.lableSearch}
            id="basic-addon1"
          >
            {this.props.label}
          </span>
        </div>
        <input
          ref={(node) => { this.heading = node; }}
          type={this.props.type}
          id={this.props.id}
          className="form-control"
          style={styleWorking.inputSearch}
          name={this.props.name}
          placeholder={this.props.placeholder}
          onChange={event => {
            this.props.setValueInput(event);
          }}
        />
    </div>
    );
  }
}
export default InputSearch;