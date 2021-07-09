import axios from "axios";
import { ENDPOINT_QUESTION } from "../endPoints";

//constants
const data = {
  array: [],
};
const GET_QUESTIONS = "GET_QUESTIONS";
const POST_QUESTION = "POST_QUESTION";
const UPDATE_QUESTION = "UPDATE_QUESTION";
const DELETE_QUESTION = "DELETE_QUESTION";

//Reducer
export default function productReducer(state = data, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return { ...state, array: action.payload };
    case POST_QUESTION:
      return state;
    case UPDATE_QUESTION:
      return state;
    case DELETE_QUESTION:
      window.location.reload();
      return state;
    default:
      return state;
  }
}

//Actions
export const getQuestionsAction = () => async (dispatch) => {
  try {
    const res = await axios.get(ENDPOINT_QUESTION + "commerce/");
    dispatch({
      type: GET_QUESTIONS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const postQuestionAction = (product) => async (dispatch) => {
  try {
    const res = await axios.post(ENDPOINT_QUESTION, product);
    dispatch({
      type: POST_QUESTION,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteQuestionAction = (IdProduct) => async (dispatch) => {
  try {
    const res = await axios.delete(ENDPOINT_QUESTION + IdProduct);
    dispatch({
      type: DELETE_QUESTION,
    });
  } catch (error) {
    console.log(error);
  }
};
