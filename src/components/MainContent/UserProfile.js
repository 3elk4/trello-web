import React from "react";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="d-flex flex-column align-items-center m-auto text-center col-sm-3 p-1 shadow-lg rounded bg-dark text-white">
          <div className="d-flex flex-row align-items-center justify-content-between w-50">
            <div>
              <img
                width="75px"
                height="75px"
                className="img-thumbnail rounded-circle"
                src="http://placekitten.com/g/300/300"
              />
            </div>
            <div>
              <h3>{this.props.userData.username}</h3>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default UserProfile;
