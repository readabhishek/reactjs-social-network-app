import React, {Component} from 'react';
import {connect} from 'react-redux';

import {clearAuthState, login} from '../actions/auth';
import {Redirect} from "react-router";


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }

    componentWillUnmount() {
        /* Clear any error message after the Component is Unmounted */
        this.props.dispatch(clearAuthState());
    }


    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value
        });
    }

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value,
        });
    };

    handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('this.state: ', this.state);
        const {email, password} = this.state;
        if (email && password) {
            this.props.dispatch(login(email, password));
        }
    }


    render() {
        const {error, inProgress, isLoggedIn} = this.props.auth;

        /* Check if user is already logged-in, if yes then redirect it to homepage, we don't need to show login page */
        if (isLoggedIn) {
            return (
                <Redirect to="/" />
            );
        }

        return (
            <form className="login-form">
                <span className="login-signup-header">Log In</span>
                {error && <div className="alert error-dailog">{error}</div>}
                <div className="field">
                    <input type="email" placeholder="Email" required
                           onChange={this.handleEmailChange} value={this.state.email}
                    />
                </div>
                <div className="field">
                    <input type="password" placeholder="Password" required
                           onChange={this.handlePasswordChange} value={this.state.password}
                    />
                </div>
                <div className="field">
                    {inProgress ? (<button onClick={this.handleFormSubmit} disabled={inProgress}>
                        Logging in...
                    </button>) : (<button onClick={this.handleFormSubmit} disabled={inProgress}>
                        Log In
                    </button>)
                    }

                </div>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps)(Login);
