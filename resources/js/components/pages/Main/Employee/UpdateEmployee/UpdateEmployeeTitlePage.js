import React, {Component} from 'react';
class UpdateEmployeeTitlePage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 

            <div className="title_left">
            <h2>
                <a href="/#/list-employee">Employee</a>
                <a
                    href={
                        "/#/detail-employee/" +
                        this.props.newData.id
                    }
                >
                    &nbsp;/ {this.props.nameEmployee}
                </a>
                <a
                    href={
                        "/#/update-employee/" +
                        this.props.newData.id
                    }
                >
                    &nbsp;/ Edit
                </a>
            </h2>
        </div>
         );
    }
}
 
export default UpdateEmployeeTitlePage;