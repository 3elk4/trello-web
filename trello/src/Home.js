import React from "react";
import Create from "./Board/Create";
import Fetch from "./Board/Fetch";
import { Link } from "react-router-dom";

function Home(props) {
  if (props.token === null) {
    return (
      <div>
        <Link to="/login">Log In</Link>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Your boards:</h2>
        <Fetch userToken={props.token} />
        <br />
        <br />
        <button onClick={props.handleLogout}>Log Out</button>
        <Create userToken={props.token}></Create>
      </div>
    );
  }
}

export default Home;
