import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import * as Helpers from "../Helpers";
import BoardListElement from "./BoardListElement";

const BoardList = (props) => {
  const [currentBoardId] = useState(props.boardId);
  const [listOfBoards, setListOfBoards] = useState();

  const moveList = (newBoardId) => {
    props.moveList(newBoardId);
  };

  const getBoards = async (token) => {
    const boardsDetails = await Helpers.getUserBoards(token);
    const boards = [];
    for (let key in boardsDetails) {
      if (currentBoardId !== boardsDetails[key].id) {
        boards.push(
          <BoardListElement
            key={key}
            id={boardsDetails[key].id}
            name={boardsDetails[key].name}
            moveList={moveList}
          />
        );
      }
    }
    setListOfBoards(boards);
  };

  useEffect(() => {
    getBoards(props.token);
  }, []);

  return (
    <Modal show={props.isShow} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Choose board</Modal.Title>
      </Modal.Header>
      <Modal.Body>{listOfBoards}</Modal.Body>
    </Modal>
  );
};

export default BoardList;
