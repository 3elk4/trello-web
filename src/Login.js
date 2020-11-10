import React from "react";
import { Redirect } from "react-router";
import * as Constants from "./Constants";
import * as Helpers from "./Helpers";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
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
    const { username, password } = this.state;
    let user = {
      username: username,
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
          this.props.handleLogin(data);
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
      this.setState({ isLogged: true });
    } else {
      sessionStorage.removeItem("authToken");
      this.setState({ isLogged: false });
    }
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className="d-flex flex-wrap justify-content-center align-content-center m-auto text-center border col-sm-3 p-1 shadow-lg rounded">
        {this.state.isLogged ? <Redirect to="/" /> : null}
        <form onSubmit={this.handleSubmit}>
          <h3 className="mb-4">Login page</h3>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Username"
              type="text"
              name="username"
              value={username}
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
      </div>
    );
  }
}

export default Login;
