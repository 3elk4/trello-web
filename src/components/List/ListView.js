import React, { createRef } from "react";
import Card from "../Card/Card";
import * as Helpers from "../../Helpers";
import Editable from "../Editable";
import ListActions from "./ListActions";
import BoardList from "../Board/BoardsList";
import AddCard from "../Card/AddCard";

class ListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: sessionStorage.getItem("authToken"),
      listName: props.listDetails.name,
      listDetails: props.listDetails,
      cards: [],
      showBoardsListModal: false,
      listNewName: props.listDetails.name,
    };
    this.listNameInputRef = createRef();
    this.actionType =
      props.listDetails.archiving_date === null ? "archive" : "delete";
  }

  // const confirmMessage = `Are you sure you want to ${actionType} the "${listName}" list?`;

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  refreshCards = async () => {
    const cardsDetails = await Helpers.getBoardListCards(
      this.state.token,
      this.state.listDetails.board_id,
      this.state.listDetails.id
    );
    const cards = [];
    for (let key in cardsDetails) {
      const labels = await Helpers.getCardLabels(
        this.state.token,
        this.state.listDetails.board_id,
        this.state.listDetails.id,
        cardsDetails[key].id
      );
      if (cardsDetails[key].archiving_date === null) {
        cards.push(
          <Card
            key={key}
            boardId={this.state.listDetails.board_id}
            cardDetails={cardsDetails[key]}
            refreshCards={this.refreshCards}
            refreshArchivedElements={this.props.refreshArchivedElements}
            labels={labels}
          />
        );
      }
    }
    this.setState({
      cards: cards,
    });
  };

  changeListName = async () => {
    if (this.state.listNewName !== this.state.listName) {
      await Helpers.changeListName(
        this.state.token,
        this.state.listDetails.board_id,
        this.state.listDetails.id,
        this.state.listNewName
      );
    }
  };

  moveList = async (newBoardId) => {
    if (
      await Helpers.moveList(
        this.state.token,
        this.state.listDetails.board_id,
        this.state.listDetails.id,
        newBoardId
      )
    ) {
      this.hideBoardListModal();
      this.props.refreshLists();
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (
      this.state.newCardName != null &&
      this.state.newCardName !== "" &&
      (await Helpers.createCard(
        this.state.token,
        this.state.listDetails.id,
        this.state.newCardName
      ))
    ) {
      this.refreshCards();
    }
  };

  hideBoardListModal = () => {
    this.setState({
      showBoardsListModal: false,
    });
  };

  showBoardListModal = () => {
    this.setState({
      showBoardsListModal: true,
    });
  };

  componentDidMount = () => {
    this.refreshCards();
  };

  render() {
    return (
      <div className="col-lg-2 col-md-3 cols-sm-12 pl-1 pr-1 mb-4 d-flex">
        <div className="card bg-secondary text-white rounded-top w-100">
          <div className="card-header row m-0 d-flex justify-content-between pl-0">
            <div className="col-10 pr-0 mr-0 pt-1">
              <Editable
                text={this.state.listNewName}
                type="input"
                onConfirm={this.changeListName}
                childRef={this.listNameInputRef}
              >
                <input
                  className="form-control p-2"
                  ref={this.listNameInputRef}
                  type="text"
                  name="listNewName"
                  value={this.state.listNewName}
                  onChange={this.handleChange}
                />
              </Editable>
            </div>
            <div className="col-1 ml-0 pl-0">
              <ListActions
                showBoardListModal={this.showBoardListModal}
                archiveList={this.props.archiveList}
                listId={this.state.listDetails.id}
              />
            </div>
          </div>
          <div className="card-body pl-1 pr-1">
            {this.state.cards}
            <AddCard
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
            />
          </div>
        </div>
        <BoardList
          token={this.state.token}
          isShow={this.state.showBoardsListModal}
          handleClose={this.hideBoardListModal}
          boardId={this.state.listDetails.board_id}
          moveList={this.moveList}
        />
      </div>
    );
  }
}

export default ListView;
