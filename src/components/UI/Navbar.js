import React from "react";
import home_icon from "../../assets/home_icon.png";

const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-dark fixed-top">
      <a className="navbar-brand" href="/">
        <img src={home_icon} alt="Home page" width="40em" height="40em" />
      </a>
    </nav>
  );
};

export default Navbar;
