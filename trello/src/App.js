import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("authToken"),
      isLoggedIn: localStorage.getItem("authToken") !== null ? true : false,
    };
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
      <div>
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
            <Route exact path="/login">
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
