import React from 'react';
import { Route } from 'react-router'
import { ConnectedRouter } from 'connected-react-router';
import Index from './components/containers/Index';
import Categories from './components/containers/Categories';
import Lists from './components/containers/Lists';
import Tasks from './components/containers/Tasks';
import Login from './components/containers/Login';
import Header from './components/containers/Header';
import Menu from './components/containers/Menu';
import ProfileSettings from './components/containers/ProfileSettings';
import 'bootstrap/dist/css/bootstrap.min.css';
import Users from "./components/containers/Users";
import CreateUser from "./components/containers/CreateUser";

const App = ({history}) => {
        return (
            <ConnectedRouter history={history}>
                <Route path="/" component={Header}/>
                <Route exact path="/" component={Index}/>
                <Route exact path="/users" component={Users}/>
                <Route exact path="/create-user" component={CreateUser}/>
                <Route exact path="/categories" component={Categories}/>
                <Route exact path="/lists" component={Lists}/>
                <Route exact path="/tasks" component={Tasks}/>
                <Route exact path="/profile/settings" component={ProfileSettings}/>
                <Route exact path="/login" component={Login}/>
                <Route path="/" component={Menu}/>
            </ConnectedRouter>
            )
};

export default App;
