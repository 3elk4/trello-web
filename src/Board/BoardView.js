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

  handleSubmit = async (event) => {
    event.preventDefault();
    const newListName = this.state.new_list_name;
    if (newListName !== null && newListName !== "") {
      if (
        await Helpers.createList(
          this.state.token,
          this.state.boardId,
          newListName
        )
      )
        this.refreshLists();
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
    this.setState({ boardName: boardName });
  };

  deleteList = async (id) => {
    if (await Helpers.deleteList(this.state.token, this.state.boardId, id)) {
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
        <ListView key={key} listDetails={record} deleteList={this.deleteList} />
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
        <div className="border shadow rounded p-4">
          <h2 className="mb-5">{this.state.boardName}</h2>
          <div className="row">
            {this.state.lists}
            <div className="col">
              <form className="form-inline" onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="new_list_name"
                  placeholder="Input list name"
                  onChange={this.handleChange}
                />
                <button type="submit" className="btn btn-sm btn-success ml-1">
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default BoardView;
