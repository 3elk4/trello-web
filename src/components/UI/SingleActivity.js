import React from "react";

export default class SingleActivity extends React.Component {
  render() {
    return (
      <div className="border-bottom border-dark mb-2">
        <div className="text-dark">
          <small>{new Date(this.props.date).toLocaleString("en-US")}</small>
        </div>
        <div dangerouslySetInnerHTML={{ __html: this.props.description }}></div>
      </div>
    );
  }
}
