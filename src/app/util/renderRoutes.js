import React from 'react';
import Switch from 'react-router/Switch';
import Route from 'react-router/Route';
import { withRouter } from 'react-router-dom';

const renderRoutes = (routes, extraProps = {}, switchProps = {}) => (
  routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => {
        const RouteComponent = withRouter(route.component);
        return (
          <Route
            key={route.key || i}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            render={props => <RouteComponent {...props} {...extraProps} route={route} routes={route.routes} />}
          />);
      })}
    </Switch>
  ) : null
);

export default renderRoutes;
