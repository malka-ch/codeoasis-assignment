import React, { Component } from "react";
import { loginService } from "../services/login.service";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoginMode: true, username: "", password: "" };

    // This binding is necessary to make `this` work in the callback
    this.handleSwichModeClick = this.handleSwichModeClick.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignin = this.handleSignin.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  componentDidMount(){
      loginService.logout();
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }
  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }
  handleLogin(e) {
    const user = loginService.login(this.state.username, this.state.password);
    if (user) {
      this.props.history.push("/Home");
    } else {
      alert("user name or password incorrect, please try again");
    }
    e.preventDefault();
  }

  handleSignin(e) {
    const signinSuccess = loginService.signin(
      this.state.username,
      this.state.password
    );

    if (signinSuccess) {
      this.props.history.push("/Home");
    } else {
      alert("username exists, please choose another");
    }
    e.preventDefault();
  }

  handleSwichModeClick(e) {
    this.setState(state => ({
      isLoginMode: !state.isLoginMode
    }));
    e.preventDefault();
  }
  render() {
    const { isLoginMode } = this.state;
    return (
      <div>
        <h1>Login page</h1>
        <form>
          <div className="form-group">
            <label htmlFor="username">Email address</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter username"
              onChange={this.handleUsernameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              onChange={this.handlePasswordChange}
            />
          </div>
          {isLoginMode ? (
            <button
              type="submit"
              onClick={this.handleLogin}
              className="btn btn-primary"
            >
              Login
            </button>
          ) : (
            <button
              type="submit"
              onClick={this.handleSignin}
              className="btn btn-primary"
            >
              Sign in
            </button>
          )}
          <a
            className="link stretched-link"
            onClick={this.handleSwichModeClick}
          >
            {isLoginMode ? <div>Sign in</div> : <div>Login</div>}
          </a>
        </form>
      </div>
    );
  }
}
