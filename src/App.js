import React from 'react';
import { Route } from 'react-router'
import { ConnectedRouter } from 'connected-react-router';
import Index from './components/containers/Index';
import Login from './components/containers/Login';
import Header from './components/containers/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = ({history}) => {
  return (
      <ConnectedRouter history={history}>
              <Route path="/" component={Header}/>
              <Route exact path="/" component={Index}/>
              <Route exact path="/login" component={Login}/>
      </ConnectedRouter>
  );
};

export default App;
