import { event } from "jquery";
import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
class EditHoliday extends Component {
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
        axios.get("/api/edit-holiday/" + this.props.match.params.id )
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
        
        })
        
        .catch(function (error) {
          console.log(error);
        })
            
    }
    isChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
          [name]:value
        });
      }
      handleSubmit = (event) => {
        event.preventDefault();
        const holiday={
            type:this.state.type,
            days:this.state.days,
            status:this.state.status,
            description:this.state.description,
            start_time:this.state.start_time,
            end_time:this.state.end_time,
            company_id:this.state.company_id
        };
        
      axios.put('/api/update-holiday/' + this.props.match.params.id, holiday)
      .then((res) => {
        console.log(res.data)
        console.log('holdiay successfully updated')
        console.log(res);
      })
      Swal.fire(
        'Good job!',
         'Updated holiday successfully',
        'success'
    ).then(function() {
        window.location.href = "/#/list-holiday";
    })
      .catch((error) => {
        console.log(error)
      })
  }
    render() {
        return (
            <div className="right_col" role="main" >
                <div className="">
                    <div className="page-title">
                        <h2>Edit Holiday</h2>
                    </div>
                    <form onSubmit={(event) => this.handleSubmit(event)}>
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
                                                <input
                                                    className="form-control bottom"
                                                    name="type"
                                                    data-validate-minmax="10,100"

                                                    value={this.state.type}onChange={(event) => {this.isChange(event)}}
                                                />
                                            </div>
                                        </div>
                                        <div className="field item form-group  ">
                                            <label className="col-form-label col-md-3 col-sm-3  label-align">
                                               Days
                                               
                                            </label>
                                            <div className="col-md-8 col-sm-8">
                                                <input
                                                    className="form-control bottom"
                                                    name="days"
                                                    data-validate-minmax="10,100"
                                            
                                                    value={this.state.days}onChange={(event) => {this.isChange(event)}}
                                                />
                                            </div>
                                        </div>

                                        <div className="field item form-group  ">
                                            <label className="col-form-label col-md-3 col-sm-3  label-align">
                                                Status
                                                
                                            </label>
                                            <div className="col-md-8 col-sm-8">
                                                <input
                                                    className="form-control bottom"
                                                    name="status"
                                                    data-validate-minmax="10,100"
                                                
                                                    value={ this.state.status}onChange={(event) => {this.isChange(event)}}
                                                />
                                            </div>
                                        </div>
                                        <div className="field item form-group  ">
                                            <label className="col-form-label col-md-3 col-sm-3  label-align">
                                               Description
                                                
                                            </label>
                                            <div className="col-md-8 col-sm-8">
                                                <input
                                                    className="form-control bottom"
                                                    name="description"
                                                    data-validate-minmax="10,100"
                                              
                                                   value= {this.state .description }onChange={(event) => {this.isChange(event)}}
                                                />
                                            </div>
                                        </div>

                                        <div className="field item form-group">
                                            <label className="col-form-label col-md-3 col-sm-3  label-align">
                                                Start_time
                                               
                                            </label>
                                            <div className="col-md-8 col-sm-8">
                                                <input
                                                    className="form-control bottom"
                                                    name="start_time"
                                                    data-validate-minmax="10,100"
                                                   value= { this.state.start_time }onChange={(event) => {this.isChange(event)}}/>
                                            </div>
                                        </div>
                                        <div className="field item form-group">
                                            <label className="col-form-label col-md-3 col-sm-3  label-align">
                                                End_time
                                               
                                            </label>
                                            <div className="col-md-8 col-sm-8">
                                                <input
                                                    className="form-control bottom"
                                                    name="end_time"
                                                    data-validate-minmax="10,100"
                                                    value={this.state.end_time}onChange={(event) => {this.isChange(event)}}
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="field item form-group  ">
                                            <label className="col-form-label col-md-3 col-sm-3  label-align">
                                                Company_id
                                                
                                            </label>
                                            <div className="col-md-8 col-sm-8">
                                                <input
                                                    className="form-control bottom"
                                                    name="company_id"
                                                    data-validate-minmax="10,100"
                                                
                                                value={this.state.company_id}onChange={(event) => {this.isChange(event)}}
                                                />
                                            </div>
                                        </div>
                                        

                                       <div className="ln_solid">
                                            <div className="form-group">
                                                <div className="col-md-3 offset-md-3">
                                                   
                                                    <button
                                                        type="submit"
                                                        className="btn btn-success"
                                                       
                                                    >
                                                        Save
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                       
                    </div>
                    </form>
                </div>
            </div>
        );
    }

}
 
export default EditHoliday;