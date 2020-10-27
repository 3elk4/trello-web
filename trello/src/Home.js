import React from "react";
import { Link } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (!this.props.isLoggedIn) {
      return (
        <div>
          <Link to="/login">Log In</Link>
        </div>
      );
    } else {
      return (
        <div>
          <h2>You are successful logged</h2>
          <br />
          <br />
          <button onClick={this.props.handleLogout}>Log Out</button>
        </div>
      );
    }
  }
}

export default Home;
