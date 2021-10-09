/*
 * This file is used to for two things:
 * 1- If a JWT token for a user is found in the local storage attach it to axios headers
 * 2- If a JWT token is expired or un-authorized (i.e Token is null or something) remove it from headers and local storage
*/
import api from "./api";

const setAuthToken = token => {
    if (token) {
        api.defaults.headers.common['x-auth-token'] = token;
        localStorage.setItem('token', token);
    } else {
        delete api.defaults.headers.common['x-auth-token'];
        localStorage.removeItem('token');
    }
};

export default setAuthToken;