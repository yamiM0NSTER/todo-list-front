import React, { useEffect } from 'react';

import { Main } from './pages/main/Main';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Login } from './pages/login/Login';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Redirect to={{ pathname: '/login' }}></Redirect>
      </Switch>
    </HashRouter>
  );
}

export default App;
