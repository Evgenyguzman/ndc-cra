import React from "react";
import { Route, Redirect } from "react-router-dom";

export function PrivateRoute({ component: Component, ...rest }) {
  // const isAuthorized = rest.store.getState().user.token
  const isAuthorized = true
  return (
    <Route
      {...rest}
      render={props =>
        isAuthorized ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/auth",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}