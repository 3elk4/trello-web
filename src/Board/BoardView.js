import React from "react";
import ListView from "../List/ListView";
import * as Helpers from "../Helpers";

class BoardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: sessionStorage.getItem("authToken"),
      boardId: this.props.match.params.boardId,
      lists: null,
    };
  }

  refreshLists = async () => {
    const listsDetails = await Helpers.getBoardLists(
      this.state.token,
      this.state.boardId
    );
    const lists = [];
    for (let key in listsDetails) {
      const record = listsDetails[key];
      lists.push(<ListView name={record.name} />);
    }
    this.setState({ lists: lists });
  };

  componentDidMount = () => {
    this.refreshLists();
  };

  render() {
    console.log(this.state.boardId);
    console.log(this.state.lists);
    return <div>{this.state.lists}</div>;
  }
}

export default BoardView;
