import axios from "axios";
import { ENDPOINT_VOTE } from "../endPoints";

const data = {
  array: [],
};

const GET_VOTES = "GET_VOTES";
const POST_VOTE = "POST_VOTE";

export default function voteReducer(state = data, action) {
  switch (action.type) {
    case GET_VOTES:
      return { ...state, array: action.payload };
    case POST_VOTE:
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

export const postVoteAction = (label) => async (dispatch) => {
  try {
    const res = await axios.post(ENDPOINT_VOTE, label);
    dispatch({
      type: POST_VOTE,
    });
  } catch (error) {
    console.log(error);
  }
};
