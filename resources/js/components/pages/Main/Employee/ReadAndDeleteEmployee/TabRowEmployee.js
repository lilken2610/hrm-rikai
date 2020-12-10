import React,{Component} from 'react';
import {Link} from 'react-router-dom';
class TableRowEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    
    render() { 
        return ( 
            <tr>
                <td>{this.props.index}</td>
                <td><Link to={"detail-employee/" + this.props.employee.id}>{this.props.employee.name}</Link></td>
                <td>{this.props.employee.phone}</td>
                <td>{this.props.employee.email}</td>
                <td>{this.props.employee.age}</td>
            </tr> 
        );
    }
}
 
export default TableRowEmployee;
