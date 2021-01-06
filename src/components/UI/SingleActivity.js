import React from "react";

export default class SingleActivity extends React.Component {
  render() {
    return (
      <div className="mb-4 d-flex flex-column">
        <div dangerouslySetInnerHTML={{ __html: this.props.description }}></div>
        <div
          style={{ fontSize: "small" }}
          className="text-dark font-weight-lighter"
        >
          <b>{new Date(this.props.date).toLocaleString("en-US")}</b>
        </div>
      </div>
    );
  }
}
