import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import * as Constants from "./Constants"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("authToken"),
      isLoggedIn: false,
    };
  }

  isLogged = () => {
    if (this.state.token === null)
      return;
    const requestOps = {
      method: "GET",
      headers: { Authorization: this.state.token },
    };
    fetch(Constants.GET_BOARDS_URL, requestOps)
      .then((response) => {
        if(response.ok) {
          this.setState({isLoggedIn: true});
        } else {
          this.setState({isLoggedIn: false, token: null})
          localStorage.removeItem("authToken");
        }
      })
  }

  componentDidMount = () => {
    this.isLogged()
  }

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      token: data.token,
    });
    localStorage.setItem("authToken", data.token);
  };

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      token: null,
    });
    localStorage.removeItem("authToken");
  };

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              component={() => (
                <Home
                  handleLogout={this.handleLogout}
                  isLoggedIn={this.state.isLoggedIn}
                  token={this.state.token}
                />
              )}
            />
            <Route exact path={Constants.LOGIN_URL}>
              {this.state.isLoggedIn ? (
                <Redirect to="/" />
              ) : (
                <Login
                  handleLogin={this.handleLogin}
                  isLoggedIn={this.state.isLoggedIn}
                />
              )}
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;