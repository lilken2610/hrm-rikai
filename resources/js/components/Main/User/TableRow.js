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
      <tr id="return"  style={{ textAlign: 'center' }}>
        <th>{this.props.index}</th>
        <td>{this.props.user.email}</td>
        <td>{this.props.user.fullname}</td>
        <td>
          {(() => {
            if (this.props.user.avatar == null) {
              return (
                <>
                <img src="https://uavair.com.au/wp-content/uploads/2018/03/default-avatar.png" className="mx-auto img-fluid img-circle d-block rounded-circle" id="output" alt="avatar" style={{ maxHeight: '60%', maxWidth: '60%' }} />
              </>
              )
            } else {
              return (
                <>
                  <img src={this.props.user.avatar} className="mx-auto img-fluid img-circle d-block rounded-circle" id="output" alt="avatar" style={{ maxHeight: '60%', maxWidth: '60%' }} />
                </>
              )
            }
          })()}
        </td>
        <td>
          <Moment format="YYYY-MM-DD HH:mm:ss">
            {this.props.user.created_at}
          </Moment>
        </td>
        <td>
          <Moment format="YYYY-MM-DD HH:mm:ss">
            {this.props.user.updated_at}
          </Moment>
        </td>
        <td>
          {(() => {
            if (this.props.user.status == 1) {
              return (
                <>                
                  <i class="fa fa-check-circle fa-4x" aria-hidden="true" style={{ color: 'blueviolet' }}></i>
              </>
              )
            } else {
              return (
                <>
                  <i class="fa fa-times-circle fa-4x" aria-hidden="true" style={{ color: 'red' }}></i>
                </>
              )
            }
          })()}
        </td>
        <td>{this.props.user.fullname}</td>
        <td style={{ textAlign: 'center' }}>
          <button style={{ color: 'brown' }} type="button"><Link to={"detail-user/" + this.props.user.id}>
            <i className="fa fa-info-circle fa-2x" /></Link>
          </button>
        </td>
      </tr>
    );
  }
}

export default TableRow;
