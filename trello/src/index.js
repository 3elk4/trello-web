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
      "studentIndex": 215927,
      "firstName": this.state.username,
      "lastName": this.state.password
    };
    const requestOps = {
      method: 'POST',
      headers: { "content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(requestData),
      mode: "cors"
    };
    fetch('//localhost:8080/api/v1/student/add', requestOps)
      .then(response => {
        if (response.ok) {
          console.log("GIT");
        } else {
          console.log("fetch error");
          console.log(requestOps.body);
        }
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