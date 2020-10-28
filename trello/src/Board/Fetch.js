import React from "react";
import Board from "./Board";
import Create from "./Create";

class Fetch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: [],
    };
    this.createBoardEndpoint = "/create_board";
    this.fetchBoardEndpoint = "/index";
    this.deleteBoardEndpoint = "/delete_board";
  }

  createBoard = (params) => {
    let requestOps = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: this.props.userToken,
      },
      body: JSON.stringify(params),
    };

    fetch(this.createBoardEndpoint, requestOps)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.refreshBoards();
      });
  };

  deleteBoard = (id) => {
    const boardId = id;
    const requestOps = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.props.userToken,
      },
      body: JSON.stringify({
        id: boardId,
      }),
    };
    fetch(this.deleteBoardEndpoint, requestOps)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.refreshBoards();
      });
  };

  refreshBoards = () => {
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
              id={boardInfo.id}
              boardname={boardInfo.name}
              is_public={boardInfo.is_public}
              deleteBoard={this.deleteBoard}
            />
          );
        }
        this.setState({ boards: boardsArray });
      })
      .catch((error) => console.log(error));
  };

  componentDidMount = () => {
    this.refreshBoards();
  };

  render() {
    return (
      <div>
        <div className="row">{this.state.boards}</div>
        <Create
          handleConfirm={this.createBoard}
          refreshBoards={this.refreshBoards}
          userToken={this.props.userToken}
        ></Create>
      </div>
    );
  }
}

export default Fetch;
