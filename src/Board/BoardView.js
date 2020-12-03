import React, { createRef } from "react";
import ListView from "../List/ListView";
import * as Helpers from "../Helpers";
import Editable from "../Editable";
import ArchivedCard from "../ArchivedElements/ArchivedCard";
import ArchivedList from "../ArchivedElements/ArchivedList";
import ArchivedElement from "../ArchivedElements/ArchivedElement";

class BoardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: sessionStorage.getItem("authToken"),
      boardId: this.props.match.params.boardId,
      lists: null,
      showArchived: false,
    };
    this.boardNameInputRef = createRef();
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const newListName = this.state.new_list_name;
    if (
      newListName != null &&
      newListName !== "" &&
      (await Helpers.createList(
        this.state.token,
        this.state.boardId,
        newListName
      ))
    )
      this.refreshLists();
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  getBoardName = async () => {
    const boardName = await Helpers.getBoardNameById(
      this.state.token,
      this.state.boardId
    );
    this.setState({ currBoardName: boardName, boardName: boardName });
  };

  changeBoardName = async () => {
    if (this.state.currBoardName !== this.state.boardName) {
      await Helpers.changeBoardName(
        this.state.token,
        this.state.boardId,
        this.state.boardName
      );
    }
  };

  deleteList = async (id) => {
    if (await Helpers.deleteList(this.state.token, this.state.boardId, id)) {
      this.refreshLists();
      this.refreshArchivedElements();
    }
  };

  archiveList = async (id) => {
    if (await Helpers.archiveList(this.state.token, this.state.boardId, id)) {
      this.refreshLists();
      this.refreshArchivedElements();
    }
  };

  refreshLists = async () => {
    const listsDetails = await Helpers.getBoardLists(
      this.state.token,
      this.state.boardId
    );
    const lists = [];
    for (let key in listsDetails) {
      const record = listsDetails[key];
      lists.push(
        <ListView
          key={key}
          listDetails={record}
          deleteList={this.deleteList}
          archiveList={this.archiveList}
          showBoardListModal={this.showBoardListModal}
          refreshLists={this.refreshLists}
          refreshArchivedElements={this.refreshArchivedElements}
        />
      );
    }
    this.setState({ lists: lists });
  };

  refreshArchivedElements = async () => {
    let counter = 0;
    const archivedListsDetails = await Helpers.getArchivedLists(
      this.state.token,
      this.state.boardId
    );
    const archivedCardsDetails = await Helpers.getArchivedCards(
      this.state.token,
      this.state.boardId
    );
    const archivedElemetns = [];
    for (let key in archivedListsDetails) {
      const record = archivedListsDetails[key];
      archivedElemetns.push(
        <ArchivedElement key={counter} refreshLists={this.refreshLists}>
          <ArchivedList details={record} />
        </ArchivedElement>
      );
      counter++;
    }
    for (let key in archivedCardsDetails) {
      const record = archivedCardsDetails[key];
      archivedElemetns.push(
        <ArchivedElement key={counter} refreshLists={this.refreshLists}>
          <ArchivedCard details={record} boardId={this.state.boardId} />
        </ArchivedElement>
      );
      counter++;
    }

    this.setState({ archivedElements: archivedElemetns });
  };

  componentDidMount = () => {
    this.getBoardName();
    this.refreshLists();
    this.refreshArchivedElements();
  };

  toggleArchived = () => {
    this.setState({ showArchived: !this.state.showArchived });
  };

  render() {
    return (
      <>
        <div className="border shadow rounded p-4 bg-dark text-white">
          <h2 className="mb-5">
            <Editable
              text={this.state.boardName}
              type="input"
              onConfirm={this.changeBoardName}
              childRef={this.boardNameInputRef}
            >
              <input
                className="w-75"
                ref={this.boardNameInputRef}
                type="text"
                name="boardName"
                value={this.state.boardName}
                onChange={this.handleChange}
              />
            </Editable>
          </h2>
          <div className="row">
            {this.state.lists}
            <div className="col-lg-2 col-md-3 col-sm-12">
              <form className="form" onSubmit={this.handleSubmit}>
                <div className="form-row d-flex justify-content-between p-0 m-0 bg-secondary">
                  <div className="form-group col-9 m-0 p-0">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="new_list_name"
                      placeholder="Input list name"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group col-2 m-0 p-0">
                    <button
                      type="submit"
                      className="btn btn-sm btn-success float-right"
                    >
                      +
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="mb-3">
            <button
              href="#"
              onClick={this.toggleArchived}
              className="btn btn-link p-0"
            >
              Archived elements&nbsp;&nbsp;
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-arrow-down-circle-fill"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"
                />
              </svg>
            </button>
          </div>
          {this.state.showArchived ? this.state.archivedElements : null}
        </div>
      </>
    );
  }
}

export default BoardView;
