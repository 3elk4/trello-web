import React from "react";

class LabelBadge extends React.Component {
  render() {
    return (
      <span className="badge badge-pill badge-danger">{this.props.label}</span>
    );
  }
}

export default LabelBadge;
