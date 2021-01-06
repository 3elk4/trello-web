import React from "react";
import Boards from "../MainContent/Boards";
import WelcomePage from "../MainContent/WelcomePage";

const Home = (props) => {
  if (sessionStorage.getItem("authToken") === null) {
    // return <Redirect to={Constants.LOGIN_VIEW_URL} />;
    return <WelcomePage />;
  } else {
    return (
      <div className="shadow rounded p-4 mt-sm-0 mt-5 bg-dark text-white">
        <h2 className="mb-5">Your boards:</h2>
        <Boards />
      </div>
    );
  }
};

export default Home;
