import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT,
    LOGIN_SUCCESS,
    LOGIN_FAIL } from "../actions/types";

const initialState = {
    token: localStorage.getItem('token'),
    user: null,
    isAuthenticated: false,
    isLoading: true
};

const authReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                user: payload,
                isAuthenticated: true,
                isLoading: false
            };
        
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.jwt);
            return {
                ...state,
                token: payload.jwt,
                isAuthenticated: true,
                isLoading: false
            };

        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
            localStorage.removeItem('token');

            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            };
        
        default: return state;
    }
};

export default authReducer;