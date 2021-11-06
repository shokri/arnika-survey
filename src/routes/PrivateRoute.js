import React from 'react';
import { Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, render, reverse, Layout, ...rest }) => {

    return (
        <Route
            {...rest}
            render={props => (render ? render(props) : <Layout {...props} {...rest} ><Component {...props} {...rest} /></Layout>)}
        />
    );
}

export default PrivateRoute;