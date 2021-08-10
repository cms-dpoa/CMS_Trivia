import axios from "axios";
import { ENDPOINT_LEADERBOARD, ENDPOINT_MY_SCORE } from "../endPoints";

const data = {
  leaderboards: [],
  myScores: [],
};

const GET_LEADERBOARD = "GET_LEADERBOARD";
const GET_MY_SCORES = "GET_MY_SCORES";

export default function scoreReducer(state = data, action) {
  switch (action.type) {
    case GET_LEADERBOARD:
      return { ...state, leaderboards: action.payload };
    case GET_MY_SCORES:
      return { ...state, myScores: action.payload };
    default:
      return state;
  }
}

export const getLeaderBoardAction = () => async (dispatch) => {
  const res = await axios.get(ENDPOINT_LEADERBOARD);
  dispatch({
    type: GET_LEADERBOARD,
    payload: res.data,
  });
};

export const getMyScoresAction = (username) => async (dispatch) => {
  const params = { params: { user: username } };
  const res = await axios.get(ENDPOINT_MY_SCORE, params);

  dispatch({
    type: GET_MY_SCORES,
    payload: res.data,
  });
};
