import React, { Component } from "react";
import Moment from "react-moment";
import TextTruncate from 'react-text-truncate';
import {Link } from "react-router-dom";


class TableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <tr id="return">
        <th>{this.props.index}</th>
        <td>{this.props.company.name}</td>
        <td>{this.props.company.description}</td>
        <td>
          <Moment format="YYYY-MM-DD HH:mm:ss">
            {this.props.company.created_at}
          </Moment>
        </td>
        <td>
          <Moment format="YYYY-MM-DD HH:mm:ss">
            {this.props.company.updated_at}
          </Moment>
        </td>
        <td>{this.props.company.user_create.fullname}</td>
        <td>{this.props.company.user_update.fullname}</td>
        <td  style={{ textAlign: 'center' }}>
          <button style={{ color: 'brown' }} type="button"><Link to={"detail-company/" + this.props.company.id}>
            <i className="fa fa-info-circle fa-2x" /></Link>
          </button>
        </td>
      </tr>
    );
  }
}

export default TableRow;
