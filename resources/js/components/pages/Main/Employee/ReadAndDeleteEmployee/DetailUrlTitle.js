import React, {Component} from 'react';
class UrlTitle extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return ( 
            <div className="page-title">
                        <div className="title_left">
                            <h2>
                                <a href="/#/list-employee">Employee</a>
                                <a
                                    href={
                                        "/#/detail-employee/" +
                                        this.props.employee.id
                                    }
                                >
                                    &nbsp;/ {this.props.employee.name}
                                </a>
                            </h2>
                        </div>
                    </div>
         );
    }
}
 
export default UrlTitle;