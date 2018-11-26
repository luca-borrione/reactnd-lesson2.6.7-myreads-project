import React from 'react';
import { Route } from 'react-router-dom';

// Allows passing custom props to Routes using a clearer syntax

const PropsRoute = ({ component, path, ...otherProps }) => (
  <Route
    {...otherProps}
    path={path}
    render={routeProps => React.createElement(component, { ...otherProps, ...routeProps })}
  />
);

export default PropsRoute;
