import React from "react";

const Delete = (props) => {
  return (
    <div className="d-flex justify-content-end w-100 rounded-bottom border-top mt-3 p-1 border-dark">
      <button
        className="btn btn-danger"
        id={props.id}
        onClick={props.deleteBoard}
      >
        Delete
      </button>
    </div>
  );
};

export default Delete;
