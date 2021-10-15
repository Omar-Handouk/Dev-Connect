import {
    GET_POSTS,
    ADD_POST,
    GET_POST,
    UPDATE_POST,
    DELETE_POST,
    POST_ERROR,
    UPDATE_LIKES,
    ADD_COMMENT,
    REMOVE_COMMENT
} from './types';

import api from '../utils/api';
import { v4 as uuidv4 } from 'uuid';
import { setAlertWithTimeout } from './alertAction';

const config = {
    url: '',
    method: '',
    data: null,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

export const getPosts = (posts) => ({
    type: GET_POSTS,
    payload: posts
});

export const addPost = (post) => ({
    type: ADD_POST,
    payload: post
});

export const getPost = (post) => ({
    type: GET_POST,
    payload: post
});

export const updatePost = (post) => ({
    type: UPDATE_POST,
    payload: post
});

export const deletePost = (postId) => ({
    type: DELETE_POST,
    payload: postId
});

export const postError = (error) => ({
    type: POST_ERROR,
    payload: error
});

export const updateLikes = (data) => ({ // NOTE: data = { _id, likes }
    type: UPDATE_LIKES,
    payload: data
});

export const addComment = (comments) => ({
    type: ADD_COMMENT,
    payload: comments
});

export const removeComment = (comments) => ({
    type: REMOVE_COMMENT,
    payload: comments
});

export const getPostsAsync = () => async (dispatch) => {
    config.url = '/posts';
    config.method = 'GET';
    delete config.data;

    try {
        const res = await api.request(config);

        dispatch(getPosts(res.data));
    } catch (err) {
        const { statusText, status } = err.response;

        dispatch(postError({ msg: statusText, status }));
    }
};

export const addPostAsync = (postText) => async (dispatch) => {
    config.url = '/posts';
    config.method = 'POST';
    config.data = {
        title: uuidv4(),
        body: postText
    };

    try {
        const res = await api.request(config);

        dispatch(addPost(res.data));
        dispatch(setAlertWithTimeout('Post created successfully', 'success'));
    } catch (err) {
        const { statusText, status } = err.response;

        dispatch(postError({ msg: statusText, status }));
    }
};

export const getPostAsync = (postId) => async (dispatch) => {
    config.url = `/posts/${postId}`;
    config.method = 'GET';
    delete config.data;

    try {
        const res = await api.request(config);

        dispatch(getPost(res.data));
    } catch (err) {
        const { statusText, status } = err.response;

        dispatch(postError({ msg: statusText, status }));
    }
};

export const updatePostAsync = (postId, postData) => async (dispatch) => {
    config.url = `/posts/${postId}`;
    config.method = 'PUT';
    config.data = postData;

    try {
        const res = await api.request(config);

        dispatch(updatePost(res.data));
        dispatch(setAlertWithTimeout('Post updated successfully', 'success'));
    } catch (err) {
        const { statusText, status } = err.response;

        dispatch(postError({ msg: statusText, status }));
    }
};

export const deletePostAsync = (postId) => async (dispatch) => {
    config.url = `/posts/${postId}`;
    config.method = 'DELETE';
    delete config.data;
    
    try {
        const res = await api.request(config);

        dispatch(deletePost(res.data._id));
        dispatch(setAlertWithTimeout('Post deleted successfully', 'success'));
    } catch (err) {
        const { statusText, status } = err.response;

        dispatch(postError({ msg: statusText, status }));
    }
};

export const updateLikesAsync = (postId, like = true) => async (dispatch) => {
    config.url = `/posts/${postId}/${like ? 'like' : 'unlike'}`;
    config.method = 'PUT';
    delete config.data;

    try {
        const res = await api.request(config);

        dispatch(updateLikes({ _id: postId, likes: res.data}));
    } catch (err) {
        const { statusText, status } = err.response;

        dispatch(postError({ msg: statusText, status }));
    }
};

export const addCommentAsync = (postId, commentData) => async (dispatch) => {
    config.url = `/posts/${postId}/comment`;
    config.method = 'POST';
    config.data = commentData;

    try {
        const res = await api.request(config);

        dispatch(addComment(res.data));
        dispatch(setAlertWithTimeout('Comment added successfully', 'success'));
    } catch (err) {
        const { statusText, status } = err.response;

        dispatch(postError({ msg: statusText, status }));
    }
};

export const removeCommentAsync = (postId, commentId) => async (dispatch) => {
    config.url = `/posts/${postId}/comment/${commentId}`;
    config.method = 'DELETE';
    delete config.data;

    try {
        const res = await api.request(config);

        dispatch(removeComment(res.data));
        dispatch(setAlertWithTimeout('Comment deleted successfully', 'success'));
    } catch (err) {
        const { statusText, status } = err.response;

        dispatch(postError({ msg: statusText, status }));
    }
};