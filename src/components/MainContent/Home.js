import React from "react";
import Boards from "../MainContent/Boards";
import WelcomePage from "../MainContent/WelcomePage";
import { Redirect } from "react-router-dom";
import * as Constants from "../../Constants";

const Home = (props) => {
  if (sessionStorage.getItem("authToken") === null) {
    // return <Redirect to={Constants.LOGIN_VIEW_URL} />;
    return <WelcomePage />;
  } else {
    return (
      <div className="shadow rounded p-4 bg-dark text-white">
        <h2 className="mb-5">Your boards:</h2>
        <Boards />
      </div>
    );
  }
};

export default Home;
