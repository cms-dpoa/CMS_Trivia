import axios from "axios";
import { toast } from "react-toastify";
import configToast from "../../components/utils/ConfigToast";
import { ENDPOINT_USER } from "../endPoints";

const data = {
  array: [],
};

const GET_USERS = "GET_USERS";
const UPDATE_USER = "UPDATE_USER";

export default function userReducer(state = data, action) {
  switch (action.type) {
    case GET_USERS:
      return { ...state, array: action.payload };
    case UPDATE_USER:
      return { ...state, array: action.payload };
    default:
      return state;
  }
}

export const getUsersAction = () => async (dispatch) => {
  const res = await axios.get(ENDPOINT_USER);
  dispatch({
    type: GET_USERS,
    payload: res.data,
  });
};

export const updateUserAction = (dataUser) => async (dispatch) => {
  const res = await axios.put(
    `${ENDPOINT_USER}${dataUser.username}/`,
    dataUser
  );
  const { status } = res;
  if (status === 200) {
    toast.success("User updated succefully", {
      ...configToast,
      className: "font-weight-bold",
    });
  }

  const resUsers = await axios.get(ENDPOINT_USER);
  dispatch({
    type: UPDATE_USER,
    payload: resUsers.data,
  });
};
