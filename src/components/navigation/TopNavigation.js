import React from 'react';
import {Menu, Dropdown, Image} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import gravatarUrl from 'gravatar-url';
import * as actions from '../../actions/auth';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { allMoviesSelector } from '../../reducers/movies';

const TopNavigation = ({user, logout, hasMovies}) => (
    <Menu secondary pointing>
        <Menu.Item as={Link} to='/dashboard'>Dashboard</Menu.Item>
        {hasMovies && <Menu.Item as={Link} to='/books/new'>Add a Movie</Menu.Item>}
        <Menu.Menu position='right'>
            <Dropdown trigger={<Image avatar src={gravatarUrl(user.email)}/>}>
                <Dropdown.Menu>
                <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Menu.Menu>
    </Menu>
);

TopNavigation.propTypes = {
    user: PropTypes.shape({
        email: PropTypes.string.isRequired
    }).isRequired,
    hasMovies: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
};

function stateToProps(state) {
    return {
        user: state.user,
        hasMovies: allMoviesSelector(state).length > 0
    }
}

export default connect(stateToProps, {logout: actions.logout})(TopNavigation);