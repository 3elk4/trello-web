import React from "react";

class ArchivedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: props.details,
    };
  }

  render() {
    return (
      <>
        <div className="card-header p-1">List</div>
        <div className="card-body p-1">{this.state.details.name}</div>
        <div className="card-footer p-1">HEHE PRZYCISKI HERE</div>
      </>
    );
  }
}

export default ArchivedList;
