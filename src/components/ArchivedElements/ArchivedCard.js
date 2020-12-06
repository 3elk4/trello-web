import React from "react";

class ArchivedCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: props.details,
      boardId: props.boardId,
    };
  }

  render() {
    return (
      <>
        <div className="card-header p-1">Card</div>
        <div className="card-body p-1">{this.state.details.name}</div>
        <div className="card-footer p-1">HEHE PRZYCISKI HERE</div>
      </>
    );
  }
}

export default ArchivedCard;
