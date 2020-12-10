import React,{Component} from "react";

class Title extends Component {
  constructor(props) {
    super(props);
  }
  render() { 
    return (  
        <a href={this.props.href}>{this.props.value}</a>
    );
  }
}
export default Title;