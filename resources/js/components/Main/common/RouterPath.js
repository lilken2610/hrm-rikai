import React, {Component} from 'react';
import { Route, Redirect,} from 'react-router-dom';
import Home from '../../Home';
import ListCompanies from '../companies/List';
import CreateCompany from '../companies/Create';
import DetailCompany from '../companies/Detail';
import UpdateCompany from '../companies/Update';
import Login from '../Auth/Login';
import Logout from '../Auth/Logout';
import SendEmail from '../Auth/SendEmailReset';
import ResetPass from '../Auth/ResetPass';
import InfoUser from '../User/Info';
import ListUsers from '../User/List';
import CreateUser from '../User/Create';
import DetailUser from '../User/Detail';

import ListHoliday from '../../pages/ListHoliday';
import AddHoliday from '../../pages/AddHoliday';
import ShowHoliday from '../../pages/ShowHoliday';
import EditHoliday from '../../pages/EditHoliday';
import ListEmployeeHoliday from '../../pages/ListEmployeeHoliday';

import ListEmployeeMain from "../../pages/Main/Employee/ReadAndDeleteEmployee/ListEmployeeMain";
import DetailEmployeeMain from "../../pages/Main/Employee/ReadAndDeleteEmployee/DetailEmployeeMain";
import UpdateEmployeeMain from "../../pages/Main/Employee/UpdateEmployee/UpdateEmployeeMain";
import Create from "../../pages/Main/Employee/CreateEmployee/CreateEmployeeMain";
import ListTime from "../../pages/Main/WorkingTime/ListTime/ListTime";
import AddTime from "../../pages/Main/WorkingTime/AddTime/AddTime";
import EditTime from "../../pages/Main//WorkingTime/EditTime/EditTime";

const auth = localStorage.getItem('Authorization');

const RouteLogin = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
       auth !== null ?
          <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location }}} />
    )} />
 );

class RouterPath extends Component {
    render() {
        return (
            <main>
                <Route exact path='/' component={Home} />
                <RouteLogin  exact path='/companies' component={ListCompanies} />
                <Route exact path='/create-companies' component={CreateCompany} />
                <Route exact path='/detail-company/:id' component={DetailCompany} />
                <Route exact path='/detail-company/:id/edit' component={UpdateCompany} />
                <Route exact path='/user/info' component={InfoUser} />
                <Route exact path='/users' component={ListUsers} />
                <Route exact path='/users/create' component={CreateUser} />
                <Route exact path='/detail-user/:id' component={DetailUser} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/send-email-reset' component={SendEmail} />
                <Route exact path='/send-reset-pass/:token' component={ResetPass} />
                <Route exact path='/logout' component={Logout} />

                <Route exact path='/list-holiday' component={ListHoliday}/>
                    <Route exact path='/show-holiday/:id' component={ShowHoliday}/>
                    <Route exact path='/edit-holiday/:id' component={EditHoliday}/>
                    <Route exact path='/add-holiday' component={AddHoliday}/>
                <Route exact path='/list-employee-holiday' component={ListEmployeeHoliday} />

                <Route exact path="/workingtimes" component={ListTime} />
                    <Route exact path="/add-time" component={AddTime} />
                    <Route exact path="/edit-time/:id" component={EditTime} />
                    <Route
                        exact
                        path="/list-employee"
                        component={ListEmployeeMain}
                    />
                    <Route exact path="/add-employee" component={Create} />
                    <Route
                        exact
                        path="/detail-employee/:id"
                        component={DetailEmployeeMain}
                    />
                    <Route
                        exact
                        path="/detail-employee/:id/edit"
                        component={UpdateEmployeeMain}
                    />
            </main>
        );
    }
}

export default RouterPath;
