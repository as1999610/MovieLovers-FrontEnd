import React from 'react';
import {Route} from "react-router-dom";
import HomePage from "./components/pages/HomePage"
import LoginPage from "./components/pages/LoginPage";
import DashboardPage from "./components/pages/DashboardPage";
import UserRoute from './components/routes/UserRoute'
import GuestRoute from './components/routes/GuestRoute'
import PropTypes from 'prop-types';
import GuestRoute from './components/pages/SignupPage'
import ConfirmationPage from './components/pages/ConfirmationPage'
import ForgotPasswordPage from './components/pages/ForgotPasswordPage'
import ResetPasswordPage from './components/pages/ResetPasswordPage'
import TopNavigation from './components/navigation/TopNavigation';
import {connect} from 'react-redux';
import NewMoviePage from './components/pages/NewMoviePage';

const app = ({location, isAuthenticated}) => (
    <div classname="ui container">
    {isAuthenticated && <TopNavigation />}
    <Route location={location} path="/" exact component={HomePage} />
    <Route location={location} path="/confirmation/:token" exact component={ConfirmationPage} />
    <GuestRoute location={location} path="/login" exact component={LoginPage} />
    <GuestRoute location={location} path="/signup" exact component={SignupPage} />
    <GuestRoute location={location} path="/forgot_password" exact component={ForgotPasswordPage} />
    <GuestRoute location={location} path="/reset_password/:token" exact component={ResetPasswordPage} />
    <UserRoute location={location} path="/dashboard" exact component={DashboardPage} />
    <UserRoute location={location} path="/moviess/new" exact component={NewMoviePage} />
</div>
);

App.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired,
    isAuthenticated: boolean
};

function stateToProps(state) {
    return {
        isAuthenticated: !!state.user.email
    }
}

export default connect(stateToProps)(app);
