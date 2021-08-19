import axios from "axios";
import { ENDPOINT_ANALYSIS } from "../endPoints";

const data = {
  array: [],
  votesLifeline: null,
};

const GET_ANALYSIS = "GET_ANALYSIS";
const LIFELINE_VOTES_BY_DATASET = "LIFELINE_VOTES_BY_DATASET";

export default function analysisReducer(state = data, action) {
  switch (action.type) {
    case GET_ANALYSIS:
      return { ...state, array: action.payload };
    case LIFELINE_VOTES_BY_DATASET:
      return { ...state, votesLifeline: action.payload };
    default:
      return state;
  }
}

export const getAnalisisAction = () => async (dispatch) => {
  const res = await axios.get(ENDPOINT_ANALYSIS);
  dispatch({
    type: GET_ANALYSIS,
    payload: res.data,
  });
};

export const getVotesByDatasetAndCateroriesAction =
  (idDataset, labels) => async (dispatch) => {
    const params = {
      params: {
        idDataset,
        label_1: labels[0],
        label_2: labels[1],
        label_3: labels[2],
        label_4: labels[3],
      },
    };
    const res = await axios.get(ENDPOINT_ANALYSIS, params);
    dispatch({
      type: LIFELINE_VOTES_BY_DATASET,
      payload: res.data,
    });
  };
