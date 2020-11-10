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
      <div>
        <p>{this.props.name}</p>
      </div>
    );
  }
}

export default ListView;
