import axios from "axios";
import { ENDPOINT_DATA } from "../endPoints";

const data = {
  array: [],
};

const GET_DATAS = "GET_DATAS";

export default function dataReducer(state = data, action) {
  switch (action.type) {
    case GET_DATAS:
      return { ...state, array: action.payload };
    default:
      return state;
  }
}

export const getDatasAction = () => async (dispatch) => {
  try {
    const res = await axios.get(ENDPOINT_DATA);
    dispatch({
      type: GET_DATAS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
