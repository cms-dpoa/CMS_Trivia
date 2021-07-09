import axios from "axios";
import { ENDPOINT_LABEL } from "../endPoints";

//constants
const data = {
  array: [],
};

const GET_LABELS = "GET_LABELS";
const POST_LABEL = "POST_LABEL";
const UPDATE_LABEL = "UPDATE_LABEL";
const DELETE_LABEL = "DELETE_LABEL";

//Reducer
export default function labelReducer(state = data, action) {
  switch (action.type) {
    case GET_LABELS:
      return { ...state, array: action.payload };
    case POST_LABEL:
      return state;
    case UPDATE_LABEL:
      return state;
    case DELETE_LABEL:
      window.location.reload();
      return state;
    default:
      return state;
  }
}

//Actions
export const getLabelsAction = () => async (dispatch) => {
  try {
    const res = await axios.get(ENDPOINT_LABEL);
    dispatch({
      type: GET_LABELS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const postLabelAction = (label) => async (dispatch) => {
  try {
    const res = await axios.post(ENDPOINT_LABEL, label);
    dispatch({
      type: POST_LABEL,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteLabelAction = (IdLabel) => async (dispatch) => {
  try {
    const res = await axios.delete(ENDPOINT_LABEL + IdLabel);
    dispatch({
      type: DELETE_LABEL,
    });
  } catch (error) {
    console.log(error);
  }
};
