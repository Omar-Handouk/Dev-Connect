import api from '../utils/api';
import { setAlertWithTimeout } from './alertAction';
import setAuthToken from '../utils/setAuthToken';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGOUT, LOGIN_SUCCESS, LOGIN_FAIL } from "./types";

export const registerSuccess = data => ({
    type: REGISTER_SUCCESS,
    payload: data
});

export const registerFail = data => ({
    type: REGISTER_FAIL,
    payload: data
});

export const loginSuccess = data => ({
    type: LOGIN_SUCCESS,
    payload: data
});

export const loginFail = () => ({
    type: LOGIN_FAIL
});

export const logout = () => ({
    type: LOGOUT
});

export const loadUser = data => ({
    type: USER_LOADED,
    payload: data
});

export const authError = () => ({
    type: AUTH_ERROR
});

export const loadUserAsync = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const config = {
            url: '/auth',
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        };

        const res = await api.request(config);

        dispatch(loadUser(res.data));
    } catch (err) {
        dispatch(authError());
    }
};

export const registerAsync = data => async (dispatch) => {
    const config = {
        url: '/users',
        method: 'POST',
        data,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    try {
        const res = await api.request(config);;

        dispatch(registerSuccess(res.data));
        dispatch(loadUserAsync());
        dispatch(setAlertWithTimeout('Registered successfully', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlertWithTimeout(error.msg, 'danger')));
        }

        // TODO: Set failure payload
        dispatch(registerFail(null));
    }
};

export const loginAsync = data => async (dispatch) => {
    const config = {
        url: '/auth',
        method: 'POST',
        data,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    try {
        const res = await api.request(config);

        dispatch(loginSuccess(res.data));
        dispatch(loadUserAsync());
        dispatch(setAlertWithTimeout('Logged in successfully', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlertWithTimeout(error.msg, 'danger')));
        }

        dispatch(loginFail());
    }
};