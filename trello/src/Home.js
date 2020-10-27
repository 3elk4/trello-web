import React from "react";
import Create from "./Board/Create";
import { Link } from "react-router-dom";

function Home(props) {
  if (!props.isLoggedIn) {
    return (
      <div>
        <Link to="/login">Log In</Link>
      </div>
    );
  } else {
    return (
      <div>
        <h2>You are successfully logged</h2>
        <br />
        <br />
        <button onClick={props.handleLogout}>Log Out</button>
        <Create></Create>
      </div>
    );
  }
}

export default Home;
