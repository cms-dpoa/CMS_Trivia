import axios from "axios";
import { ENDPOINT_QUESTION } from "../endPoints";

const data = {
  array: [],
};

const GET_QUESTIONS = "GET_QUESTIONS";
const DELETE_QUESTIONS_GAME_OVER = "DELETE_QUESTIONS_GAME_OVER";

export default function questionReducer(state = data, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return { ...state, array: action.payload };
    case DELETE_QUESTIONS_GAME_OVER:
      return { array: action.payload };
    default:
      return state;
  }
}

export const getQuestionsAction = (mode) => async (dispatch) => {
  const params = { params: { mode } };
  const res = await axios.get(ENDPOINT_QUESTION, params);
  dispatch({
    type: GET_QUESTIONS,
    payload: res.data,
  });
};

export const deleteAllQuestionsGameOverAction = () => async (dispatch) => {
  dispatch({
    type: DELETE_QUESTIONS_GAME_OVER,
    payload: [],
  });
};
