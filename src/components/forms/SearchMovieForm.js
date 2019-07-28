import React from 'react';
import {Form, Dropdown} from 'semantic-ui-react';
import axios from 'axios';
import PropTypes from 'prop-types';

class SearchMovieForm extends React.Component {
    state = {
        query: '',
        loading: false,
        options: [],
        movies: {}
    }

    onSearchChange = (e, data) => {
        clearTimeout(this.timer);
        this.setState({
            query: data
        });
        this.timer = setTimeout(this.fetchOptions, 1000);
    }

    onChange = (e, data) => {
        this.setState({query: data.value});
        this.props.onMovieSelect(this.state.movies[data.value]);
    }

    fetchOptions = () => {
        if(!this.state.query) {
            return;
        }
        this.setState({loading: true});
        axios.get(`/api/movies/search?q=${this.state.query}`).then(res => res.data.movies).then(movies => {
            const options = [];
            const moviesHash = {};
            movies.forEach(movie => {
                moviesHash[movie.goodreadsID] = movie;
                options.push({
                    key: movie.goodWatchID, 
                    value: movie.goodWatchID,
                    text: movie.title
                })
            })
            this.setState({loading: false, options, movies: moviesHash});
        });
    };

    render() {
        return (
            <Form>
                <Dropdown search fluid placeholder='Search for a movie by title' value={this.state.query} onSearchChange={this.onSearchChange} options={this.state.options} loading={this.state.loading} onChange={this.onChange}/>
            </Form>
        )
    }
}

SearchMovieForm.propTypes = {
    onMovieSelect: PropTypes.func.isRequired
};

export default SearchMovieForm;