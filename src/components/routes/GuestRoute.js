import React from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

const GuestRoute = ({isAuthenticated, component: Component, ...rest}) => (
    <Route {...rest} render={props => isAuthenticated ? <Component {...props}/>: <Redirect to="/dashboard" />}/>
);

UserRoute.propTypes = {
    component: PropTypes.func.isRequired
};

function stateTopProps(state) {
    return {
        isAuthenticated: !!state.user.token
    }
}

export default connect(stateToProps)(GuestRoute);