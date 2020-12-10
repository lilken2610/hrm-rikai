import React, { Component } from "react";
import { Link } from "react-router-dom";

class ListSearchForm extends Component {
    constructor(props) {
        super(props)
        // this.rowSelect = React.createRef();
    }
    render() { 
        return ( 
            <div className="clearfix">
            <h2 >
                <a href="/#/list-employee">Employee</a>
            </h2>
            <form
                className="row"
                method="get"
                id="form"
                onSubmit={event => {
                    this.props.searchListEmployee(event)
                }}
            >
                <div className="form-group col-sm-6 col-md-6 ">
                    <label
                        htmlFor="name"
                        className="col-sm-2 col-form-label label-input"
                    >
                        Name
                    </label>
                    <div className="col-sm-10 div-input">
                        <input
                            type="text"
                            className="form-control input"
                            placeholder="search for name..."
                            name="name"
                            id="name"
                            maxLength="50"
                            onChange={event => {
                                this.props.setValueInput(event);
                            }}
                        />
                    </div>
                </div>
                <div className="form-group col-sm-6 col-md-6 right">
                    <label
                        htmlFor="phone"
                        className="col-sm-2 col-form-label label-input"
                    >
                        Phone
                    </label>
                    <div className="col-sm-10 div-input">
                        <input
                            type="text"
                            className="form-control input "
                            placeholder="sentence.search for phone..."
                            name="phone"
                            id="phone"
                            maxLength="50"
                            onChange={event => {
                                this.props.setValueInput(event);
                            }}
                        />
                    </div>
                </div>
                <div className="form-group col-sm-6 col-md-6 ">
                    <label
                        htmlFor="email"
                        className="col-sm-2 col-form-label label-input"
                    >
                        Email
                    </label>
                    <div className="col-sm-10 div-input">
                        <input
                            type="text"
                            className="form-control input"
                            placeholder="search for email..."
                            name="email"
                            id="email"
                            maxLength="50"
                            onChange={event => {
                                this.props.setValueInput(event);
                            }}
                        />
                    </div>
                </div>
                <div className="form-group col-sm-6 col-md-6 right">
                    <label
                        htmlFor="age"
                        className="col-sm-2 col-form-label label-input"
                    >
                        Age
                    </label>
                    <div className="col-sm-10 div-input">
                        <input
                            type="text"
                            className="form-control input"
                            placeholder="search for age..."
                            name="age"
                            id="age"
                            maxLength="50"
                            onChange={event => {
                                this.props.setValueInput(event);
                            }}
                        />
                    </div>
                </div>
                <div className="form-group col-sm-12 col-md-12">
                    <div className="d-flex justify-content-end">
                        <button
                            id='button'
                            type="reset"
                            className="btn btn-secondary reset"
                            onClick={() => this.props.resetListTableComponent()}
                            id="button"
                        >
                            Reset
                        </button>
                        <button
                              id='button'
                            type="submit"
                            className="btn btn-primary search"
                            id="button"
                        >
                            Search
                        </button>
                        <Link
                            className="btn btn-primary create"
                            to={"/add-employee"}
                            id="button"
                        >
                            Create
                        </Link>
                    </div>
                </div>
                <div className="select input-group col-sm-12 col-md-12">
                    <div className="input-group-prepend">
                        <label
                            className="input-group-text"
                            htmlFor="record"
                        >
                            Rows
                        </label>
                    </div>
                    <select
                       ref={(node) => { this.heading = node; }}
                        className="custom-select col-1"
                        name="record"
                        id="record"
                        onChange={event => {
                            this.props.searchRowListEmployee(event);
                        }}
                    >
                        {this.props.rows.map((row, index) => (
                            <option value={row} key={index}>
                                {row}
                            </option>
                        ))}
                    </select>
                    &nbsp;
                    <p
                        className={
                            "d-flex align-items-center " +
                            (this.props.quantityEmployee === false
                                ? "disable-quantity"
                                : "enable-quantity")
                        }
                    >
                        Result of {this.props.totalRecord} employees
                    </p>
                </div>
            </form>
        </div>
         );
    }
}
 
export default ListSearchForm;