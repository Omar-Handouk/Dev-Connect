import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    ACCOUNT_DELETED,
    GET_REPOS,
    NO_REPOS
} from '../actions/types';

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    isLoading: true,
    error: {}
};

const profileReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                isLoading: false
            };
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                isLoading: false
            };
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                profile: null,
                repos: [],
                isLoading: false
            };
        case ACCOUNT_DELETED:
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                isLoading: true,
                repos: [],
            }
        case GET_REPOS:
            return {
                ...state,
                repos: payload,
                isLoading: false
            };
        case NO_REPOS:
            return {
                ...state,
                repos: []
            };
        default:
            return state;
    }
};

export default profileReducer;