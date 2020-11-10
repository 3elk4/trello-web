import React from "react";
import ListView from "../List/ListView";
import * as Helpers from "../Helpers";
import * as Constants from "../Constants";

class BoardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: sessionStorage.getItem("authToken"),
      boardId: this.props.match.params.boardId,
      lists: null,
    };
  }

  getBoardName = async () => {
    const requestOps = {
      method: "GET",
      headers: {
        Authorization: this.state.token,
      },
    };
    const boardDetails = await fetch(
      `${Constants.GET_BOARD_URL}?id=${this.state.boardId}`,
      requestOps
    )
      .then((response) => response.json())
      .then((data) => JSON.parse(data.board));
    const boardname = boardDetails.name;
    this.setState({
      boardName: boardname,
    });
  };

  refreshLists = async () => {
    const listsDetails = await Helpers.getBoardLists(
      this.state.token,
      this.state.boardId
    );
    const lists = [];
    for (let key in listsDetails) {
      const record = listsDetails[key];
      lists.push(<ListView key={key} name={record.name} />);
    }
    this.setState({ lists: lists });
  };

  componentDidMount = () => {
    this.getBoardName();
    this.refreshLists();
  };

  render() {
    return (
      <>
        <div className="border shadow rounded p-4 mt-5">
          <h2 className="mb-5">{this.state.boardName}</h2>
          <div className="row">{this.state.lists}</div>
        </div>
      </>
    );
  }
}

export default BoardView;
