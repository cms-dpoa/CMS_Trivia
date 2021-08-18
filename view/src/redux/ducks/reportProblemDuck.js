import axios from "axios";
import { toast } from "react-toastify";
import configToast from "../../components/utils/ConfigToast";
import { ENDPOINT_REPORT_PROBLEMS } from "../endPoints";

const data = {
  array: [],
};

const GET_REPORT_PROBLEMS = "GET_REPORT_PROBLEMS";
const CREATE_REPORT_PROBLEM = "CREATE_REPORT_PROBLEM";
const UPDATE_REPORT_PROBLEM = "UPDATE_REPORT_PROBLEM";

export default function reportProblemReducer(state = data, action) {
  switch (action.type) {
    case GET_REPORT_PROBLEMS:
      return { ...state, array: action.payload };
    case CREATE_REPORT_PROBLEM:
      return state;
    case UPDATE_REPORT_PROBLEM:
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

export const createReportProblemAction = (infoReport) => async (dispatch) => {
  const res = await axios.post(ENDPOINT_REPORT_PROBLEMS, infoReport);
  const { status } = res;
  const { message } = res.data;
  if (status === 200) {
    if (Object.keys(res.data).length === 1)
      toast.warning(message, { ...configToast, className: "text-dark" });
    else toast.success(message, configToast);
  }
  dispatch({
    type: CREATE_REPORT_PROBLEM,
  });
};

export const updateReportProblemAction = (jsonReport) => async (dispatch) => {
  await axios.put(
    `${ENDPOINT_REPORT_PROBLEMS}${jsonReport.id_label}/`,
    jsonReport
  );
  const res = await axios.get(ENDPOINT_REPORT_PROBLEMS);
  dispatch({
    type: UPDATE_REPORT_PROBLEM,
    payload: res.data,
  });
};
