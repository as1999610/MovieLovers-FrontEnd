import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import {allMoviesSelector} from '../../reducers/movies';
import AddMovie from '../ctas/AddMovie';
import {fetchMovies} from '../../actions/movies';

class DashboardPage extends React.Component {
    componentDidMount = () => this.onInit(this.props);

    init = (props) => props.fetchMovies();

    rebder() {
        const {isConfirmed, movies} = this.props;
        return (
        <div>
            {!isConfirmed && <ConfirmEmailMessage /> }
            {movies.length === 0 ? <AddMovie /> : <p>You have movies!</p>}
        </div>
        )
    }
}

DashboardPage.propTypes = {
    isConfirmed: PropTypes.bool.isRequired,
    fetchMovies: PropTypes.func.isRequired,
    movies: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired
    }).isRequired).isRequired
};

function stateToProps(state) {
    return {
        isConfirmed: state.user.confirmed,
        movies: allMoviesSelector(state)
    }
}

export default connect(stateToProps, {fetchMovies})(DashboardPage);