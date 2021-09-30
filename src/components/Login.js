import React, { Component } from "react";
import { clearAuthState, login } from "../actions/auth";
import { connect } from "react-redux";
import { Redirect } from "react-router";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handelFormSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    if (email && password) {
      this.props.dispatch(login(email, password));
    }
  };

  render() {
    const { error, inProgress, isLoggedIn } = this.props.auth;
    const { from } = this.props.location.state || {from : {pathname: "/"}};

    if (isLoggedIn) {
      return <Redirect to={from} />;
    }
    return (
      <form className="login-form">
        <span className="login-signup-header">Log In</span>
        {error && <div className="alert error-dialog">{error}</div>}
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            required
            onChange={this.handleEmailChange}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Password"
            required
            onChange={this.handlePasswordChange}
          />
        </div>
        <div className="field">
          {inProgress ? (
            <button onClick={this.handelFormSubmit} disabled={inProgress}>
              Logging in....
            </button>
          ) : (
            <button onClick={this.handelFormSubmit} disabled={inProgress}>
              Log In
            </button>
          )}
        </div>
      </form>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    auth,
  };
}

export default connect(mapStateToProps)(Login);
