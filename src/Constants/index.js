const DEV_URL = "http://localhost:3000";
const PROD_URL = "http://trello-alpha4-api.herokuapp.com";
export const API_ROOT = process.env.NODE_ENV === 'development' ? DEV_URL : PROD_URL;
export const GET_BOARDS_URL = API_ROOT + "/index";
export const LOGIN_URL = "/login";
export const AUTH_URL = API_ROOT + "/authenticate";
export const CREATE_BOARD_URL = API_ROOT + "/create_board"
export const DELETE_BOARD_URL = API_ROOT + "/delete_board"