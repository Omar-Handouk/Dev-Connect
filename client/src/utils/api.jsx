/*
 * What this file does is create a request instance
 * with certain configuration that is used for every
 * request to the backend, it also hold a response
 * INTERCEPTOR to check if a valid response in range 2xx
 * is found, if something out of this range if found
 * a dispatch to LOGOUT is done and a promise rejection
 * is then sent
*/

import axios from "axios";

import store from '../store';
import { logout } from '../actions/authAction';
import { backendURL } from '../config/default';

const config = {
    baseURL: backendURL
};

const api = axios.create(config);

/**
 intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired or user is no longer
 authenticated.
 logout the user if the token has expired
**/

api.interceptors.response.use(res => res, err => {
    if (err.response.status === 401) {
        store.dispatch(logout());
    }

    return Promise.reject(err);
});

export default api;