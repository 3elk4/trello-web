import React from "react";
import Boards from "../MainContent/Boards";
import { Redirect } from "react-router-dom";
import * as Constants from "../../Constants";

const Home = (props) => {
  if (sessionStorage.getItem("authToken") === null) {
    return <Redirect to={Constants.LOGIN_URL} />;
  } else {
    return (
      <div className="shadow rounded p-4 bg-dark text-white">
        <h2 className="mb-5">Your boards:</h2>
        <Boards />
        <button className="btn btn-secondary mt-2" onClick={props.handleLogout}>
          Log Out
        </button>
      </div>
    );
  }
};

export default Home;
