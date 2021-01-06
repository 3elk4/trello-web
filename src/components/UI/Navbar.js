import React from "react";
import home_icon from "../../assets/home_icon.png";

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark fixed-top shadow text-white py-0">
      <a className="navbar-brand mr-auto" href="/">
        <img
          className="img-fluid"
          src={home_icon}
          alt="Home page"
          style={{ maxHeight: "70px" }}
        />
      </a>
      <div className="navbar-right py-1">
        <div className="d-inline-flex align-items-center">
          {props.isLogged ? (
            <>
              <div>
                Welcome,{" "}
                <a href="/user" style={{ color: "silver" }}>
                  {sessionStorage.getItem("username")}
                </a>
                !
              </div>
              <div className="ml-3">
                <button
                  className="btn btn-secondary"
                  onClick={props.handleLogout}
                >
                  Log Out
                </button>
              </div>
            </>
          ) : (
            <>
              <a className="btn btn-info mx-2" href="/login">
                Log in
              </a>
              <a className="btn btn-secondary mx-2" href="/register">
                Sign up
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
