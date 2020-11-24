import React, { useRef, useState, useEffect } from "react";
import Card from "../Card/Card";
import ActionButton from "../ActionButton";
import * as Helpers from "../Helpers";
import Editable from "../Editable";
import ListActions from "./ListActions";

const ListView = (props) => {
  const [token, setToken] = useState(sessionStorage.getItem("authToken"));
  const [listName, setListName] = useState(props.listDetails.name);
  const [listDetails, setLsitDetails] = useState(props.listDetails);
  const [cards, setCards] = useState();
  const [formData, setFormData] = useState();

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
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
      cards.push(<Card key={key} name={cardsDetails[key].name} />);
    }
    setCards(cards);
  };

  const changeListName = async () => {
    if (listName !== formData.listName) {
      await Helpers.changeListName(
        token,
        listDetails.board_id,
        listDetails.id,
        formData.listName
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      formData.new_card_name != null &&
      formData.new_card_name !== "" &&
      (await Helpers.createCard(token, listDetails.id, formData.new_card_name))
    ) {
      refreshCards();
    }
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
              text={listName}
              type="input"
              onConfirm={changeListName}
              childRef={listNameInputRef}
            >
              <input
                ref={listNameInputRef}
                type="text"
                name="listName"
                value={listName}
                onChange={handleChange}
              />
            </Editable>
          </div>
          <div className="col-1 ml-0 pl-0">
            <ListActions />
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
                  onChange={handleChange}
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
    </div>
  );
};

export default ListView;
