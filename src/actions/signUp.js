
import {SIGN_UP_START, SIGN_UP_SUCCESS, SIGN_UP_FAIL} from "./actionTypes";
import {APIUrls} from '../helpers/urls';
import {getFormBody} from '../helpers/utils';
import {login} from "./auth";

export function registerUser() {
    return {
        type: SIGN_UP_START
    };
}

export function SignUpSuccess(user) {
    return {
        type: SIGN_UP_SUCCESS,
        user: user
    };
}

export function SignUpFailed(errorMessage) {
    return {
        type: SIGN_UP_FAIL,
        error: errorMessage
    };
}



export function signUp(email, name, password, confirm_password) {
    return (

        (dispatch) => {

            dispatch(registerUser());  /* Note: here we are dispatching 2 actions. startLogin first and then making the API call for Login action */

            const url = APIUrls.signup();
            /*console.log("Signup Params: ", url + '&' + getFormBody({email, name, password, confirm_password}));*/
            fetch(url, {
                method: 'POST',
                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded',
                },
                body: getFormBody({email, name, password, confirm_password})
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Data: ', data);
                    if(data.success) {
                        // dispatch action to save user
                        dispatch(SignUpSuccess(data.data.user));
                        dispatch(login(email, password));  // Login the user automatically just after Sign Up
                        return;
                    }
                    dispatch(SignUpFailed(data.message));
                })
        }

    );
}