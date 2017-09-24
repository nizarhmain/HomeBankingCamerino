import axios from "axios";
import setAuthorizationToken from "../utils/setAuthorizationToken";

const nodeEnv = process.env.NODE_ENV;
if (nodeEnv === 'production') {
    var link = "https://homebanking.camerino.herokuapp.com"
} else if (nodeEnv === 'development') {
    var link = "http://localhost:3000"
}


export function setCurrentUser(user) {
  return {
    type: "SET_CURRENT_USER",
    user
  };
}

export function login(data) {
  return dispatch => {
    return axios.post(link + "/users/authenticate", data);
  };
}

export function logout() {
  return dispatch => {
    localStorage.removeItem("jwtToken");
    setAuthorizationToken(false); // delete authorization header from future reqs
    dispatch(setCurrentUser({})); // user set to empty object
  };
}
