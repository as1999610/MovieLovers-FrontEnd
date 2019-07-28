import {schema} from 'normalizr';

export const movieSchema = new schema.Entity (
    'movies', {}, {idAttribute: "_id"}
);