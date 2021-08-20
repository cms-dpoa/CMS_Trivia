import axios from "axios";
import { ENDPOINT_AUTH, ENDPOINT_USER } from "../endPoints";

const data = {
  auth: false,
  token: "",
  user: {
    username: "defaultUser",
    mean_score: 0,
    is_admin: false,
  },
};

const GET_AUTH = "GET_AUTH";
const SEND_AUTH = "SEND_AUTH";

export default function authReducer(state = data, action) {
  switch (action.type) {
    case GET_AUTH:
      return state;
    case SEND_AUTH:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

export const sendAuthAction = (username) => async (dispatch) => {
  const res = await axios.get(`${ENDPOINT_USER + username}/`);
  dispatch({
    type: SEND_AUTH,
    payload: res.data,
  });
};

export const getAuthAction = () => async (dispatch) => {
  // const res = await axios.get(ENDPOINT_AUTH);
  dispatch({
    type: GET_AUTH,
  });
};
