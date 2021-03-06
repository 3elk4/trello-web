const DEV_URL = "http://localhost:3000";
const PROD_URL = "http://trello-alpha4-api.herokuapp.com";
export const API_ROOT =
  process.env.NODE_ENV === "development" ? DEV_URL : PROD_URL;
export const GET_BOARDS_URL = `${API_ROOT}/index`;
export const LOGIN_VIEW_URL = `/login`;
export const LOGOUT_URL = `${API_ROOT}/logout`;
export const AUTH_URL = `${API_ROOT}/authenticate`;
export const CURRENT_USER_URL = `${API_ROOT}/get_current_user`;
export const EDIT_USER_URL = `${API_ROOT}/edit_user`;
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
export const GET_CARD_COMMENTS_URL = (boardId, listId, cardId) =>
  `${API_ROOT}/get_card_comments/${boardId}/${listId}/${cardId}`;
export const ADD_CARD_COMMENT_URL = `${API_ROOT}/create_comment`;
export const GET_CARD_LABELS_URL = (boardId, listId, cardId) =>
  `${API_ROOT}/get_card_labels/${boardId}/${listId}/${cardId}`;
export const GET_ALL_LABELS_URL = `${API_ROOT}/get_labels`;
export const ASSIGN_LABEL_URL = `${API_ROOT}/assign_label`;
export const UNASSIGN_LABEL_URL = `${API_ROOT}/unassign_label`;
export const REORDER_LISTS_URL = `${API_ROOT}/reorder_lists`;
export const ADD_NEW_ACTIVITY_URL = `${API_ROOT}/create_history_entry`;
export const GET_BOARD_ACTIVITY_URL = (boardId) =>
  `${API_ROOT}/get_history_entries/${boardId}`;
