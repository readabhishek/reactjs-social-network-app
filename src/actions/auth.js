import {LOGIN_FAIL, LOGIN_START, LOGIN_SUCCESS, AUTHENTICATE_USER, LOG_OUT, CLEAR_AUTH_STATE,} from "./actionTypes";
import {APIUrls} from '../helpers/urls';
import {getFormBody} from '../helpers/utils';

export function startLogin() {
    return {
        type: LOGIN_START
    };
}

export function loginSuccess(user) {
    return {
        type: LOGIN_SUCCESS,
        user: user
    };
}

export function loginFailed(errorMessage) {
    return {
        type: LOGIN_FAIL,
        error: errorMessage
    };
}

export function authenticateUser(user) {
    return {
        type: AUTHENTICATE_USER,
        user
    };
}

export function logoutUser() {
    return {
        type: LOG_OUT
    };
}

export function clearAuthState() {
    return {
        type: CLEAR_AUTH_STATE
    }
}


export function login(email, password) {
    return (

        (dispatch) => {

        dispatch(startLogin());  /* Note: here we are dispatching 2 actions. startLogin first and then making the API call for Login action */

        const url = APIUrls.login();
        fetch(url, {
            method: 'POST',
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded',
            },
            body: getFormBody({email, password})
        })
            .then(response => response.json())
            .then(data => {
                console.log('Data: ', data);
                if(data.success) {
                    // dispatch action to save user
                    localStorage.setItem('token', data.data.token);
                    dispatch(loginSuccess(data.data.user))
                    return;
                }
                dispatch(loginFailed(data.message));
            })
    }

    );
}