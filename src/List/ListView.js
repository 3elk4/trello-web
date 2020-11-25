import React, { useRef, useState, useEffect } from "react";
import Card from "../Card/Card";
import ActionButton from "../ActionButton";
import * as Helpers from "../Helpers";
import Editable from "../Editable";
import ListActions from "./ListActions";
import BoardList from "../Board/BoardsList";

const ListView = (props) => {
  const [token] = useState(sessionStorage.getItem("authToken"));
  const [listName] = useState(props.listDetails.name);
  const [listDetails] = useState(props.listDetails);
  const [cards, setCards] = useState();
  const [newCardData, setNewCardData] = useState({ new_card_name: "" });
  const [newListData, setNewListData] = useState({
    listName: listName,
  });
  const [isBoardListModalShown, setBoardListModalShown] = useState(false);

  const listNameInputRef = useRef();
  const actionType =
    props.listDetails.archiving_date === null ? "archive" : "delete";
  const confirmMessage = `Are you sure you want to ${actionType} the "${listName}" list?`;

  const onConfirm = (listId) => {
    if (actionType === "archive") {
      props.archiveList(listId);
    } else if (actionType === "delete") {
      props.deleteList(listId);
    }
  };

  const handleNewCardChange = (event) => {
    const { name, value } = event.target;
    setNewCardData({
      [name]: value,
    });
  };

  const handleListNameChange = (event) => {
    const { name, value } = event.target;
    setNewListData({
      [name]: value,
    });
  };

  const refreshCards = async () => {
    const cardsDetails = await Helpers.getBoardListCards(
      token,
      listDetails.board_id,
      listDetails.id
    );
    const cards = [];
    for (let key in cardsDetails) {
      if (cardsDetails[key].archiving_date === null) {
        cards.push(
          <Card
            key={key}
            boardId={listDetails.board_id}
            cardDetails={cardsDetails[key]}
            refreshCards={refreshCards}
            refreshArchivedElements={props.refreshArchivedElements}
          />
        );
      }
    }
    setCards(cards);
  };

  const changeListName = async () => {
    if (listName !== newListData.listName) {
      await Helpers.changeListName(
        token,
        listDetails.board_id,
        listDetails.id,
        newListData.listName
      );
    }
  };

  const moveList = async (newBoardId) => {
    if (
      await Helpers.moveList(
        token,
        listDetails.board_id,
        listDetails.id,
        newBoardId
      )
    ) {
      hideBoardListModal();
      props.refreshLists();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      newCardData.new_card_name != null &&
      newCardData.new_card_name !== "" &&
      (await Helpers.createCard(
        token,
        listDetails.id,
        newCardData.new_card_name
      ))
    ) {
      refreshCards();
    }
  };

  const hideBoardListModal = () => {
    setBoardListModalShown(false);
  };

  const showBoardListModal = () => {
    setBoardListModalShown(true);
  };

  useEffect(() => {
    refreshCards();
  }, []);

  return (
    <div className="col-lg-2 col-md-3 cols-sm-12 pl-1 pr-1 mb-4 d-flex">
      <div className="card bg-secondary text-white rounded-top w-100">
        <div className="card-header row m-0 d-flex justify-content-between pl-0">
          <div className="col-10 pr-0 mr-0 pt-1">
            <Editable
              text={newListData.listName}
              type="input"
              onConfirm={changeListName}
              childRef={listNameInputRef}
            >
              <input
                ref={listNameInputRef}
                type="text"
                name="listName"
                value={newListData.listName}
                onChange={handleListNameChange}
              />
            </Editable>
          </div>
          <div className="col-1 ml-0 pl-0">
            <ListActions showBoardListModal={showBoardListModal} />
          </div>
        </div>
        <div className="card-body pl-1 pr-1">
          {cards}
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-row d-flex justify-content-between">
              <div className="form-group col-9">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="new_card_name"
                  placeholder="Input card name"
                  onChange={handleNewCardChange}
                />
              </div>
              <div className="from-group col-2">
                <button
                  type="submit"
                  className="btn btn-sm btn-success float-right"
                >
                  +
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="card-footer p-1">
          <ActionButton
            id={listDetails.id}
            confirmMessage={confirmMessage}
            onConfirm={onConfirm}
            actionType={actionType}
          />
        </div>
      </div>
      <BoardList
        token={token}
        isShow={isBoardListModalShown}
        handleClose={hideBoardListModal}
        boardId={listDetails.board_id}
        moveList={moveList}
      />
    </div>
  );
};

export default ListView;
