import React from "react";
import home_icon from "../../assets/home_icon.png";

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-expand navbar-light bg-dark fixed-top shadow text-white">
      <a className="navbar-brand mr-auto" href="/">
        <img src={home_icon} alt="Home page" width="40em" height="40em" />
      </a>
      <div className="navbar-right">
        {props.isLogged ? (
          <span>
            Welcome,{" "}
            <a href="/user" style={{ color: "silver" }}>
              {sessionStorage.getItem("username")}
            </a>
            !
          </span>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
