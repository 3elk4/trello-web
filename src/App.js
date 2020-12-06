import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/MainContent/Home";
import Login from "./components/MainContent/Login";
import Register from "./components/MainContent/Register";
import * as Constants from "./Constants";
import * as Helpers from "./Helpers";
import BoardView from "./components/Board/BoardView";
import Navbar from "./components/UI/Navbar";

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
        <Navbar />
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
