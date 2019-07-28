import React from 'react';
import SearchMovieForm from '../forms/SearchMovieForm';
import {Segment} from 'semantic-ui-react';
import MovieForm from '../forms/MovieForm';
import axios from 'axios';
import PropTyeps from 'prop-types';
import {connect} from 'react-redux';
import {createMovie} from '../../actions/movies';

class NewMoviePage extends React.Component {
    state = {
        movie: null
    };

    onMovieSelect = movie => {
        this.setState({movie});
        axios.get(`/api/movies/fetchDuration?goodWatchId=${movie.goodWatchId}`).then(res => res.data.duration).then(pages => this.setState({movie: {...movie, pages}}));
    };
    addMovie = (movie) => this.props.createMovie(movie).then(() => this.props.history.push('/dashboard'));

    render() {
        return (
            <Segment>
                <h1>Add a new movie</h1>
                <SearchMovieForm onMovieSelect={this.onMovieSelect} />

                {this.state.movie && <MovieForm submit={this.addMovie} movie={this.state.movie} />}
            </Segment>
        )
    }
}

NewMoviePage.propTypes = {
    createMovie: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
}

export default connect(null, {createMovie})(NewMoviePage);