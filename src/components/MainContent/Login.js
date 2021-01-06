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
      errors: {},
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
          this.props.handleLogin(data.token);
        } else {
          this.setState({ errors: data.error });
        }
      });
  };

  handleErrors = () => {
    return (
      <div className="text-danger">
        <ul className="list-group list-group-flush bg-dark">
          {Object.keys(this.state.errors).map((key, index) => {
            return (
              <li className="list-group-item bg-dark pt-0" key={key}>
                {this.state.errors[key]}
              </li>
            );
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
      <div className="d-flex flex-wrap justify-content-center align-items-center mx-auto text-center col-sm-3 p-1 shadow-lg rounded bg-dark text-white mt-sm-0 mt-5">
        {this.state.isLoggedIn ? <Redirect to="/" /> : null}
        <form onSubmit={this.handleSubmit}>
          <h3 className="mb-4 mt-3">Login page</h3>
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
          <div>{this.handleErrors()}</div>
          <button className="btn btn-info" placeholder="Submit" type="submit">
            Log In
          </button>
        </form>
        <div className="mt-2 mb-4 px-2">
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
