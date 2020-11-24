import React, { createRef } from "react";
import ListView from "../List/ListView";
import * as Helpers from "../Helpers";
import Editable from "../Editable";

class BoardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: sessionStorage.getItem("authToken"),
      boardId: this.props.match.params.boardId,
      lists: null,
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
    }
  };

  archiveList = async (id) => {
    if (await Helpers.archiveList(this.state.token, this.state.boardId, id)) {
      this.refreshLists();
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
        />
      );
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
        </div>
      </>
    );
  }
}

export default BoardView;
