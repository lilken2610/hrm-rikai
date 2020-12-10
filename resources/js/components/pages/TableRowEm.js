import React,{Component} from 'react';

class TableRowEm extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    
    render() { 
        return ( 
            <tr>
                <td>{this.props.index}</td>
                <td>{this.props.employee_holiday.id}</td>
                <td>{this.props.employee_holiday.name}</td>
                <td>{this.props.employee_holiday.type}</td>
                <td>{this.props.employee_holiday.days}</td>
                <td>{this.props.employee_holiday.status}</td>
            </tr> 
        );
    }
}
 
export default TableRowEm;


