import axios from "axios";
import { ENDPOINT_AUTH } from "../endPoints";

const data = {
  auth: false,
  token: "",
  user: {
    username: "josue",
    mean_score: 4.75,
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
  try {
    // const res = await axios.get(ENDPOINT_AUTH);
    dispatch({
      type: SEND_AUTH,
      payload: { username, mean_score: 3.75 },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAuthAction = () => async (dispatch) => {
  try {
    // const res = await axios.get(ENDPOINT_AUTH);
    dispatch({
      type: GET_AUTH,
    });
  } catch (error) {
    console.log(error);
  }
};
