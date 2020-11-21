import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from './screens/Login';
import Register from './screens/Register';
import Homepage from './screens/Homepage';
import {ProvideAuth, useAuth} from './context';

export default function Navigation() {
  return (
    <ProvideAuth>
      <Router>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <PrivateRoute path="/homepage">
              <Homepage />
            </PrivateRoute>
          </Switch>
      </Router>
    </ProvideAuth>
  );
}

function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
