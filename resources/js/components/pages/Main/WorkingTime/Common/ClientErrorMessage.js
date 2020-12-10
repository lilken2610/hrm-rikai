import React,{Component} from 'react';
class ClientError extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
    <span className="error">{this.props.message}</span>
    );
  }
}
export default ClientError;