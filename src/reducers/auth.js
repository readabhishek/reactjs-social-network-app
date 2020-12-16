import {LOGIN_FAIL, LOGIN_START, LOGIN_SUCCESS} from "../actions/actionTypes";


const initialState = {
    user: {},
    error: null,
    isLoggedIn: false,
    inProgress: false
}


export default function auth(state=initialState, action) {
    switch (action.type) {
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
                error: null
            };

        case LOGIN_FAIL:
            return {
                ...state,
                inProgress: false,
                isLoggedIn: false,
                error: action.error
            };

        default: return state;
    }

}