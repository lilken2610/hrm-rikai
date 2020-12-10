import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "sweetalert2/src/sweetalert2.scss";
import dayjs from 'dayjs';
class TableRowWorkingTime extends Component {
    constructor(props) {
        super(props);
    }  
    render() {
        return (
            <tr>
                <td>{this.props.index}</td>
                <td>{this.props.workingtime.employee_id}</td>
                <td>{this.props.workingtime.name}</td>
                <td> {this.props.workingtime.type == 2 ?
                    <p>{dayjs(this.props.workingtime.time).format('MM/DD/YYYY HH:mm:ss')}</p> : ''}</td>
                <td> {this.props.workingtime.type == 1 ?
                    <p>{dayjs(this.props.workingtime.time).format('MM/DD/YYYY HH:mm:ss')}</p> : ''}</td>
                <td>
                    <Link to={"/edit-time/" + this.props.workingtime.id}
                        className="btn btn-primary"
                        style={{ marginRight: '5px',maxWidth: '70px',lineHeight: '1.8' }}>Edit</Link>
                    <button onClick={event => this.props.deleteTime(this.props.workingtime.id)} className="btn btn-danger delete">Delete</button>
                </td>
            </tr>
        );
    }
}

export default TableRowWorkingTime;
