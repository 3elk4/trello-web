import React from "react";
import BoardCard from "../Board/BoardCard";
import BoardForm from "../Board/BoardForm";
import * as Helpers from "../../Helpers";

class Boards extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      token: sessionStorage.getItem("authToken"),
      boards: [],
      isModalShow: false,
    };
  }

  createBoard = async (params) => {
    await Helpers.createBoard(this.state.token, params);
    this.refreshBoards();
  };

  deleteBoard = async (id) => {
    await Helpers.deleteBoard(this.state.token, id);
    this.refreshBoards();
  };

  archiveBoard = async (id) => {
    await Helpers.archiveBoard(this.state.token, id);
    this.refreshBoards();
  };

  refreshBoards = async () => {
    const boardsDetails = await Helpers.getUserBoards(this.state.token);
    const boards = [];
    for (let key in boardsDetails) {
      boards.push(
        <BoardCard
          key={key}
          boardDetails={boardsDetails[key]}
          deleteBoard={this.deleteBoard}
          archiveBoard={this.archiveBoard}
        />
      );
    }
    if (this._isMounted) {
      this.setState({ boards: boards });
    }
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
        <button
          className="btn btn-primary"
          onClick={() => this.setState({ isModalShow: true })}
        >
          Create new board
        </button>
        <BoardForm
          isShow={this.state.isModalShow}
          handleClose={() => this.setState({ isModalShow: false })}
          handleConfirm={this.createBoard}
          formTitle="Create new board"
        />
      </div>
    );
  }
}

export default Boards;
