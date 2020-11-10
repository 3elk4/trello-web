import React from "react";
import Boards from "./Board/Boards";
import { Redirect } from "react-router-dom";
import * as Constants from "./Constants";

const Home = (props) => {
  if (sessionStorage.getItem("authToken") === null) {
    return <Redirect to={Constants.LOGIN_URL} />;
  } else {
    return (
      <div className="border shadow rounded p-4 mt-5">
        <h2>Your boards:</h2>
        <Boards />
        <button className="btn btn-dark mt-2" onClick={props.handleLogout}>
          Log Out
        </button>
      </div>
    );
  }
};

export default Home;
