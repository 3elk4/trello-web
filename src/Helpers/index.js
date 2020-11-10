import * as Constants from "../Constants";

export async function isLogged(token) {
  if (token === null) return false;
  const requestOps = {
    method: "GET",
    headers: { Authorization: token },
  };
  return await fetch(Constants.GET_BOARDS_URL, requestOps).then((response) => {
    return response.ok ? true : false;
  });
}
