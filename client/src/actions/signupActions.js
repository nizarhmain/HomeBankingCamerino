import axios from "axios";

const nodeEnv = process.env.NODE_ENV;
if (nodeEnv === 'production') {
    var link = "https://homebanking.camerino.herokuapp.com"
} else if (nodeEnv === 'development') {
    var link = "http://localhost:3000"
}

export function userSignupRequest(userData) {
  return dispatch => {
    return axios.post(link + "/users/register", userData);
  };
}
