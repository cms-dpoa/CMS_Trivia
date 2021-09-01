import axios from "axios";
import { ENDPOINT_AUTH, ENDPOINT_USER } from "../endPoints";
import { setCokiesAuth, getAuthFromCookie } from "../../components/utils/auth";

const defaultUser = "defaultUser";

const data = {
  isAuth: false,
  token: "",
  user: {
    username: defaultUser,
    mean_score: 0,
    is_admin: false,
  },
};

const GET_AUTH = "GET_AUTH";
const SEND_AUTH = "SEND_AUTH";
const SET_AUTH_FROM_COOKIE = "SET_AUTH_FROM_COOKIE";

export default function authReducer(state = data, action) {
  switch (action.type) {
    case GET_AUTH:
      return state;

    case SEND_AUTH:
      // eslint-disable-next-line no-case-declarations
      const tempState = {
        ...state,
        user: action.payload,
        isAuth: true,
      };
      setCokiesAuth(tempState);
      return tempState;

    case SET_AUTH_FROM_COOKIE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export const sendAuthAction = (username) => async (dispatch) => {
  const res = await axios.get(`${ENDPOINT_USER + username}/`);
  const resData = res.data;
  // when the user don't exists in the DB yet
  if (resData.username === defaultUser) {
    resData.username = username;
  }
  dispatch({
    type: SEND_AUTH,
    payload: resData,
  });
};

export const getAuthAction = () => async (dispatch) => {
  // const res = await axios.get(ENDPOINT_AUTH);
  dispatch({
    type: GET_AUTH,
  });
};

export const setAuthFromCookieAction = () => async (dispatch) => {
  const infoAuth = getAuthFromCookie();
  dispatch({
    type: SET_AUTH_FROM_COOKIE,
    payload: infoAuth,
  });
};
