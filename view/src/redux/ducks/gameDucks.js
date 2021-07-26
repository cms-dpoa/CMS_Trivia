import axios from "axios";
import { ENDPOINT_GAME, ENDPOINT_USER } from "../endPoints";

const data = {
  array: [],
  idGame: 0,
};

const GET_GAMES = "GET_GAMES";
const POST_GAME = "POST_GAME";

export default function gameReducer(state = data, action) {
  switch (action.type) {
    case GET_GAMES:
      return { ...state, array: action.payload };
    case POST_GAME:
      return { ...state, idGame: action.payload };
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

export const postGameAction = (username) => async (dispatch) => {
  try {
    const jsonNewGame = {
      username,
    };
    const res = await axios.post(ENDPOINT_USER, jsonNewGame);
    dispatch({
      type: POST_GAME,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
