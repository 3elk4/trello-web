import React from "react";
import BoardCard from "./BoardCard";
import CreateBoard from "./CreateBoard";
import * as Constants from "../Constants";

class Boards extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      token: sessionStorage.getItem("authToken"),
      boards: [],
    };
  }

  createBoard = (params) => {
    let requestOps = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: this.state.token,
      },
      body: JSON.stringify(params),
    };

    fetch(Constants.CREATE_BOARD_URL, requestOps)
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
        Authorization: this.state.token,
      },
      body: JSON.stringify({
        id: boardId,
      }),
    };
    fetch(Constants.DELETE_BOARD_URL, requestOps)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.refreshBoards();
      });
  };

  archiveBoard = (id) => {
    const boardId = id;
    const requestOps = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.state.token,
      },
      body: JSON.stringify({
        id: boardId,
      }),
    };
    fetch(Constants.ARCHIVE_BOARD_URL, requestOps)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.refreshBoards();
      });
  };

  refreshBoards = () => {
    const requestOps = {
      method: "GET",
      headers: { Authorization: this.state.token },
    };
    const boardsArray = [];
    fetch(Constants.GET_BOARDS_URL, requestOps)
      .then((response) => response.json())
      .then((data) => {
        for (let key in data.boards) {
          const boardDetails = JSON.parse(data.boards[key]);
          boardsArray.push(
            <BoardCard
              key={key}
              boardDetails={boardDetails}
              deleteBoard={this.deleteBoard}
              archiveBoard={this.archiveBoard}
            />
          );
        }
        if (this._isMounted) this.setState({ boards: boardsArray });
      })
      .catch((error) => console.log(error));
  };

  componentDidMount = () => {
    this._isMounted = true;
    this.refreshBoards();
  };

  componentWillUnmount = () => (this._isMounted = false);

  render() {
    return (
      <div>
        <div className="row">{this.state.boards}</div>
        <CreateBoard
          handleConfirm={this.createBoard}
          refreshBoards={this.refreshBoards}
        />
      </div>
    );
  }
}

export default Boards;
