import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/MainContent/Home";
import Login from "./components/MainContent/Login";
import Register from "./components/MainContent/Register";
import * as Constants from "./Constants";
import * as Helpers from "./Helpers";
import BoardView from "./components/Board/BoardView";
import Navbar from "./components/UI/Navbar";
import UserProfile from "./components/MainContent/UserProfile";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      username: "",
      userData: [],
    };
  }

  async componentDidMount() {
    if (await Helpers.isLogged(sessionStorage.getItem("authToken"))) {
      Helpers.getCurrentUserInfo(sessionStorage.getItem("authToken")).then(
        (userData) => {
          sessionStorage.setItem("username", userData.username);
          this.setState({
            isLoggedIn: true,
            userData: userData,
          });
        }
      );
    } else {
      sessionStorage.removeItem("authToken");
      this.setState({ isLoggedIn: false });
    }
  }

  handleLogin = (data, username) => {
    sessionStorage.setItem("authToken", data.token);
    sessionStorage.setItem("username", username);
    this.setState({ isLoggedIn: true, username: username });
  };

  handleLogout = async () => {
    if (await Helpers.logoutUser(sessionStorage.getItem("authToken"))) {
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("username");
      this.setState({ isLoggedIn: false, username: "" });
    }
  };

  render() {
    return (
      <div className="container-fluid mt-5 pt-5">
        <Navbar isLogged={this.state.isLoggedIn} />
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              component={() => <Home handleLogout={this.handleLogout} />}
            />
            <Route exact path={Constants.LOGIN_VIEW_URL}>
              {this.state.isLoggedIn ? (
                <Redirect to="/" />
              ) : (
                <Login handleLogin={this.handleLogin} />
              )}
            </Route>
            <Route exact path="/register" component={() => <Register />} />
            <Route exact path="/board/:boardId" component={BoardView} />
            <Route
              exact
              path="/user"
              component={() => <UserProfile userData={this.state.userData} />}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
