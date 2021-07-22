import axios from "axios";
import { ENDPOINT_ANALYSIS } from "../endPoints";

const data = {
  array: [],
};

const GET_ANALYSIS = "GET_ANALYSIS";

export default function analysisReducer(state = data, action) {
  switch (action.type) {
    case GET_ANALYSIS:
      return { ...state, array: action.payload };
    default:
      return state;
  }
}

export const getAnalisisAction = () => async (dispatch) => {
  try {
    const res = await axios.get(ENDPOINT_ANALYSIS);
    dispatch({
      type: GET_ANALYSIS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
