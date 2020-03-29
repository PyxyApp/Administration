import React from 'react';
import { Route } from 'react-router'
import { ConnectedRouter } from 'connected-react-router';
import Index from './components/containers/Content/Index';
import Login from './components/containers/Auth/Login';
import Header from './components/containers/Menu/Header';
import Menu from './components/containers/Menu/Menu';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = ({history}) => {
    if (history.location.pathname === '/login') {
        return (
            <ConnectedRouter history={history}>
                <Route exact path="/login" component={Login}/>
            </ConnectedRouter>
            )
    } else {
        return (
            <ConnectedRouter history={history}>
                <Route path="/" component={Header}/>
                <Route exact path="/" component={Index}/>
                <Route exact path="/login" component={Login}/>
                <Route path="/" component={Menu}/>
            </ConnectedRouter>
            )
    }
};

export default App;
