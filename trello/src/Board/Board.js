import React from "react";

class Board extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="border">
        <p>{this.props.boardname}</p>
        <p>{this.props.is_public ? "Public" : "Private"}</p>
      </div>
    );
  }
}

export default Board;
