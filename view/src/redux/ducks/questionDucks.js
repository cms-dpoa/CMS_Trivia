import axios from "axios";
import { ENDPOINT_QUESTION } from "../endPoints";

const data = {
  array: [],
};

const GET_QUESTIONS = "GET_QUESTIONS";
const GET_QUESTIONS_BY_ID = "GET_QUESTIONS_BY_ID";

export default function questionReducer(state = data, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return { ...state, array: action.payload };
    case GET_QUESTIONS_BY_ID:
      const { numQuestion, options } = action.payload;
      state.array[numQuestion].options = options;
      return state;
    // return { ...state, ...state.array.options: action.payload.options };
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

export const setShowFieldToFalse =
  (numQuestion, options) => async (dispatch) => {
    try {
      dispatch({
        type: GET_QUESTIONS_BY_ID,
        payload: { numQuestion, options },
      });
    } catch (error) {
      console.log(error);
    }
  };
