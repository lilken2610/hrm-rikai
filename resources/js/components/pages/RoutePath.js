import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import ListHoliday from './ListHoliday';
import AddHoliday from './AddHoliday';
import ShowHoliday from './ShowHoliday';
import EditHoliday from './EditHoliday';
import ListEmployeeHoliday from './ListEmployeeHoliday';

class RoutePath extends Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={ListHoliday}/>
                    <Route exact path='/list-holiday' component={ListHoliday}/>
                    <Route exact path='/show-holiday/:id' component={ShowHoliday}/>
                    <Route exact path='/edit-holiday/:id' component={EditHoliday}/> 
                    <Route exact path='/add-holiday' component={AddHoliday}/>
                    <Route exact path='/list-employee-holiday' component={ListEmployeeHoliday}/>
                </Switch>
            </main>
        )
    }
}
 
export default RoutePath;
