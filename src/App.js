import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import * as Constants from "./Constants";
import * as Helpers from "./Helpers";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  async componentDidMount() {
    if (await Helpers.isLogged(sessionStorage.getItem("authToken"))) {
      this.setState({ isLogged: true });
    } else {
      sessionStorage.removeItem("authToken");
      this.setState({ isLogged: false });
    }
  }

  handleLogin = (data) => {
    sessionStorage.setItem("authToken", data.token);
    this.setState({ isLoggedIn: true });
  };

  handleLogout = () => {
    sessionStorage.removeItem("authToken");
    this.setState({ isLoggedIn: false });
  };

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              component={() => <Home handleLogout={this.handleLogout} />}
            />
            <Route exact path={Constants.LOGIN_URL}>
              {this.state.isLoggedIn ? (
                <Redirect to="/" />
              ) : (
                <Login handleLogin={this.handleLogin} />
              )}
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
