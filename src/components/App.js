import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Link} from 'react-router-dom';
import {Route} from 'react-router-dom';

import {fetchPosts} from '../actions/posts'
import NavBar from "./NavBar";
import PostsList from "./PostsList";

import '../index.css';

/* Creating some dummy components */
const Login=() => {
    return (<div>Login</div>);
}

const SignUp=() => {
    return (<div>SignUp</div>);
}

const Home=() => {
    return (<div>Home</div>);
}




class App extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(fetchPosts());  /* Note: Call the fetchPosts() function, don't just pass the reference */
    }


    render() {

        const {posts} = this.props;
        return (
            <Router>           { /* Add this <Router> component so that React understands that this is root route */ }
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


                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={SignUp} />
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
