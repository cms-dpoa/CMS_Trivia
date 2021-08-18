import axios from "axios";
import { toast } from "react-toastify";
import configToast from "../../components/utils/ConfigToast";
import { ENDPOINT_LABEL } from "../endPoints";

const data = {
  array: [],
};

const GET_LABELS = "GET_LABELS";
const CREATE_NEW_LABEL = "CREATE_NEW_LABEL";
const UPDATE_LABEL = "UPDATE_LABEL";
const DELETE_LABEL = "DELETE_LABEL";

export default function labelReducer(state = data, action) {
  switch (action.type) {
    case GET_LABELS:
      return { ...state, array: action.payload };
    case CREATE_NEW_LABEL:
      return state;
    case UPDATE_LABEL:
      return { ...state, array: action.payload };
    case DELETE_LABEL:
      return { ...state, array: action.payload };
    default:
      return state;
  }
}

export const getLabelsAction =
  (excludeMiscellaneous, checked, created) => async (dispatch) => {
    const params = {
      params: {
        exclude_miscellaneous: excludeMiscellaneous,
        created,
        checked,
      },
    };
    const res = await axios.get(ENDPOINT_LABEL, params);
    dispatch({
      type: GET_LABELS,
      payload: res.data,
    });
  };

export const createLabelAction = (label) => async (dispatch) => {
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
};

export const updateLabelsAction = (jsonLabel) => async (dispatch) => {
  await axios.put(`${ENDPOINT_LABEL}${jsonLabel.id_label}/`, jsonLabel);
  const params = {
    params: {
      checked: false,
    },
  };
  const res = await axios.get(ENDPOINT_LABEL, params);
  dispatch({
    type: UPDATE_LABEL,
    payload: res.data,
  });
};

export const deleteLabelsAction = (idLabel) => async (dispatch) => {
  await axios.delete(`${ENDPOINT_LABEL}${idLabel}/`);
  const params = {
    params: {
      checked: false,
    },
  };
  const res = await axios.get(ENDPOINT_LABEL, params);
  dispatch({
    type: DELETE_LABEL,
    payload: res.data,
  });
};
