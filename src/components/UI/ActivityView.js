import React from "react";

export class ActivityView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className="border-left border-dark text-white px-2"
        style={{
          background: "#6C757D",
          position: "fixed",
          zIndex: 9999999,
          top: "66px",
          right: 0,
          height: "90%",
          width: "15%",
          display: this.props.showActivity ? "block" : "none",
          overflow: "auto",
          boxShadow: "-8px -5px 10px -8px black",
        }}
      >
        {this.props.activity}
      </div>
    );
  }
}

export default ActivityView;
