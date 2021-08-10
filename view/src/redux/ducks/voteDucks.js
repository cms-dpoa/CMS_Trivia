import axios from "axios";
import { ENDPOINT_VOTE } from "../endPoints";

const data = {
  array: [],
};

const GET_VOTES = "GET_VOTES";
const SEND_VOTE = "SEND_VOTE";

export default function voteReducer(state = data, action) {
  switch (action.type) {
    case GET_VOTES:
      return { ...state, array: action.payload };
    case SEND_VOTE:
      return state;
    default:
      return state;
  }
}

export const getVotesAction = () => async (dispatch) => {
  try {
    const res = await axios.get(ENDPOINT_VOTE);
    dispatch({
      type: GET_VOTES,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendVoteAction =
  (dataset, label, user, game, knowledgeLevel) => async (dispatch) => {
    try {
      const bodyVote = {
        dataset,
        label,
        user,
        game,
        knowledgeLevel,
      };
      console.log(bodyVote);
      const res = await axios.post(ENDPOINT_VOTE, bodyVote);
      console.log(res.data);
      dispatch({
        type: SEND_VOTE,
      });
    } catch (error) {
      console.log(error);
    }
  };
