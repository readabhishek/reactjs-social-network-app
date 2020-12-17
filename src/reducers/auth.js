import {
    AUTHENTICATE_USER,
    CLEAR_AUTH_STATE,
    LOG_OUT,
    LOGIN_FAIL,
    LOGIN_START,
    LOGIN_SUCCESS
} from "../actions/actionTypes";


const initialState = {
    user: {},
    error: null,
    isLoggedIn: false,
    inProgress: false
}


export default function auth(state=initialState, action) {
    switch (action.type) {

        case CLEAR_AUTH_STATE:
            return {
                ...state,
                error: null
            };
        case LOGIN_START:
            return {
                ...state,
                inProgress: true
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.user,
                isLoggedIn: true,
                inProgress: false,
                error: null
            };

        case LOGIN_FAIL:
            return {
                ...state,
                inProgress: false,
                isLoggedIn: false,
                error: action.error
            };

        case AUTHENTICATE_USER:
            return {
                ...state,
                user: action.user,
                isLoggedIn: true
            }

        case LOG_OUT:
            return {
                ...state,
                user: {},
                isLoggedIn: false
            }

        default: return state;
    }

}