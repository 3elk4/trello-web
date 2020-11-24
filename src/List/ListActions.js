import React, { useState, useRef } from "react";
import { Dropdown } from "react-bootstrap";

const ListActions = (board_id, list_id, list_name, ...props) => {
  const [boardId, setBoardId] = useState(board_id);
  const [listName, setListName] = useState(list_name);

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle
          variant="primary"
          id="list_actions_dropdown"
          size="sm"
        ></Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => console.log("Move to another board")}>
            Move list to another board...
          </Dropdown.Item>
          <Dropdown.Item onClick={() => console.log("Archive")}>
            Archive list...
          </Dropdown.Item>
          <Dropdown.Item onClick={() => console.log("Rename")}>
            Rename list...
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default ListActions;
