import React from "react";
import ConfirmationModal from "./ConfirmationModal";

class ActionButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfirm: false,
    };
  }

  showConfirm = () => {
    this.setState({
      showConfirm: true,
    });
  };

  hideConfirm = () => {
    this.setState({
      showConfirm: false,
    });
  };

  render() {
    return (
      <div className="d-flex justify-content-end w-100 p-1">
        <button
          className={`btn ${this.getButtonColor(this.props.actionType)}`}
          onClick={this.showConfirm}
        >
          {this.props.actionType}
        </button>
        <ConfirmationModal
          id={this.props.id}
          confirmMessage={this.props.confirmMessage}
          onConfirm={this.props.onConfirm}
          isShow={this.state.showConfirm}
          handleClose={this.hideConfirm}
        />
      </div>
    );
  }

  getButtonColor = (actionType) => {
    let returnValue;
    switch (actionType) {
      case "archive":
        returnValue = "btn-warning";
        break;
      case "delete":
        returnValue = "btn-danger";
        break;
      default:
        returnValue = "btn-success";
        break;
    }
    return returnValue;
  };
}

export default ActionButton;
