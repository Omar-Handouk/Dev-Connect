import { 
    GET_POSTS,
    ADD_POST,
    GET_POST,
    UPDATE_POST,
    DELETE_POST,
    POST_ERROR,
    UPDATE_LIKES,
    ADD_COMMENT,
    REMOVE_COMMENT } from '../actions/types';

import _ from 'lodash';

const initialState = {
    posts: [],
    post: null,
    isLoading: true,
    error: {}
};

const postReducer = (state = initialState, action) => {
    const { type, payload } = action;
    
    switch (type) {
        case GET_POSTS     : return { ...state, posts: payload, isLoading: false };
        case ADD_POST      : return { ...state, posts: [payload, ...state.posts], isLoading: false };
        case GET_POST      : return { ...state, post: payload, isLoading: false };
        case UPDATE_POST   : return { 
            ...state, 
            posts: _.concat(state.posts.filter(post => post._id !== payload._id), payload),
            post: payload,
            isLoading: false
        };
        case DELETE_POST   : return { ...state, posts: state.posts.filter(post => post._id !== payload), isLoading: false };
        case POST_ERROR    : return { ...state, error: payload, isLoading: false };
        case UPDATE_LIKES  : return { 
            ...state,
            posts: state.posts.map(post => post._id === payload._id ? { ...post, likes: payload.likes } : post),
            isLoading: false
        };
        case ADD_COMMENT   : 
        case REMOVE_COMMENT: return { ...state, post: { ...state.post, comments: payload }, isLoading: false};
        default            : return state;
    }
};

export default postReducer;