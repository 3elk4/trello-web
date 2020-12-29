import React from "react";
import ArchivedList from "./ArchivedList";
import * as Helpers from "../../Helpers";

class ArchivedElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: sessionStorage.getItem("authToken"),
    };
  }

  deleteList = async (boardId, listId) => {
    return await Helpers.deleteList(this.state.token, boardId, listId);
  };

  deleteCard = async (cardId, listId, boardId) => {
    return await Helpers.deleteCard(this.state.token, cardId, listId, boardId);
  };

  restoreList = async (boardId, listId) => {
    return await Helpers.restoreList(this.state.token, boardId, listId);
  };

  restoreCard = async (cardId, listId, boardId) => {
    return await Helpers.restoreCard(this.state.token, cardId, listId, boardId);
  };

  restore = async () => {
    if (this.props.children.type === ArchivedList) {
      if (
        await this.restoreList(
          this.props.children.props.details.board_id,
          this.props.children.props.details.id
        )
      ) {
        this.props.refreshLists();
        //TODO: Add activity information about list restoration
      }
    } else {
      if (
        await this.restoreCard(
          this.props.children.props.details.id,
          this.props.children.props.details.list_id,
          this.props.children.props.boardId
        )
      ) {
        this.props.refreshLists();
        //TODO: Add activity information about card restoration
      }
    }
  };

  delete = async () => {
    if (this.props.children.type === ArchivedList) {
      if (
        await this.deleteList(
          this.props.children.props.details.board_id,
          this.props.children.props.details.id
        )
      ) {
        this.props.refreshLists();
        //TODO: Add activity information about list deletion
      }
    } else {
      if (
        await this.deleteCard(
          this.props.children.props.details.id,
          this.props.children.props.details.list_id,
          this.props.children.props.boardId
        )
      ) {
        this.props.refreshLists();
        //TODO: Add activity information about card deletion
      }
    }
  };
  render() {
    return (
      <div className="card mb-1 p-0 bg-secondary col-sm-12 col-md-3 col-lg-2 text-center">
        <div className="card-header p-1">
          {this.props.children.type === ArchivedList ? "List" : "Card"}
        </div>
        <div className="card-body p-1">
          {this.props.children.props.details.name}
        </div>
        <div className="card-footer p-1">
          <button className="btn btn-primary" onClick={this.restore}>
            restore
          </button>
          <button className="btn btn-secondary" onClick={this.delete}>
            delete
          </button>
        </div>
      </div>
    );
  }
}

export default ArchivedElement;
