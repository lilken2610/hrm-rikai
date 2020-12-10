import { Button } from 'bootstrap';
import React,{Component} from 'react';
import { Link } from 'react-router-dom';
class TableRow extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    
    render() { 
        return ( 
            <tr>
                {/* <td>{this.props.index}</td> */}
                <td>{this.props.holiday.id}</td>
                <td>{this.props.holiday.type}</td>
                <td>{this.props.holiday.days}</td>
                <td>{this.props.holiday.description}</td>
                <td>{this.props.holiday.status}</td>
                <td>{this.props.holiday.start_time}</td>
                <td>{this.props.holiday.end_time}</td>
                <td>
                <Link to={"show-holiday/"+ this.props.holiday.id} ><i className="fa fa-eye text-success  fa-lg"></i></Link>
                 <Link to={"edit-holiday/" + this.props.holiday.id}><i className="fa fa-edit"></i></Link>
                 <a onClick={event => this.props.deleteHoliday(this.props.holiday.id)} ><i class="fa fa-trash "></i></a>
               
          </td>
            </tr> 
            
        );
    }
}
 
export default TableRow;
