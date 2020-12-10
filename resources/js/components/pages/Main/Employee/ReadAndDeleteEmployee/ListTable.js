import React,{Component} from 'react';
import { Pagination } from "react-laravel-paginex";
import TableRowEmployee from "./TabRowEmployee";
class ListTable extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
     // Show list employee into table
     tabRow() {
        const {totalCurrent,current_page,oldData,employees} = this.props;
        if (employees instanceof Array) {
            return employees.map(function(employee, index) {
                return (
                    <TableRowEmployee
                        employee={employee}
                        key={index}
                        index={
                            current_page === 1
                                ? index + 1                              
                                : totalCurrent - oldData.record + index + 1
                          
                        }
                    />
                );
            });
        }
    }
    render() { 
        return ( 
            <div className="row">
                        <div className="col-md-12">
                            <div className="x_panel">
                                <div className="x_content">
                                    <section className="content invoice">
                                        <div className="row">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>No.</th>
                                                        <th>Name</th>
                                                        <th>Phone</th>
                                                        <th>Email</th>
                                                        <th>Age</th>
                                                    </tr>
                                                </thead>
                                                <tbody>{this.tabRow()}</tbody>
                                            </table>
                                            <Pagination
                                                changePage={this.props.getData}
                                                data={this.props.data}
                                            />
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
         );
    }
}
 
export default ListTable;