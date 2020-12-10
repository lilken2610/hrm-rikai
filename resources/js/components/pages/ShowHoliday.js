import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
class ShowHoliday extends Component {
    constructor(props) {
        super(props);
        this.state = {         
                type:'',
                days:'',
                status:'',
                description:'',
                start_time:'',
                end_time:'',
                company_id:''
        };
    }
    componentDidMount() {
        axios.get("/api/show-holiday/" + this.props.match.params.id )
        .then(response => {
          this.setState({
              type: response.data[0].type,
              days: response.data[0].days,
              status:response.data[0].status,
              description:response.data[0].description,
              start_time:response.data[0].start_time,
              end_time:response.data[0].end_time,
              company_id:response.data[0].company_id
        });
        console.log(response.data)
        })
        
        .catch(function (error) {
          console.log(error);
        })
            
    }

    render() {
        return (
            <div className="right_col" role="main" >
                <div className="">
                    <div className="page-title">
                    <h2>
                                <a href="/#/list-holiday">Holiday</a>
                                <a href="/#/show-holiday"> / Show</a>
                            </h2>
                    </div>
                    <div className="clearfix"></div>
                    <div className="row mt-2">
                        <div className="col-md-12 col-sm-12">
                            <div className="x_panel">
                                <div className="x_content">
                                    <div className="col-sm-9 col-md-9">
                                        <div className="field item form-group  ">
                                            <label className="col-form-label col-md-3 col-sm-3  label-align">
                                                Type
                                                
                                            </label>
                                            <div className="col-md-8 col-sm-8">
                                                <p
                                                    className="form-control bottom"
                                                    name="type"
                                                    data-validate-minmax="10,100"
                                                >
                                                    {this.state.type}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="field item form-group  ">
                                            <label className="col-form-label col-md-3 col-sm-3  label-align">
                                               Days
                                               
                                            </label>
                                            <div className="col-md-8 col-sm-8">
                                                <p
                                                    className="form-control bottom"
                                                    name="days"
                                                    data-validate-minmax="10,100"
                                                >
                                                    {this.state.days}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="field item form-group  ">
                                            <label className="col-form-label col-md-3 col-sm-3  label-align">
                                                Status
                                                
                                            </label>
                                            <div className="col-md-8 col-sm-8">
                                                <p
                                                    className="form-control bottom"
                                                    name="status"
                                                    data-validate-minmax="10,100"
                                                >
                                                    {
                                                        this.state
                                                            .status
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <div className="field item form-group  ">
                                            <label className="col-form-label col-md-3 col-sm-3  label-align">
                                               Description
                                                
                                            </label>
                                            <div className="col-md-8 col-sm-8">
                                                <p
                                                    className="form-control bottom"
                                                    name="description"
                                                    data-validate-minmax="10,100"
                                                >
                                                    {
                                                        this.state .description
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        <div className="field item form-group">
                                            <label className="col-form-label col-md-3 col-sm-3  label-align">
                                                Start_time
                                               
                                            </label>
                                            <div className="col-md-8 col-sm-8">
                                                <p
                                                    className="form-control bottom"
                                                    name="start_time"
                                                    data-validate-minmax="10,100"
                                                >
                                                    {
                                                        this.state
                                                            .start_time
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <div className="field item form-group">
                                            <label className="col-form-label col-md-3 col-sm-3  label-align">
                                                End_time
                                               
                                            </label>
                                            <div className="col-md-8 col-sm-8">
                                                <p
                                                    className="form-control bottom"
                                                    name="end_time"
                                                    data-validate-minmax="10,100"
                                                >
                                                    {
                                                        this.state
                                                            .end_time
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="field item form-group  ">
                                            <label className="col-form-label col-md-3 col-sm-3  label-align">
                                                Company_id
                                                
                                            </label>
                                            <div className="col-md-8 col-sm-8">
                                                <p
                                                    className="form-control bottom"
                                                    name="company_id"
                                                    data-validate-minmax="10,100"
                                                >
                                                    {
                                                        this.state
                                                            .company_id
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        

                                        {/* <div className="ln_solid">
                                            <div className="form-group">
                                                <div className="col-md-6 offset-md-3">
                                                    <Link
                                                        to={
                                                            this.state.employee
                                                                .id + "/edit"
                                                        }
                                                        className="btn btn-success edit"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger delete"
                                                        onClick={event =>
                                                            this.deleteEmployee()
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShowHoliday;

