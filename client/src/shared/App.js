import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';
import Test from '../pages/Test';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

function App() {
  return (
    <>
      <ConnectedRouter history={history}>
        <Route path='/test' exact component={Test} />
        <Route path='/' exact component={Login} />
        <Route path='/signup' exact component={Signup} />
      </ConnectedRouter>
    </>
  );
}

export default App;
