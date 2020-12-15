import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import combineReducers from '../reducers';


 /*Re-writing the logger middleware function using short-hand arrow function */
/*const logger = ({dispatch, getState}) => (next) => (action) => {
    console.log("Action Type: ", action.type);
    /!*console.log("STATE LOGGER: ", dispatch);*!/
    next(action);
}*/

let store;

export function configureStore() {
    store= createStore(combineReducers, applyMiddleware(logger, thunk));
    return store;
}