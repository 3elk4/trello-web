import React from "react";
import ActionButton from "../ActionButton";

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

  render() {
    return (
      <div className="col-sm-3 pl-1 pr-1 mb-4 d-flex">
        <div className="card text-center bg-secondary text-white rounded-top w-100">
          <div className="card-header">{this.props.listDetails.name}</div>
          <div className="card-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
