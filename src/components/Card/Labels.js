import React from "react";
import LabelBadge from "./LabelBadge";

export default class Labels extends React.Component {
  render() {
    const labels = this.props.labels.map((labelInfo, index) => (
      <LabelBadge key={index} label={labelInfo.name} />
    ));
    return <div>{labels}</div>;
  }
}
