import React from "react";
import { Route, Redirect } from "react-router-dom";

export function UnprotectedRoute({ component: Component, ...rest }) {
  // console.log(rest.store.getState())
  const isAuthenticated = rest.store.getState().user.token
  // console.log(isAuthenticated)
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated ? (
          <Component {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: "/system",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}