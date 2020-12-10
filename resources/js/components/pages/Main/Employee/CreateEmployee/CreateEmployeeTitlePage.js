import React, {Component} from 'react';
class CreateEmployeeTitlePage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="page-title">
                <div className="title_left">
                    <h2>
                        <a href="/#/list-employee">Employee</a>
                        <a href="/#/add-employee"> / Create</a>
                    </h2>
                </div>
            </div>
        );
    }
}

export default CreateEmployeeTitlePage;
