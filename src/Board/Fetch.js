import React from "react";
import Board from "./Board";
import Create from "./Create";
import * as Constants from "../Constants"

class Fetch extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      boards: [],
    };
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
        Authorization: this.props.userToken,
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
        Authorization: this.props.userToken,
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
  }

  refreshBoards = () => {
    const requestOps = {
      method: "GET",
      headers: { Authorization: this.props.userToken },
    };
    const boardsArray = [];
    fetch(Constants.GET_BOARDS_URL, requestOps)
      .then((response) => response.json())
      .then((data) => {
        for (let key in data.boards) {
          const boardInfo = JSON.parse(data.boards[key]);
          boardsArray.push(
            <Board
              key={key}
              id={boardInfo.id}
              boardname={boardInfo.name}
              is_public={boardInfo.is_public}
              deleteBoard={this.deleteBoard}
              archiveBoard={this.archiveBoard}
              archiveDate={boardInfo.archiving_date}
            />
          );
        }
        if (this._isMounted)
          this.setState({ boards: boardsArray });
      })
      .catch((error) => console.log(error));
  };

  componentDidMount = () => {
    this._isMounted = true;
    this.refreshBoards();
  };

  componentWillUnmount = () => this._isMounted = false;
  

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
