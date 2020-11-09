import React from "react";
import Delete from "./Delete";
import Archive from "./Archive";

const Board = (props) => {
  return (
    <div className="col-sm-3 mb-4">
      <div className="card text-center bg-secondary text-white rounded-top">
        <div className="card-header">{props.boardname}</div>
        <div className="card-body">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
        <div className="card-footer pl-0 pr-0 pb-0">
          {props.is_public ? "Public" : "Private"}
          {props.archiveDate === null ? 
            (<Archive 
              archiveBoard={props.archiveBoard}
              id={props.id}
              boardname={props.boardname} 
            />) : 
            (<Delete
              deleteBoard={props.deleteBoard}
              id={props.id}
              boardname={props.boardname}
            />)
          }
        </div>
      </div>
    </div>
  );
};

export default Board;
