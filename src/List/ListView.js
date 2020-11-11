import React from "react";
import Card from "../Card/Card";
import ActionButton from "../ActionButton";
import * as Helpers from "../Helpers";

class ListView extends React.Component {
  constructor(props) {
    super(props);
    this.listDetails = this.props.listDetails;
    this.confirmMessage = `Are you sure you want to delete the "${this.listDetails.name}" list?`;
    this.state = {
      token: sessionStorage.getItem("authToken"),
    };
  }

  onConfirm = (listId) => {
    this.props.deleteList(listId);
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  refreshCards = async () => {
    const cardsDetails = await Helpers.getBoardListCards(
      this.state.token,
      this.listDetails.board_id,
      this.listDetails.id
    );
    const cards = [];
    for (let key in cardsDetails) {
      console.log(cardsDetails[key].name);
      cards.push(<Card key={key} name={cardsDetails[key].name} />);
    }
    this.setState({ cards: cards });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const newCardName = this.state.new_card_name;
    if (
      newCardName != null &&
      newCardName !== "" &&
      (await Helpers.createCard(
        this.state.token,
        this.listDetails.id,
        newCardName
      ))
    ) {
      this.refreshCards();
    }
  };

  componentDidMount = () => {
    this.refreshCards();
  };

  render() {
    return (
      <div className="col-lg-3 cols-sm-12 pl-1 pr-1 mb-4 d-flex">
        <div className="card text-center bg-secondary text-white rounded-top w-100">
          <div className="card-header">{this.props.listDetails.name}</div>
          <div className="card-body">
            {this.state.cards}
            <form className="form" onSubmit={this.handleSubmit}>
              <div className="form-row">
                <div className="form-group col-10">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="new_card_name"
                    placeholder="Input card name"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="from-group col-2">
                  <button type="submit" className="btn btn-sm btn-success">
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="card-footer p-1">
            <ActionButton
              id={this.listDetails.id}
              confirmMessage={this.confirmMessage}
              onConfirm={this.onConfirm}
              actionType={"delete"}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ListView;
