import axios from "axios";
import { ENDPOINT_REPORT_PROBLEMS } from "../endPoints";

const data = {
  array: [],
};

const GET_REPORT_PROBLEMS = "GET_REPORT_PROBLEMS";

export default function reportProblemReducer(state = data, action) {
  switch (action.type) {
    case GET_REPORT_PROBLEMS:
      return { ...state, array: action.payload };
    default:
      return state;
  }
}

export const getReportProblemsAction = () => async (dispatch) => {
  const res = await axios.get(ENDPOINT_REPORT_PROBLEMS);
  dispatch({
    type: GET_REPORT_PROBLEMS,
    payload: res.data,
  });
};
