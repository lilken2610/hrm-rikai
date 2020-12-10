import React,{Component} from 'react';
class ServerError extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <>
                <li className="text-danger">{this.props.message}</li>
            </>
        );
    }
}
export default ServerError;