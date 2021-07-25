import axios from "axios";
import { ENDPOINT_QUESTION } from "../endPoints";

const data = {
  array: [],
};

const GET_QUESTIONS = "GET_QUESTIONS";

export default function questionReducer(state = data, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return { ...state, array: action.payload };
    default:
      return state;
  }
}

export const getQuestionsAction = () => async (dispatch) => {
  try {
    const res = await axios.get(ENDPOINT_QUESTION);
    dispatch({
      type: GET_QUESTIONS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
