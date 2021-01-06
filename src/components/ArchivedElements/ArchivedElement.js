import React from "react";
import ArchivedList from "./ArchivedList";
import * as Helpers from "../../Helpers";
import ArchivedCard from "./ArchivedCard";
import ArchivedCardView from "../Card/ArchivedCardView";

class ArchivedElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: sessionStorage.getItem("authToken"),
      isShow: false,
      labels: [],
    };
  }

  handleClose = () => {
    this.setState({ isShow: false });
  };

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
        Helpers.newActivity(
          sessionStorage.getItem("authToken"),
          this.props.children.props.details.board_id,
          sessionStorage.getItem("user_id"),
          `User <b>${sessionStorage.getItem("username")}</b> restored <b>${
            this.props.children.props.details.name
          }</b> list.`
        ).then(() => this.props.refreshActivity());
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
        Helpers.newActivity(
          sessionStorage.getItem("authToken"),
          this.props.children.props.boardId,
          sessionStorage.getItem("user_id"),
          `User <b>${sessionStorage.getItem("username")}</b> restored <b>${
            this.props.children.props.details.name
          }</b> card.`
        ).then(() => this.props.refreshActivity());
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
        Helpers.newActivity(
          sessionStorage.getItem("authToken"),
          this.props.children.props.details.board_id,
          sessionStorage.getItem("user_id"),
          `User <b>${sessionStorage.getItem("username")}</b> deleted <b>${
            this.props.children.props.details.name
          }</b> list.`
        ).then(() => this.props.refreshActivity());
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
        Helpers.newActivity(
          sessionStorage.getItem("authToken"),
          this.props.children.props.boardId,
          sessionStorage.getItem("user_id"),
          `User <b>${sessionStorage.getItem("username")}</b> deleted <b>${
            this.props.children.props.details.name
          }</b> card.`
        ).then(() => this.props.refreshActivity());
      }
    }
  };

  componentDidMount = async () => {
    if (this.props.children.type === ArchivedCard) {
      const labels = await Helpers.getCardLabels(
        this.state.token,
        this.props.children.props.boardId,
        this.props.children.props.details.list_id,
        this.props.children.props.details.id
      );

      this.setState({ labels: labels });
    }
  };

  render() {
    return (
      <div className="p-1 col-xl-2 col-lg-2 col-md-3 col-sm-4 col-12">
        {this.props.children.type === ArchivedCard ? (
          <ArchivedCardView
            isShow={this.state.isShow}
            handleClose={this.handleClose}
            cardDetails={this.props.children.props.details}
            labels={this.state.labels}
          />
        ) : null}

        <div className="bg-secondary p-2 rounded d-flex flex-column align-items-center ">
          <div
            className="mx-2"
            onClick={() => this.setState({ isShow: true })}
            style={{ cursor: "pointer" }}
          >
            {this.props.children.props.details.name}
          </div>
          <div className="mx-1 d-flex justify-content-center">
            <button className="btn btn-info btn-sm m-1" onClick={this.restore}>
              restore
            </button>
            <button className="btn btn-danger btn-sm m-1" onClick={this.delete}>
              delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ArchivedElement;
