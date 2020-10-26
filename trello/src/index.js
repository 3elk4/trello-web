import React from 'react';
import ReactDOM from 'react-dom';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      message: null,
    }
  }

  handleInputChange = (event) => {
    const name = event.target.name;

    this.setState({
      [name]: event.target.value,
    });
  }

  handleSubmit = (event) => {
    const requestData = {
      "username": this.state.username,
      "password": this.state.password
    };
    const requestOps = {
      method: 'POST',
      headers: { "content-type": "application/json" },
      body: JSON.stringify(requestData),
    };
    fetch('authenticate', requestOps)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        else {
          return {
            token: "Unauthorized",
          };
        }
      })
      .then(data => {
        this.setState({
          message: "Token: " + data.token,
        });
      });
    event.preventDefault();
  }

  render() {
    return (
      <div className="wrapper">
        <form className="loginForm" method="post" onSubmit={this.handleSubmit}>
          <div className="login">
            <input type="text" placeholder="Login" name="username" onChange={this.handleInputChange} />
          </div>
          <div className="password">
            <input type="password" placeholder="Password" name="password" onChange={this.handleInputChange} />
          </div>
          <input type="submit" value="Zatwierdź" />
        </form>
        <p>{this.state.message}</p>
      </div>
    );
  }
}

ReactDOM.render(
  <LoginForm />,
  document.getElementById('root')
);