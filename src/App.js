import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import * as Constants from "./Constants";
import * as Helpers from "./Helpers";
import BoardView from "./Board/BoardView";
import home_icon from "./assets/home_icon.png";
import Register from "./Register";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  async componentDidMount() {
    if (await Helpers.isLogged(sessionStorage.getItem("authToken"))) {
      this.setState({ isLoggedIn: true });
    } else {
      this.handleLogout();
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
      <div className="container-fluid mt-5 pt-5">
        <nav className="navbar navbar-light bg-dark fixed-top">
          <a className="navbar-brand" href="/">
            <img src={home_icon} alt="Home page" width="40em" height="40em" />
          </a>
        </nav>
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
            <Route exact path="/register" component={() => <Register />} />
            <Route exact path="/board/:boardId" component={BoardView} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
