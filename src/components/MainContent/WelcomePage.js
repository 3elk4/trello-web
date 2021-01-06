import React from "react";
import welcome_image_1 from "../../assets/welcome_image_1.png";
import home_image from "../../assets/welcome_image.png";

export default class WelcomePage extends React.Component {
  render() {
    return (
      <div className="shadow rounded p-4 bg-dark text-white text-center container mt-sm-0 mt-5">
        <div className="row">
          <div className="col">
            <img
              src={home_image}
              className="img-fluid"
              width="250px"
              alt="Application logo"
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="d-flex col-md-6 col-sm-12 text-left align-items-center">
            <h4>
              Application{" "}
              <b>
                <i>DefinitelyNotTrello</i>
              </b>{" "}
              helps organizing and planning tasks. Thanks to boards, lists and
              cards it is not only able to do more tasks but also ordering them
              in accessible, flexible and practical way. Everyone has a chance
              to use this app, both at home and at work or own, original use.
            </h4>
          </div>
          <div className="d-flex col-md-6 col-sm-12 align-items-center">
            <img src={welcome_image_1} className="img-fluid" alt="Welcome" />
          </div>
        </div>
      </div>
    );
  }
}
