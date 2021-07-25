import axios from "axios";
import { ENDPOINT_GAME } from "../endPoints";

const data = {
  array: [],
};

const GET_GAMES = "GET_GAMES";
const POST_GAME = "POST_GAME";

export default function gameReducer(state = data, action) {
  switch (action.type) {
    case GET_GAMES:
      return { ...state, array: action.payload };
    case POST_GAME:
      return state;
    default:
      return state;
  }
}

export const getGamesAction = () => async (dispatch) => {
  try {
    const res = await axios.get(ENDPOINT_GAME);
    dispatch({
      type: GET_GAMES,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const postGameAction = (label) => async (dispatch) => {
  try {
    const res = await axios.post(ENDPOINT_GAME, label);
    dispatch({
      type: POST_GAME,
    });
  } catch (error) {
    console.log(error);
  }
};
