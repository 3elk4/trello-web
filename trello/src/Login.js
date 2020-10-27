import React from "react";

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

    fetch("authenticate", requestOps)
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

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <h1>Log In</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Username"
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <button placeholder="Submit" type="submit">
            Log In
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
