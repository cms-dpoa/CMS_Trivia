import axios from "axios";
import { ENDPOINT_QUESTION } from "../endPoints";

const data = {
  array: [],
};

const GET_QUESTIONS = "GET_QUESTIONS";
const DELETE_QUESTIONS_GAME_OVER = "DELETE_QUESTIONS_GAME_OVER";
const UPDATE_SHOW_FIELD_LIFELINE = "UPDATE_SHOW_FIELD_LIFELINE";

export default function questionReducer(state = data, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return { ...state, array: action.payload };
    case DELETE_QUESTIONS_GAME_OVER:
      return { array: action.payload };
    case UPDATE_SHOW_FIELD_LIFELINE:
      return state;
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

export const deleteAllQuestionsGameOverAction = () => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_QUESTIONS_GAME_OVER,
      payload: [],
    });
  } catch (error) {
    console.log(error);
  }
};

export const setShowFieldToFalse = (questions) => async (dispatch) => {
  try {
    const questionsCopy = Object.assign({}, questions);
    console.log(questionsCopy);

    dispatch({
      type: UPDATE_SHOW_FIELD_LIFELINE,
      payload: questionsCopy,
    });
  } catch (error) {
    console.log(error);
  }
};
