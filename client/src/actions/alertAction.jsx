import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alertType) => ({
    type: SET_ALERT,
    payload: {
        id: uuidv4(),
        msg,
        alertType
    }
});

export const removeAlert = id => ({
    type: REMOVE_ALERT,
    payload: id
});

export const setAlertWithTimeout = (msg, alertType, timeout = 3000) => async (dispatch, getState)=> {
    dispatch(setAlert(msg, alertType));

    const { alerts } = await getState();

    setTimeout(() => alerts.forEach(alert => dispatch(removeAlert(alert.id))) , timeout);
};