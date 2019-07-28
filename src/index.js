import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import "semantic-ui-css/semantic.min.css";
import App from './App';
import registerServiceWorker from "./registerServiceWorker";
import { createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from "./rootReducer";
import {composeWithDevTools} from 'redux-devtools-extension';
import { userLoggedIn } from './actions/auth';
import decode from 'jwt-decode';
import setAutorizationHeader from '../utils/setAutorizationHeader';

const store = createStore (
    rootReducer, 
    composeWithDevTools(applyMiddleware(thunk))
);

if(localStorage.movieLoversJWT) {
    const payload = decode(localStorage.movieLoversJWT);
    const user = {token: localStorage.movieLoversJWT, email: payload.email, confirmed: payload.confirmed};
    setAutorizationHeader(localStorage.movieLoversJWT);
    store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
    <BrowserRouter>
    <Provider store={store}>
        <Route component={App} />
    </Provider>
    </BrowserRouter>,
    document.getElementById("root")
);
registerServiceWorker();
