import React from "react";
import * as Helpers from "../../Helpers";
import * as Constants from "../../Constants";
import MyToast from "../UI/MyToast";
import { Redirect } from "react-router";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.userData.username,
      email: props.userData.email,
      userDescription: props.userData.description,
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
        description: this.state.userDescription,
      })
    ) {
      this.setState({ showSuccess: true });
      sessionStorage.setItem("username", this.state.username);
    } else {
      this.setState({ showFail: true });
    }
  };

  render() {
    if (sessionStorage.getItem("authToken") === null) {
      return <Redirect to={Constants.LOGIN_VIEW_URL} />;
    } else {
      return (
        <>
          <div className="d-flex flex-column align-items-center m-auto col-sm-12 col-md-6 col-lg-4 p-1 pt-3 shadow-lg rounded bg-dark text-white mt-sm-0 mt-5">
            <div className="row align-items-center mb-3">
              <div>
                <img
                  width="75px"
                  height="75px"
                  className="rounded-circle mr-2"
                  src="http://placekitten.com/g/300/300"
                  alt="User avatar"
                />
              </div>
              <div>
                <h3>{this.props.userData.username}</h3>
              </div>
            </div>
            <form className="w-75 mb-3" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  value={this.state.email}
                  disabled
                />
              </div>
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
                  placeholder="No description provided."
                  value={this.state.userDescription}
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
}

export default UserProfile;
