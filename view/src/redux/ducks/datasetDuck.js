import axios from "axios";
import { toast } from "react-toastify";
import configToast from "../../components/utils/ConfigToast";
import { ENDPOINT_DATASET } from "../endPoints";

const data = {
  array: [],
};

const UPDATE_DATASET = "UPDATE_DATASET";

export default function datasetReducer(state = data, action) {
  switch (action.type) {
    case UPDATE_DATASET:
      return { ...state, array: action.payload };
    default:
      return state;
  }
}

export const updateDatasetAction = (jsonDataset) => async (dispatch) => {
  const res = await axios.put(
    `${ENDPOINT_DATASET}${jsonDataset.id_dataset}/`,
    jsonDataset
  );
  const { status } = res;
  if (status === 200) {
    toast.success("Dataset updated succefully", {
      ...configToast,
      className: "font-weight-bold",
    });
  }
  dispatch({
    type: UPDATE_DATASET,
  });
};
