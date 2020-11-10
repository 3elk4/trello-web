import * as Constants from "../Constants";
import BoardCard from "../Board/BoardCard";

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
  const boardsDetailsArray = [];
  await fetch(Constants.GET_BOARDS_URL, requestOps)
    .then((response) => response.json())
    .then((data) => {
      for (let key in data.boards) {
        const boardDetails = JSON.parse(data.boards[key]);
        boardsDetailsArray.push(boardDetails);
      }
    })
    .catch((error) => console.log(error));
  return boardsDetailsArray;
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
  await fetch(Constants.ARCHIVE_BOARD_URL, requestOps).then((response) => {
    return response.ok;
  });
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

  fetch(Constants.CREATE_BOARD_URL, requestOps).then((response) => {
    return response.ok;
  });
}
