import React from 'react';
import { Route } from 'react-router'
import { ConnectedRouter } from 'connected-react-router';
import Index from './components/containers/Index';
import ListData from './components/containers/ListData';
import Login from './components/containers/Login';
import Header from './components/containers/Header';
import Menu from './components/containers/Menu';
import ProfileSettings from './components/containers/ProfileSettings';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateData from "./components/containers/CreateData";

const App = ({history}) => {
        return (
            <ConnectedRouter history={history}>
                <Route path="/" component={Header}/>
                <Route exact path="/" component={Index}/>
                <Route exact path="/list/users" component={ListData}/>
                <Route exact path="/list/categories" component={ListData}/>
                <Route exact path="/list/tasks" component={ListData}/>
                <Route exact path="/list/lists" component={ListData}/>
                <Route exact path="/create/users" component={CreateData}/>
                <Route exact path="/create/categories" component={CreateData}/>
                <Route exact path="/create/tasks" component={CreateData}/>
                <Route exact path="/create/lists" component={CreateData}/>
                <Route exact path="/profile/settings" component={ProfileSettings}/>
                <Route exact path="/login" component={Login}/>
                <Route path="/" component={Menu}/>
            </ConnectedRouter>
            )
};

export default App;
