import React, { createRef } from "react";
import ListView from "../List/ListView";
import * as Helpers from "../../Helpers";
import Editable from "../Editable";
import ArchivedCard from "../ArchivedElements/ArchivedCard";
import ArchivedList from "../ArchivedElements/ArchivedList";
import ArchivedElement from "../ArchivedElements/ArchivedElement";
import * as Constants from "../../Constants";
import ChangeBackground from "../UI/ChangeBackground";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ActivityView from "../UI/ActivityView";
import SingleActivity from "../UI/SingleActivity";
import { Redirect } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
} from "@fortawesome/free-regular-svg-icons";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

class BoardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: sessionStorage.getItem("authToken"),
      boardId: this.props.match.params.boardId,
      lists: [],
      showArchived: false,
      boardDetails: [],
      isChangeBackgroundShow: false,
      showActivity: false,
      activity: [],
      showArchivedLists: true,
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
    ) {
      this.refreshLists();
      Helpers.newActivity(
        this.state.token,
        this.state.boardId,
        sessionStorage.getItem("user_id"),
        `User <b>${sessionStorage.getItem(
          "username"
        )}</b> created <b>${newListName}</b> list.`
      ).then(() => this.refreshActivity());
    }
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
      if (
        await Helpers.changeBoardName(
          this.state.token,
          this.state.boardId,
          this.state.boardName
        )
      ) {
        Helpers.newActivity(
          this.state.token,
          this.state.boardId,
          sessionStorage.getItem("user_id"),
          `User <b>${sessionStorage.getItem("username")}</b> changed board <b>${
            this.state.currBoardName
          }</b> name to <b>${this.state.boardName}</b>.`
        ).then(() => this.refreshActivity());
      }
    }
  };

  deleteList = async (id) => {
    if (await Helpers.deleteList(this.state.token, this.state.boardId, id)) {
      this.refreshLists();
      this.refreshArchivedElements();
      //TODO: Add new activity about list deletion, check if this function is necessary
    }
  };

  archiveList = async (id) => {
    if (await Helpers.archiveList(this.state.token, this.state.boardId, id)) {
      Helpers.newActivity(
        this.state.token,
        this.state.boardId,
        sessionStorage.getItem("user_id"),
        `User <b>${sessionStorage.getItem("username")}</b> archived <b>${
          this.state.lists.find((list) => list.details.id === id).details.name
        }</b> list.`
      ).then(() => {
        this.refreshActivity();
        this.refreshLists();
        this.refreshArchivedElements();
      });
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
      if (record.archiving_date == null) {
        lists.push({
          details: record,
          index: record.position,
        });
      }
    }
    this.setState({ lists: lists });
    this.refreshArchivedElements();
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
    const archivedLists = [];
    for (let key in archivedListsDetails) {
      const record = archivedListsDetails[key];
      archivedLists.push(
        <ArchivedElement
          key={counter}
          refreshLists={this.refreshLists}
          refreshActivity={this.refreshActivity}
        >
          <ArchivedList details={record} />
        </ArchivedElement>
      );
      counter++;
    }
    const archivedCards = [];

    for (let key in archivedCardsDetails) {
      const record = archivedCardsDetails[key];
      archivedCards.push(
        <ArchivedElement
          key={counter}
          refreshLists={this.refreshLists}
          refreshActivity={this.refreshActivity}
        >
          <ArchivedCard details={record} boardId={this.state.boardId} />
        </ArchivedElement>
      );
      counter++;
    }

    this.setState({
      archivedLists: archivedLists,
      archivedCards: archivedCards,
    });
  };

  refreshActivity = async () => {
    const activity = await Helpers.getBoardActivity(
      this.state.token,
      this.state.boardId
    );

    const activity_list = [];
    for (let key in activity) {
      activity_list.push(
        <SingleActivity
          key={key}
          date={activity[key].entry_date}
          description={activity[key].description}
        />
      );
    }
    this.setState({
      activity: activity_list,
    });
  };

  getBoardDetails = async () => {
    const boardDetails = await Helpers.getBoardDetails(
      this.state.token,
      this.state.boardId
    );
    this.setState({ boardDetails: boardDetails });
  };

  componentDidMount = () => {
    if (sessionStorage.getItem("authToken") === null) {
      return;
    }
    this.getBoardDetails();
    this.getBoardName();
    this.refreshLists();
    this.refreshArchivedElements();
    this.refreshActivity();
  };

  toggleArchived = () => {
    this.setState({ showArchived: !this.state.showArchived });
  };

  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const lists = this.reorder(
      this.state.lists,
      result.source.index,
      result.destination.index
    );
    const newPositions = lists.reduce(
      (dict, el, index) => ({
        ...dict,
        [el.details.id]: index,
      }),
      {}
    );
    Helpers.reorderLists(this.state.token, newPositions);

    this.setState({
      lists: lists,
    });
  };

  render() {
    if (sessionStorage.getItem("authToken") === null) {
      return <Redirect to={Constants.LOGIN_VIEW_URL} />;
    } else {
      return (
        <>
          <ChangeBackground
            isShow={this.state.isChangeBackgroundShow}
            title="Change board background"
            handleClose={() => this.setState({ isChangeBackgroundShow: false })}
            boardId={this.state.boardId}
          />

          <div className="d-flex flex-row">
            <div
              className="shadow rounded p-4 bg-dark text-white mr-0"
              style={{ width: this.state.showActivity ? "85%" : "100%" }}
            >
              <div className="row d-flex justify-content-between align-items-center">
                <div className="d-inline-flex">
                  <h2 className="mb-3">
                    <Editable
                      text={this.state.boardName}
                      type="input"
                      onConfirm={this.changeBoardName}
                      childRef={this.boardNameInputRef}
                    >
                      <input
                        className="form-control form-control-lg"
                        ref={this.boardNameInputRef}
                        type="text"
                        name="boardName"
                        value={this.state.boardName}
                        onChange={this.handleChange}
                      />
                    </Editable>
                  </h2>
                </div>
                <div>
                  <button
                    className="btn btn-secondary btn-sm mx-1"
                    onClick={() =>
                      this.setState({ isChangeBackgroundShow: true })
                    }
                  >
                    Change background
                  </button>
                  <button
                    className="btn btn-secondary btn-sm mx-1"
                    onClick={() =>
                      this.setState({
                        showActivity: !this.state.showActivity,
                      })
                    }
                  >
                    Show board activity
                  </button>
                </div>
              </div>

              <div
                className="row p-2 pt-5 rounded"
                style={{
                  backgroundImage: `url(${Constants.API_ROOT}${this.state.boardDetails.background})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  minHeight: "700px",
                }}
              >
                <div className="d-inline-flex flex-row overflow-auto">
                  <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppable-1" direction="horizontal">
                      {(provided, snapshot) => (
                        <div
                          className="d-flex"
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {this.state.lists.map((item, index) => (
                            <Draggable
                              key={item.details.id}
                              draggableId={"" + item.details.id}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  className="mb-auto"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <ListView
                                    listDetails={item.details}
                                    deleteList={this.deleteList}
                                    archiveList={this.archiveList}
                                    refreshLists={this.refreshLists}
                                    refreshArchivedElements={
                                      this.refreshArchivedElements
                                    }
                                    refreshActivity={this.refreshActivity}
                                  />
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                  <div style={{ minWidth: "18em" }}>
                    <form className="form" onSubmit={this.handleSubmit}>
                      <div className="form-row d-flex justify-content-between p-0 m-0 bg-secondary rounded">
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
                            className="btn btn-sm btn-info float-right"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <button
                  onClick={this.toggleArchived}
                  className="btn btn-secondary"
                >
                  Archived elements{" "}
                  {!this.state.showArchived ? (
                    <FontAwesomeIcon icon={faAngleDown} />
                  ) : (
                    <FontAwesomeIcon icon={faAngleUp} />
                  )}
                </button>
              </div>
              <div
                style={{ display: this.state.showArchived ? "block" : "none" }}
              >
                <button
                  className="btn btn-info btn-sm"
                  onClick={() =>
                    this.setState({
                      showArchivedLists: !this.state.showArchivedLists,
                    })
                  }
                >
                  {this.state.showArchivedLists
                    ? "Show archived cards"
                    : "Show archived lists"}
                </button>
                <div className="d-flex flex-wrap">
                  {this.state.showArchivedLists
                    ? this.state.archivedLists
                    : this.state.archivedCards}
                </div>
              </div>
            </div>

            <ActivityView
              activity={this.state.activity}
              showActivity={this.state.showActivity}
            />
          </div>
        </>
      );
    }
  }
}

export default BoardView;
