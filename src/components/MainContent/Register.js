import React from "react";
import { Redirect } from "react-router";
import * as Helpers from "../../Helpers";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      password_confirm: "",
      error_message: "",
    };
    this.registered = false;
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const password_confirm = this.state.password_confirm;
    if (
      username !== "" &&
      username != null &&
      password !== "" &&
      password != null &&
      password === password_confirm
    ) {
      if (await Helpers.createUser(username, password)) {
        this.registered = true;
      }
      this.setState({ error_message: "" });
    } else {
      this.setState({
        error_message: "Incorrect data. Username and password cannot be empty.",
      });
    }
  };

  render() {
    const { username, password, password_confirm } = this.state;
    return (
      <div className="d-flex flex-wrap justify-content-center align-content-center m-auto text-center col-sm-3 p-1 shadow-lg rounded bg-dark text-white">
        {this.registered ? <Redirect to="/" /> : null}
        <form onSubmit={this.handleSubmit}>
          <h3 className="mb-4">Register page</h3>
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
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Re-type Password"
              type="password"
              name="password_confirm"
              value={password_confirm}
              onChange={this.handleChange}
            />
          </div>
          <button
            className="btn btn-success"
            placeholder="Submit"
            type="submit"
          >
            Sign up
          </button>
        </form>
        <div className="row text-danger p-3">{this.state.error_message}</div>
      </div>
    );
  }
}

export default Register;
