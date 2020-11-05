import React from "react";
import Fetch from "./Board/Fetch";
import { Redirect } from "react-router-dom";
import * as Constants from "./Constants"

const Home = (props) => {
  if (props.token === null) {
    return <Redirect to={Constants.LOGIN_URL} />;
  } else {
    return (
      <div className="border shadow rounded p-4">
        <h2>Your boards:</h2>
        <Fetch userToken={props.token} />
        <button className="btn btn-dark mt-2" onClick={props.handleLogout}>
          Log Out
        </button>
      </div>
    );
  }
};

export default Home;
