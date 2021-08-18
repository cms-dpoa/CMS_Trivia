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
  let isThereError = false;
  const res = await axios
    .post(ENDPOINT_REPORT_PROBLEMS, infoReport)
    .catch((error) => {
      if (error.response) {
        isThereError = true;
        const errors = error.response.data;
        Object.keys(errors).map((keyError) =>
          toast.error(`${keyError} - ${errors[keyError][0]}`, {
            ...configToast,
            autoClose: 6000,
          })
        );
      }
    });

  if (!isThereError) {
    const { status } = res;
    const { message } = res.data;
    if (status === 201) toast.success(message, configToast);

    dispatch({
      type: CREATE_REPORT_PROBLEM,
    });
  }
};

export const updateReportProblemAction = (infoReport) => async (dispatch) => {
  await axios.put(
    `${ENDPOINT_REPORT_PROBLEMS}${infoReport.id_report_problem}/`,
    infoReport
  );
  const res = await axios.get(ENDPOINT_REPORT_PROBLEMS);
  dispatch({
    type: UPDATE_REPORT_PROBLEM,
    payload: res.data,
  });
};
