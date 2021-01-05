import React from "react";
import { Redirect } from "react-router";
import * as Helpers from "../../Helpers";
import * as Constants from "../../Constants";
import MyToast from "../UI/MyToast";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.initialstate = {
      email: "",
      username: "",
      password: "",
      password_confirm: "",
      error_message: "",
    };
    this.state = {
      ...this.initialstate,
      registered: false,
    };
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
    const email = this.state.email;
    if (
      username !== "" &&
      username != null &&
      password !== "" &&
      password != null &&
      email != null &&
      email !== ""
    ) {
      if (password === password_confirm) {
        const pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (pattern.test(password)) {
          if (await Helpers.createUser(email, username, password)) {
            this.setState({
              registered: true,
            });
            this.setState(this.initialstate);
          } else {
            this.setState({
              error_message:
                "Cannot register user. Maybe such user already exists?",
            });
          }
        } else {
          this.setState({
            error_message:
              "Password must have at least 8 characters, minimum 1 digit, 1 special character, 1 lower letter and 1 capital letter.",
          });
        }
      } else {
        this.setState({
          error_message: "Passwords must be the same.",
        });
      }
    } else {
      console.log("error");
      this.setState({
        error_message:
          "Incorrect data. Email, username and password cannot be empty.",
      });
    }
  };

  render() {
    const { email, username, password, password_confirm } = this.state;

    return (
      <>
        <MyToast
          show={this.state.registered}
          handleClose={() => this.setState({ registered: false })}
          bgColor="#8BC34A"
          message="User registered succesfully."
        />
        <div className="d-flex flex-column justify-content-center align-items-center m-auto text-center col-sm-3 p-1 shadow-lg rounded bg-dark text-white">
          <form onSubmit={this.handleSubmit}>
            <h3 className="mb-4 mt-3">Register page</h3>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Email"
                type="email"
                name="email"
                value={email}
                onChange={this.handleChange}
              />
            </div>
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
            <button className="btn btn-info" placeholder="Submit" type="submit">
              Sign up
            </button>
          </form>
          <div className="row text-danger mt-2 mb-4 px-2">
            {this.state.error_message}
          </div>
        </div>
      </>
    );
  }
}

export default Register;
