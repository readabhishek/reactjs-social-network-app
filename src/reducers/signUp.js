import {SIGN_UP_START, SIGN_UP_SUCCESS, SIGN_UP_FAIL} from "../actions/actionTypes";


const initialState = {
    user: {},
    error: null,
    inProgress: false
}


export default function signUp(state=initialState, action) {
    switch (action.type) {
        case SIGN_UP_START:
            return {
                ...state,
                inProgress: true
            };

        case SIGN_UP_SUCCESS:
            return {
                ...state,
                user: action.user,
                error: null
            };

        case SIGN_UP_FAIL:
            return {
                ...state,
                inProgress: false,
                error: action.error
            };

        default: return state;
    }

}