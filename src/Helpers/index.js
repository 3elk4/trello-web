import * as Constants from "../Constants";

export async function isLogged(token) {
  if (token === null) return false;
  const requestOps = {
    method: "GET",
    headers: { Authorization: token },
  };
  return await fetch(Constants.GET_BOARDS_URL, requestOps).then((response) => {
    return response.ok;
  });
}

export async function logoutUser(token) {
  const requestOps = {
    method: "DELETE",
    headers: { Authorization: token },
  };
  return await fetch(Constants.LOGOUT_URL, requestOps).then(
    (response) => response.ok
  );
}

export async function updateUser(token, userData) {
  const requestOps = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(userData),
  };
  return await fetch(Constants.EDIT_USER_URL, requestOps).then(
    (response) => response.ok
  );
}

export async function getCurrentUserInfo(token) {
  const requestOps = {
    method: "GET",
    headers: { Authorization: token },
  };
  return await fetch(Constants.CURRENT_USER_URL, requestOps)
    .then((response) => response.json())
    .then((data) => data);
}

export async function getUserBoards(token) {
  const requestOps = {
    method: "GET",
    headers: { Authorization: token },
  };
  const boardsDetails = [];
  await fetch(Constants.GET_BOARDS_URL, requestOps)
    .then((response) => response.json())
    .then((data) => {
      for (let key in data.boards) {
        boardsDetails.push(data.boards[key]);
      }
    })
    .catch((error) => console.log(error));
  return boardsDetails;
}

export async function deleteBoard(token, id) {
  const boardId = id;
  const requestOps = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      id: boardId,
    }),
  };
  return await fetch(Constants.DELETE_BOARD_URL, requestOps).then(
    (response) => {
      return response.ok;
    }
  );
}

export async function archiveBoard(token, id) {
  const boardId = id;
  const requestOps = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      id: boardId,
    }),
  };
  return await fetch(Constants.ARCHIVE_BOARD_URL, requestOps).then(
    (response) => {
      return response.ok;
    }
  );
}

export async function createBoard(token, params) {
  let requestOps = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(params),
  };

  return await fetch(Constants.CREATE_BOARD_URL, requestOps).then(
    (response) => {
      return response.ok;
    }
  );
}

export async function getBoardLists(token, boardId) {
  const requestOps = {
    method: "GET",
    headers: { Authorization: token },
  };
  const listsDetails = [];
  await fetch(Constants.GET_LISTS_URL(boardId), requestOps)
    .then((response) => response.json())
    .then((data) => {
      for (let key in data.lists) {
        const record = JSON.parse(data.lists[key]);
        listsDetails.push(record);
      }
    })
    .catch((error) => console.log(error));
  return listsDetails;
}

export async function getBoardNameById(token, boardId) {
  const requestOps = {
    method: "GET",
    headers: {
      Authorization: token,
    },
  };
  const boardDetails = await fetch(
    `${Constants.GET_BOARD_URL(boardId)}`,
    requestOps
  )
    .then((response) => response.json())
    .then((data) => data.board);
  return boardDetails.name;
}

export async function changeBoardName(token, id, name) {
  const boardId = id;
  const boardName = name;
  const requestOps = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      id: boardId,
      name: boardName,
    }),
  };
  return await fetch(Constants.EDIT_BOARD_URL, requestOps).then((response) => {
    return response.ok;
  });
}

export async function createList(token, boardId, listName) {
  const requestOps = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      board_id: boardId,
      name: listName,
    }),
  };

  return await fetch(Constants.CREATE_LIST_URL, requestOps).then((response) => {
    return response.ok;
  });
}

export async function changeListName(token, boardId, listId, name) {
  const requestOps = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      board_id: boardId,
      id: listId,
      name: name,
    }),
  };

  return await fetch(Constants.EDIT_LIST_URL, requestOps).then((response) => {
    return response.ok;
  });
}

export async function archiveList(token, boardId, listId) {
  const requestOps = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      board_id: boardId,
      id: listId,
    }),
  };

  return await fetch(Constants.ARCHIVE_LIST_URL, requestOps).then(
    (response) => {
      return response.ok;
    }
  );
}

export async function deleteList(token, boardId, listId) {
  const requestOps = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      board_id: boardId,
      id: listId,
    }),
  };

  return await fetch(Constants.DELETE_LIST_URL, requestOps).then((response) => {
    return response.ok;
  });
}

export async function restoreList(token, boardId, listId) {
  const requestOps = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      board_id: boardId,
      id: listId,
    }),
  };

  return await fetch(Constants.RESTORE_LIST_URL, requestOps).then(
    (response) => {
      return response.ok;
    }
  );
}

export async function moveList(token, currentBoardId, listId, newBoardId) {
  const requestOps = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      id: listId,
      board_id: currentBoardId,
      new_board_id: newBoardId,
    }),
  };

  return await fetch(Constants.MOVE_LIST_URL, requestOps).then((response) => {
    return response.ok;
  });
}

export async function getBoardListCards(token, boardId, listId) {
  const requestOps = {
    method: "GET",
    headers: { Authorization: token },
  };

  const cardsDetails = [];
  await fetch(Constants.GET_CARDS_URL(boardId, listId), requestOps)
    .then((response) => response.json())
    .then((data) => {
      for (let key in data.cards) {
        const record = JSON.parse(data.cards[key]);
        cardsDetails.push(record);
      }
    })
    .catch((error) => console.log(error));

  return cardsDetails;
}

export async function getBoardCards(token, boardId) {
  const requestOps = {
    method: "GET",
    headers: { Authorization: token },
  };

  const cardsDetails = [];
  await fetch(Constants.GET_BOARD_CARDS_URL(boardId), requestOps)
    .then((response) => response.json())
    .then((data) => {
      for (let key in data.cards) {
        const record = JSON.parse(data.cards[key]);
        cardsDetails.push(record);
      }
    })
    .catch((error) => console.log(error));

  return cardsDetails;
}

export async function createCard(token, listId, cardName) {
  const requestOps = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      list_id: listId,
      name: cardName,
    }),
  };

  return await fetch(Constants.CREATE_CARD_URL, requestOps).then((response) => {
    return response.ok;
  });
}

export async function changeCardDescription(
  token,
  cardId,
  listId,
  boardId,
  newDescription
) {
  const requestOps = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      id: cardId,
      list_id: listId,
      board_id: boardId,
      description: newDescription,
    }),
  };

  return await fetch(Constants.EDIT_CARD_URL, requestOps).then((response) => {
    return response.ok;
  });
}

export async function changeDueDate(token, cardId, listId, boardId, date) {
  const requestOps = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      id: cardId,
      list_id: listId,
      board_id: boardId,
      deadline: date,
    }),
  };

  return await fetch(Constants.EDIT_CARD_URL, requestOps).then(
    (response) => response.ok
  );
}

export async function archiveCard(token, cardId, listId, boardId) {
  const requestOps = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      id: cardId,
      list_id: listId,
      board_id: boardId,
    }),
  };

  return await fetch(Constants.ARCHIVE_CARD_URL, requestOps).then(
    (response) => {
      return response.ok;
    }
  );
}

export async function deleteCard(token, cardId, listId, boardId) {
  const requestOps = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      id: cardId,
      list_id: listId,
      board_id: boardId,
    }),
  };

  return await fetch(Constants.DELETE_CARD_URL, requestOps).then((response) => {
    return response.ok;
  });
}

export async function restoreCard(token, cardId, listId, boardId) {
  const requestOps = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      id: cardId,
      list_id: listId,
      board_id: boardId,
    }),
  };

  return await fetch(Constants.RESTORE_CARD_URL, requestOps).then(
    (response) => {
      return response.ok;
    }
  );
}

export async function createUser(userName, password) {
  const requestOps = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: userName,
      password: password,
    }),
  };

  return await fetch(Constants.REGISTER_USER_URL, requestOps).then(
    (response) => {
      return response.ok;
    }
  );
}

export async function getArchivedLists(token, boardId) {
  const dd = await getBoardLists(token, boardId);
  return dd.filter((e) => e.archiving_date != null);
}

export async function getArchivedCards(token, boardId) {
  const dd = await getBoardCards(token, boardId);
  return dd.filter((e) => e.archiving_date != null);
}

export async function getBoardDetails(token, boardId) {
  const requestOps = {
    method: "GET",
    headers: {
      Authorization: token,
    },
  };
  const boardDetails = await fetch(
    `${Constants.GET_BOARD_URL(boardId)}`,
    requestOps
  )
    .then((response) => response.json())
    .then((data) => data.board);
  return boardDetails;
}

export async function addBackgroundToBoard(token, boardId, background) {
  const formData = new FormData();
  formData.append("id", boardId);
  formData.append("background", background);
  const requestOps = {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: formData,
  };

  return await fetch(Constants.EDIT_BOARD_URL, requestOps).then((response) => {
    return response.ok;
  });
}

export async function getCardComments(token, boardId, listId, cardId) {
  const requestOps = {
    method: "GET",
    headers: {
      Authorization: token,
    },
  };

  return await fetch(
    Constants.GET_CARD_COMMENTS_URL(boardId, listId, cardId),
    requestOps
  )
    .then((response) => response.json())
    .then((data) => data.card_comments);
}

export async function addCardComment(token, boardId, listId, cardId, comment) {
  const requestOps = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      board_id: boardId,
      list_id: listId,
      card_id: cardId,
      content: comment,
    }),
  };

  return await fetch(Constants.ADD_CARD_COMMENT_URL, requestOps).then(
    (response) => response.ok
  );
}

export async function getCardLabels(token, boardId, listId, cardId) {
  const requestOps = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  return await fetch(
    Constants.GET_CARD_LABELS_URL(boardId, listId, cardId),
    requestOps
  )
    .then((response) => response.json())
    .then((data) => data.labels.map((label) => JSON.parse(label)));
}
