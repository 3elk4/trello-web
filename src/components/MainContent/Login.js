import React from "react";
import { Redirect } from "react-router";
import * as Constants from "../../Constants";
import * as Helpers from "../../Helpers";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: "",
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    let user = {
      email: email,
      password: password,
    };
    let requestOps = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    };

    fetch(Constants.AUTH_URL, requestOps)
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          this.props.handleLogin(data, email);
        } else {
          this.setState({
            errors: data.errors,
          });
        }
      });
  };

  handleErrors = () => {
    return (
      <div>
        <ul>
          {this.state.errors.map((error) => {
            return <li key={error}>{error}</li>;
          })}
        </ul>
      </div>
    );
  };

  async componentDidMount() {
    if (await Helpers.isLogged(sessionStorage.getItem("authToken"))) {
      this.setState({ isLoggedIn: true });
    } else {
      sessionStorage.removeItem("authToken");
      this.setState({ isLoggedIn: false });
    }
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="d-flex flex-wrap justify-content-center align-items-center m-auto text-center col-sm-3 p-1 shadow-lg rounded bg-dark text-white">
        {this.state.isLoggedIn ? <Redirect to="/" /> : null}
        <form onSubmit={this.handleSubmit}>
          <h3 className="mb-4">Login page</h3>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="E-mail"
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
          </div>
          <button
            className="btn btn-success"
            placeholder="Submit"
            type="submit"
          >
            Log In
          </button>
        </form>
        <div>
          If you don't have an account&nbsp;
          <a className="link" href="/register">
            register now
          </a>
          .
        </div>
      </div>
    );
  }
}

export default Login;
