import {createSelector} from 'reselect';
import {MOVIES_FETCHED, MOVIE_CREATED} from '../types';

export default function movies(state = {}, action = {}) {
    switch(action.type) {
        case MOVIES_FETCHED:
        case MOVIE_CREATED:
            return {...state, ...action.data.entities.movies}
        default: return state;
    }
}

export const moviesSelector = state => state.movies;

export const allMoviesSelector = createSelector(
    moviesSelector, 
    moviesHash => Object.values(moviesHash)
);