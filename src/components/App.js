import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';

import jwt_decode from "jwt-decode";

import {fetchPosts} from '../actions/posts'
import NavBar from "./NavBar";
import Home from "./Home";
import Page404 from "./Page404";
import Login from './Login';
import SignUp from './SignUp';
import '../index.css';
import {authenticateUser} from "../actions/auth";

/* Creating some dummy components */
/*const SignUp = () => {
    return (<div>SignUp</div>);
}*/


class App extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(fetchPosts());  /* Note: Call the fetchPosts() function, don't just pass the reference */


        /* We are getting the token from localStorage and if token exists (not during first time page load), we'll set it in Store.
        *  This is done because we don't want the user to logged-off after browser refresh. The token/user will be retrieved since
        *  componentDidMount will be called after each refresh/Component load.
        * Note: We are storing the token in the action - auth once the login is successful and API returns the token
        * */
        const token = localStorage.getItem('token');
        if (token) {
            const user = jwt_decode(token);
            console.log(user);
            /*this.props.dispatch(authenticateUser(user));*/   // Can pass complete user object too, or pass just few details as below
            this.props.dispatch(authenticateUser({
                name: user.name,
                _id: user._id,
                email: user.email
            }));
        }
    }


    render() {

        const {posts} = this.props;
        return (

            <Router>           { /* Add this <Router> component so that React understands that this is root route */}
                <div>
                    <NavBar/>
                    {/*<PostsList posts={posts}/>*/}
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/signup">SignUp</Link>
                        </li>
                    </ul>

                    {/* Note: Here we are using render attribute and passing <Home> component with props. This is only to pass Props
                        If we don't have props, we can simply use component attribute as in case of Signup and Login.
                        Now {...props} is nothing but the default props like history and location is passed to components. This is optional.
                    */}
                    <Switch>   {/* Switch is used to make sure that only 1 route matches and is picked, otherwise there can be multiple matches */}
                        <Route exact path="/" render={(props) => <Home {...props} posts={posts}/>}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/signup" component={SignUp}/>
                        <Route component={Page404}/>
                    </Switch>
                </div>
            </Router>

        );
    }

}

App.propTypes = {
    posts: PropTypes.array.isRequired
}

function mapStateToProps(state) {
    return {
        posts: state.posts
    }
}

const ConnectedApp = connect(mapStateToProps)(App);
export default ConnectedApp;
