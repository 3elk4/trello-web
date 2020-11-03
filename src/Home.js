import React from "react";
import Fetch from "./Board/Fetch";
import { Redirect } from "react-router-dom";

const Home = (props) => {
  if (props.token === null) {
    return <Redirect to="/login" />;
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
