import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signUp} from "../actions/signUp";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            password: '',
            confirm_password: '',
            validationError: false,
            validationMsg: ''
        };
    }


    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value
        });
    }

    handleNameChange = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value,
        });
    };


    handleConfirmPasswordChange = (e) => {
        this.setState({
            confirm_password: e.target.value,
            validationError: false,
            validationMsg: ''
        });
    };

    handlePasswordMatchValidate = (e) => {
        if(this.state.password !== this.state.confirm_password) {
            this.setState({
                validationError: true,
                validationMsg: "Passwords doesn't match. Please try again.."
            });
            return true;
        } else {
            this.setState({
                validationError: false,
                validationMsg: ''
            });
            return false;
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        if (this.handlePasswordMatchValidate(e) === true) {
           return;
        }

        console.log('this.state: ', this.state);
        const {email, name, password, confirm_password} = this.state;
        if (email && name && password && confirm_password) {
           this.props.dispatch(signUp(email, name, password, confirm_password));
        }
    }

    render() {

        const {error, inProgress} = this.props.auth;
        const {validationError, validationMsg} = this.state;
        return (
            <form className="login-form">
                <span className="login-signup-header">Sign Up</span>
                {error && <div className="alert error-dailog">{error}</div>}
                {validationError && <div className="alert error-dailog">{validationMsg}</div>}
                <div className="field">
                    <input type="email" placeholder="Email" required
                           onChange={this.handleEmailChange} value={this.state.email}
                    />
                </div>
                <div className="field">
                    <input type="text" placeholder="Name" required
                           onChange={this.handleNameChange} value={this.state.name}
                    />
                </div>
                <div className="field">
                    <input type="password" placeholder="Password" required
                           onChange={this.handlePasswordChange} value={this.state.password}
                    />
                    {/* onChange={(e) => this.handleInputChange('email', e.target.value)}
                        Note: We can pass the arrow function in case want to pass 2 params in event handler */}
                </div>
                <div className="field">
                    <input type="password" placeholder="Confirm Password" required
                           onChange={this.handleConfirmPasswordChange} value={this.state.confirm_password}
                    />
                </div>
                <div className="field">
                    {inProgress ? (<button onClick={this.handleFormSubmit} disabled={inProgress}>
                        Processing...
                    </button>) : (<button onClick={this.handleFormSubmit} disabled={(inProgress || validationError)}>
                        Register
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

export default connect(mapStateToProps)(SignUp);

