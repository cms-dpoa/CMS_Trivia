import axios from "axios";
import { ENDPOINT_VOTE } from "../endPoints";

const data = {
  array: [],
};

const SEND_VOTE = "SEND_VOTE";

export default function voteReducer(state = data, action) {
  switch (action.type) {
    case SEND_VOTE:
      return state;
    default:
      return state;
  }
}

export const sendVoteAction =
  (dataset, label, user, game, knowledgeLevel) => async (dispatch) => {
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
  };
