import React from "react";
import { Toast } from "react-bootstrap";
import * as Helpers from "../../Helpers";
import MyToast from "../UI/MyToast";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.userData.username,
      showSuccess: false,
      showFail: false,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (
      await Helpers.updateUser(sessionStorage.getItem("authToken"), {
        id: this.props.userData.id,
        username: this.state.username,
      })
    ) {
      this.setState({ showSuccess: true });
    } else {
      this.setState({ showFail: true });
    }

    //TODO: figure out why backend doesn't update user
  };

  render() {
    return (
      <>
        <div className="d-flex flex-column align-items-center m-auto col-sm-12 col-md-6 col-lg-4 p-1 pt-3 shadow-lg rounded bg-dark text-white">
          <div className="row align-items-center mb-3">
            <div>
              <img
                width="75px"
                height="75px"
                className="rounded-circle mr-2"
                src="http://placekitten.com/g/300/300"
              />
            </div>
            <div>
              <h3>{this.props.userData.username}</h3>
            </div>
          </div>
          <form className="w-75 mb-3" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="userDescription">Description</label>
              <textarea
                className="form-control"
                id="userDescription"
                name="userDescription"
                rows="3"
                onChange={this.handleChange}
                disabled
                placeholder="Not implemented yet."
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-sm btn-success pr-4 pl-4"
              >
                Save
              </button>
            </div>
          </form>
        </div>
        <MyToast
          show={this.state.showSuccess}
          handleClose={() => this.setState({ showSuccess: false })}
          bgColor="#8BC34A"
          message="User data updated successfully. Refresh page to see changes."
        />
        <MyToast
          show={this.state.showFail}
          handleClose={() => this.setState({ showFail: false })}
          bgColor="#F65C51"
          message="User already exists."
        />
      </>
    );
  }
}

export default UserProfile;
