import axios from 'axios';
import api from '../utils/api';
import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    ACCOUNT_DELETED,
    GET_REPOS,
    NO_REPOS
} from './types';

import { logout } from './authAction';
import { setAlertWithTimeout } from './alertAction';

export const getProfile = data => ({
    type: GET_PROFILE,
    payload: data
});

export const getProfiles = data => ({
    type: GET_PROFILES,
    payload: data
});

export const profileError = data => ({
    type: PROFILE_ERROR,
    payload: data
});

export const updateProfile = data => ({
    type: UPDATE_PROFILE,
    payload: data
});

export const clearProfile = () => ({
    type: CLEAR_PROFILE
});

export const accountDeleted = () => ({
    type: ACCOUNT_DELETED
});

export const getRepos = data => ({
    type: GET_REPOS,
    payload: data
});

export const noRepos = () => ({
    type: NO_REPOS
});

export const getProfilesAsync = () => async (dispatch) => {
    dispatch(clearProfile());

    const config = {
        url: '/profiles',
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await api.request(config);
        
        dispatch(getProfiles(res.data));
    } catch (err) {
        dispatch(profileError({ msg: err.response.statusText, status: err.response.status }));
    }
};

export const getProfileById = userId => async (dispatch) => {
    const config = {
        url: `/profiles/${userId}`,
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await api.request(config);

        dispatch(getProfile(res.data));
    } catch (err) {
        dispatch(profileError({
            msg: err.response.statusText,
            status: err.response.status
        }));
    }
};

export const getCurrentProfile = () => async (dispatch, getState) => {
    if (getState().auth.user) {
        const userId = getState().auth.user.id;
        dispatch(getProfileById(userId));
    }
};

export const getReposAsync = username => async (dispatch) => {
    const config = {
        url: `/users/${username}/repos`,
        baseURL: " https://api.github.com/",
        method: 'GET',
        headers: {
            Accept: "application/json"
        },
        params: {
            type: "all",
            sort: "created",
            direction: "desc",
            per_page: 5,
            page: 1
        }
    };

    try {
        const res = await axios(config);

        dispatch(getRepos(res.data));
    } catch (err) {
        dispatch(noRepos());
    }
};

export const createProfile = (formData, history, edit = false) => async (dispatch) => {
    const config = {
        url: '/profiles',
        method: 'POST',
        data: formData,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
    
    try {
        const res = await api.request(config);

        dispatch(getProfile(res.data));
        dispatch(setAlertWithTimeout(edit ? 'Profile updated!' : 'Profile created', 'success'));

        if (!edit) {
            history.push('/dashboard');
        }

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlertWithTimeout(error.msg, 'danger')));
        }

        dispatch(profileError({ msg: err.response.statusText, status: err.response.status }));
    }
};

export const addExperience = (formData, history) => async (dispatch, getState) => {
    // NOTE: Profile should not be null here
    const experience = getState().profile.profile.experience;
    experience.push(formData);

    const userId = getState().auth.user.id;

    const config = {
        url: `/profiles/${userId}`,
        method: 'PUT',
        data: { experience },
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    try {
        const res = await api.request(config);

        dispatch(updateProfile(res.data));
        dispatch(setAlertWithTimeout('Experience Added', 'success'));

        history.push('/dashboard');
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlertWithTimeout(error.msg, 'danger')));
        }

        dispatch(profileError({ msg: err.response.statusText, status: err.response.status }));
    }
};

export const deleteExperience = experienceId => async (dispatch, getState) => {
    // NOTE: Profile should not be null here
    let experience = getState().profile.profile.experience;
    experience = experience.filter(e => e._id !== experienceId);

    const userId = getState().auth.user.id;

    const config = {
        url: `/profiles/${userId}`,
        method: 'PUT',
        data: { experience },
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    try {
        const res = await api.request(config);

        dispatch(updateProfile(res.data));
        dispatch(setAlertWithTimeout('Experience Deleted', 'success'));

    } catch (err) {
        dispatch(profileError({ msg: err.response.statusText, status: err.response.status }));
    }
};

export const addEducation = (formData, history) => async (dispatch, getState) => {
    // NOTE: Profile should not be null here
    const education = getState().profile.profile.education;
    education.push(formData);

    const userId = getState().auth.user.id;

    const config = {
        url: `/profiles/${userId}`,
        method: 'PUT',
        data: { education },
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    try {
        const res = await api.request(config);

        dispatch(updateProfile(res.data));
        dispatch(setAlertWithTimeout('Education Added', 'success'));

        history.push('/dashboard');
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlertWithTimeout(error.msg, 'danger')));
        }

        dispatch(profileError({ msg: err.response.statusText, status: err.response.status }));
    }
};

export const deleteEducation = educationId => async (dispatch, getState) => {
    // NOTE: Profile should not be null here
    let education = getState().profile.profile.education;
    education = education.filter(e => e._id !== educationId);

    const userId = getState().auth.user.id;

    const config = {
        url: `/profiles/${userId}`,
        method: 'PUT',
        data: { education },
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    try {
        const res = await api.request(config);

        dispatch(updateProfile(res.data));
        dispatch(setAlertWithTimeout('Education deleted', 'success'));
    } catch (err) {
        dispatch(profileError({ msg: err.response.statusText, status: err.response.status }));
    }
};

export const deleteAccount = () => async (dispatch, getState) => {
    if (window.confirm('This action can not be undone, are you sure you want to procced?')) {
        const userId = getState().auth.user.id;

        const config = {
            url: `/profiles/${userId}`,
            method: 'DELETE',
            headers: {
                'Accept': 'application/json'
            }
        };

        try {
            await api.request(config);

            dispatch(clearProfile());
            dispatch(accountDeleted());
            dispatch(logout());
            dispatch(setAlertWithTimeout('Account deleted successfully', 'success'));
        } catch (err) {
            dispatch(profileError({ msg: err.response.statusText, status: err.response.status }));
        }
    }
};