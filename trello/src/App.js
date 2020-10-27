import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      token: {},
    };
  }

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      token: data.token,
    });
  };

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      token: {},
    });
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
