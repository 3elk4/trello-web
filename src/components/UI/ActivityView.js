import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export class ActivityView extends React.Component {
  render() {
    return (
      <div
        className="border shadow border-dark text-white px-2 ml-1 h-100"
        style={{
          position: "fixed",
          right: "0px",
          top: "0px",
          background: "#6C757D",
          display: this.props.showActivity ? "block" : "none",
          overflowY: "auto",
          minWidth: "200px",
          maxWidth: "300px",
          zIndex: 99999,
          overflow: "auto",
        }}
      >
        <div className="text-right w-100">
          <button
            className="btn btn-secondary p-1"
            onClick={() => this.props.handleClose()}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        {this.props.activity}
      </div>
    );
  }
}

export default ActivityView;
