import React from "react";

const AddCard = (props) => {
  return (
    <form className="form p-1" onSubmit={props.handleSubmit}>
      <div className="form-row d-flex justify-content-between">
        <div className="form-group col-9">
          <input
            type="text"
            className="form-control form-control-sm"
            name="newCardName"
            placeholder="Input card name"
            onChange={props.handleChange}
          />
        </div>
        <div className="from-group col-2">
          <button type="submit" className="btn btn-sm btn-info float-right">
            +
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddCard;
