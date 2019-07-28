import React from "react";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions/auth';

const HomePage = ({isAuthenticated}) => (
    <div>
        <h1>Home Page</h1>
        {isAuthenticated ? <button onClick={() => logout}>Logout</button> : <div><Link to="/login">Login</Link>
         or <Link to='/signup'>Sign Up</Link>
        </div>}
    </div>
);

HomePage.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
};

function stateToProp(state) {
    return {
        isAuthenticated: !!state.user.token
    }
}

export default connect(stateToProp, {logout: actions.logout})(HomePage);