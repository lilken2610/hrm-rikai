import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import Moment from "react-moment";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

class DetailCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: {},
            user_create: {},
            user_update: {}
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = ({currentTarget}) =>  {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert "+this.state.company.name+"!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
          if (result.isConfirmed) {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');
            axios.delete('http://127.0.0.1:8000/api/auth/delete-company/' + currentTarget.value)
              .catch(err => console.log(err));
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            ).then(function() {
                window.location.href = "#/companies";
            });
          }
        });
      }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');
        axios.get("http://127.0.0.1:8000/api/auth/detail-company/" + this.props.match.params.id)
            .then(res => {
                this.setState({
                    company: res.data,
                    user_create: res.data.user_create,
                    user_update: res.data.user_update
                });
                console.log(res.data)
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="right_col" role="main" style={{ minHeight: '1000px' }}>
                <div className="row">
                    <div className="col-md-12 col-sm-12 ">
                        <div className="x_panel">
                            <div className="x_title">
                                <h2>
                                    <Link to={'/'}>Home Page / </Link><Link to={'/companies'}>List Companies / </Link><Link to={'/detail-company/' + this.state.company.id}>Detail Company</Link></h2>
                                <div className="clearfix" />
                            </div>
                            <div className="x_content">
                                <form onSubmit={(event) => this.handleCreate(event)} id="formCreate">
                            
                                    <div className="item form-group">
                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Company Name
                <span className="required"></span>
                                        </label>
                                        <p
                                            className="form-control bottom"
                                            name="name"
                                            data-validate-minmax="10,100" col="10"
                                        >
                                            {this.state.company.name}
                                        </p>
                                    </div>
                                    <div className="item form-group">
                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Description
                <span className="required"></span>
                                        </label>
                                        <p
                                            className="form-control bottom"
                                            name="name"
                                            data-validate-minmax="10,100" col="10" row="10"
                                        >{this.state.company.description}    </p>
                                    </div>
                                    <div className="item form-group">
                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Created at
                <span className="required"></span>
                                        </label>
                                        <p
                                            className="form-control bottom"
                                            name="name"
                                            data-validate-minmax="10,100" col="10"
                                        ><Moment format="YYYY-MM-DD HH:mm:ss">{this.state.company.created_at}</Moment></p>
                                    </div>
                                    <div className="item form-group">
                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Updated at
                <span className="required"></span>
                                        </label>
                                        <p
                                            className="form-control bottom"
                                            name="name"
                                            data-validate-minmax="10,100" col="10"
                                        ><Moment format="YYYY-MM-DD HH:mm:ss">{this.state.company.updated_at}</Moment></p>
                                    </div>
                                    <div className="item form-group">
                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Created by
                <span className="required"></span>
                                        </label>
                                        <p
                                            className="form-control bottom"
                                            name="name"
                                            data-validate-minmax="10,100" col="10"
                                        >{this.state.user_create.fullname}</p>
                                    </div>
                                    <div className="item form-group">
                                        <label className="col-form-label col-md-3 col-sm-3 label-align">Updated by
                <span className="required"></span>
                                        </label>
                                        <p
                                            className="form-control bottom"
                                            name="name"
                                            data-validate-minmax="10,100" col="10"
                                        >{this.state.user_update.fullname}</p>
                                    </div>
                                    <div className="ln_solid"> </div>
                                    <div className="item form-group">
                                        <div className="col-md-6 col-sm-6 offset-md-3">
                                            <Link to={'/companies'}><button className="btn btn-primary" type="button">Cancel</button></Link>
                                            <button className="btn btn-danger" type="button" value={this.state.company.id} onClick={this.handleClick}>Delete</button>
                                            <Link to={'/detail-company/' + this.state.company.id + '/edit'}>   <button type="submit" className="btn btn-success">Update</button></Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };

}

export default DetailCompany;