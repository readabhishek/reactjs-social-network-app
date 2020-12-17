import {combineReducers} from "redux";
import posts from "./posts";
import auth from './auth'
import signUp from "./signUp";


export default combineReducers({
    posts,
    auth,
    signUp
});