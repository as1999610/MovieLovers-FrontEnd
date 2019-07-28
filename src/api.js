import axios from 'axios';

export default {
    user: {
        login: credentials => axios.post('/api/auth', {credentials}).then(res => res.data.user),
        signup: user => axios.post('/api/users', {user}).then(res => res.data.user),
        confirm: token => axios.post('/api/auth/confirmation', {token}).then(res => res.data.user),
        resetPassword: email =>
        axios.post('/api/auth/reset_password_request', {email}),
        confirmToken: token => axios.post('/api/auth/validate_token', {token}),
        resetPassword: data => axios.post('/api/auth/reset_password00', {data})
    },
    movies: {
        fetchAll: () => axios.get('/api/movies').then(res => res.data.movies),
        create: movie => axios.post('/api/movies', {movie}).then(res => res.data.movie)
    }
};