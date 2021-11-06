import React from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import routes from "./routes";
import PrivateRoute from "./PrivateRoute";

export default () => {
    return <Router>
        <Switch>
            {Object.keys(routes).map(key => {
                const { reverse, exact, component, Layout, wrapperClassName, header, footer, backLink } = routes[key];
                return <PrivateRoute
                    header={header}
                    footer={footer}
                    wrapperClassName={'wrapper-pages' + ' ' + wrapperClassName}
                    key={key}
                    reverse={reverse}
                    exact={exact}
                    path={key}
                    Layout={Layout}
                    backLink={backLink}
                    component={component}
                />
            }
            )}
        </Switch>
    </Router>
}