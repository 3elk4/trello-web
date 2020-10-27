import React from "react";
import Board from "./Board";

class Fetch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: [],
    };
    this.fetchBoardEndpoint = "/index";
  }

  componentDidMount = () => {
    const requestOps = {
      method: "GET",
      headers: { Authorization: this.props.userToken },
    };
    const boardsArray = [];
    fetch(this.fetchBoardEndpoint, requestOps)
      .then((response) => response.json())
      .then((data) => {
        for (let key in data.tables) {
          const boardInfo = JSON.parse(data.tables[key]);
          boardsArray.push(
            <Board
              key={key}
              boardname={boardInfo.name}
              is_public={boardInfo.is_public}
            />
          );
        }
        this.setState({ boards: boardsArray });
      });
  };

  render() {
    return <div>{this.state.boards}</div>;
  }
}

export default Fetch;
