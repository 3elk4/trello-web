import React from "react";
import * as Helpers from "../Helpers";

class ListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: sessionStorage.getItem("authToken"),
    };
  }

  render() {
    return (
      <div className="col-sm-3 p-1 mb-4 d-flex">
        <div className="card text-center bg-secondary text-white rounded-top w-100">
          <div className="card-header">{this.props.name}</div>
          <div className="card-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </div>
        </div>
      </div>
    );
  }
}

export default ListView;
