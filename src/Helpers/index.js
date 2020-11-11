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
        const record = JSON.parse(data.boards[key]);
        boardsDetails.push(record);
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
    `${Constants.GET_BOARD_URL}?id=${boardId}`,
    requestOps
  )
    .then((response) => response.json())
    .then((data) => JSON.parse(data.board));
  return boardDetails.name;
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
