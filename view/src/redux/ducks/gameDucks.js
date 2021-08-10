import axios from "axios";
import { ENDPOINT_GAME, ENDPOINT_USER } from "../endPoints";

const data = {
  array: [],
  idGame: 0,
};

const GET_GAMES = "GET_GAMES";
const CREATE_GAME = "CREATE_GAME";
const GAME_OVER = "GAME_OVER";
const SEND_SCORE_GAME_LEVEL_1 = "SEND_SCORE_GAME_LEVEL_1";

export default function gameReducer(state = data, action) {
  switch (action.type) {
    case GET_GAMES:
      return { ...state, array: action.payload };
    case CREATE_GAME:
      return { ...state, idGame: action.payload };
    case GAME_OVER:
      return { ...state, idGame: 0 };
    case SEND_SCORE_GAME_LEVEL_1:
      return state;
    default:
      return state;
  }
}

export const getGamesAction = () => async (dispatch) => {
  const res = await axios.get(ENDPOINT_GAME);
  dispatch({
    type: GET_GAMES,
    payload: res.data,
  });
};

export const createGameAction = (username) => async (dispatch) => {
  const newGame = {
    username,
  };
  const res = await axios.post(ENDPOINT_USER, newGame);
  dispatch({
    type: CREATE_GAME,
    payload: res.data.id_game,
  });
};

export const sendScoreGameLevel1Action =
  (username, score, idGame) => async (dispatch) => {
    const sendScoreGame = {
      username,
      score,
      id_game: idGame,
    };
    console.log(sendScoreGame);
    const res = await axios.put(`${ENDPOINT_GAME}${idGame}/`, sendScoreGame);
    console.log(res.data);
    dispatch({
      type: SEND_SCORE_GAME_LEVEL_1,
    });
  };

export const gameOverAction = () => async (dispatch) => {
  dispatch({
    type: GAME_OVER,
  });
};
