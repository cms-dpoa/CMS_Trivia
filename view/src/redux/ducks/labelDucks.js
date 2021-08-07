import axios from "axios";
import { toast } from "react-toastify";
import configToast from "../../components/utils/ConfigToast";
import { ENDPOINT_LABEL } from "../endPoints";

const data = {
  array: [],
};

const GET_LABELS = "GET_LABELS";
const CREATE_NEW_LABEL = "CREATE_NEW_LABEL";

export default function labelReducer(state = data, action) {
  switch (action.type) {
    case GET_LABELS:
      return { ...state, array: action.payload };
    case CREATE_NEW_LABEL:
      return state;
    default:
      return state;
  }
}

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

export const createLabelAction = (label) => async (dispatch) => {
  try {
    const res = await axios.post(ENDPOINT_LABEL, label);
    const { status } = res;
    const { message } = res.data;
    if (status === 200) {
      if (Object.keys(res.data).length === 1)
        toast.warning(message, { ...configToast, className: "text-dark" });
      else toast.success(message, configToast);
    }

    dispatch({
      type: CREATE_NEW_LABEL,
    });
  } catch (error) {
    console.log(error);
  }
};
