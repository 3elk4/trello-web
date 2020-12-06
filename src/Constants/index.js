const DEV_URL = "http://localhost:3000";
const PROD_URL = "http://trello-alpha4-api.herokuapp.com";
export const API_ROOT =
  process.env.NODE_ENV === "development" ? DEV_URL : PROD_URL;
export const GET_BOARDS_URL = `${API_ROOT}/index`;
export const LOGIN_VIEW_URL = `/login`;
export const LOGOUT_URL = `${API_ROOT}/logout`;
export const AUTH_URL = `${API_ROOT}/authenticate`;
export const CURRENT_USER_URL = `${API_ROOT}/get_current_user`;
export const CREATE_BOARD_URL = `${API_ROOT}/create_board`;
export const EDIT_BOARD_URL = `${API_ROOT}/edit_board`;
export const DELETE_BOARD_URL = `${API_ROOT}/delete_board`;
export const ARCHIVE_BOARD_URL = `${API_ROOT}/archive_board`;
export const GET_LISTS_URL = (id) => `${API_ROOT}/get_list/${id}`;
export const GET_BOARD_URL = (id) => `${API_ROOT}/get_board/${id}`;
export const CREATE_LIST_URL = `${API_ROOT}/create_list`;
export const EDIT_LIST_URL = `${API_ROOT}/edit_list`;
export const MOVE_LIST_URL = `${API_ROOT}/move_list`;
export const ARCHIVE_LIST_URL = `${API_ROOT}/archive_list`;
export const DELETE_LIST_URL = `${API_ROOT}/delete_list`;
export const RESTORE_LIST_URL = `${API_ROOT}/restore_list`;
export const GET_CARDS_URL = (boardId, listId) =>
  `${API_ROOT}/get_card/${boardId}/${listId}`;
export const CREATE_CARD_URL = `${API_ROOT}/create_card`;
export const EDIT_CARD_URL = `${API_ROOT}/edit_card`;
export const GET_BOARD_CARDS_URL = (boardId) =>
  `${API_ROOT}/get_board_cards/${boardId}`;
export const ARCHIVE_CARD_URL = `${API_ROOT}/archive_card`;
export const DELETE_CARD_URL = `${API_ROOT}/delete_card`;
export const RESTORE_CARD_URL = `${API_ROOT}/restore_card`;
export const REGISTER_USER_URL = `${API_ROOT}/create_user`;
