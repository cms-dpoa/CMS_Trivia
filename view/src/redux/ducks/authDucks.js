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

export default function authReducer(state = data, action) {
  switch (action.type) {
    case GET_AUTH:
      return state;
    default:
      return state;
  }
}

export const getAuthAction = () => async (dispatch) => {
  try {
    // const res = await axios.get(ENDPOINT_AUTH);
    dispatch({
      type: GET_AUTH,
      payload: [],
    });
  } catch (error) {
    console.log(error);
  }
};
