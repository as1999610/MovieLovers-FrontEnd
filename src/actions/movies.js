import api from '../api';
import {MOVIES_FETCHED, MOVIE_CREATED} from '../types';
import {normalize} from 'normalizr';
import {movieSchema} from '../schemas';

const moviesFetched = (data) => ({
    type: MOVIES_FETCHED,
    data
})

const movieCreated = (data) => ({
    type: MOVIE_CREATED,
    data
})


export const fetchMovies = () => (dispatch) => api.movies.fetchAll().then(movies => dispatch(moviesFetched(normalize(movies, [movieSchema]))))

export const createMovie = (data) => (dispatch) => api.movies.create(data).then(movie => dispatch(movieCreated(normalize(movie, movieSchema))));