import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import ListEmployeeMain from "../Employee/ReadAndDeleteEmployee/ListEmployeeMain";
import DetailEmployeeMain from "../Employee/ReadAndDeleteEmployee/DetailEmployeeMain";
import UpdateEmployeeMain from "../Employee/UpdateEmployee/UpdateEmployeeMain";
import Create from "../Employee/CreateEmployee/CreateEmployeeMain";
import ListTime from "../../Main/WorkingTime/ListTime/ListTime";
import AddTime from "../../Main/WorkingTime/AddTime/AddTime";
import EditTime from "../../Main/WorkingTime/EditTime/EditTime";
import Home from "./Home";
class RoutePath extends Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path="/" component={Home} />
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
                </Switch>
            </main>
        );
    }
}

export default RoutePath;
