import axios from "axios";
import { ENDPOINT_PRODUCT } from "../endPoints";
import { getValueFromCookie } from "../../components/utils/auth";

//constants
const data = {
	array: [],
};
const GET_PRODUCTS = "GET_PRODUCTS";
const POST_PRODUCTS = "POST_PRODUCTS";
const UPDATE_PRODUCTS = "UPDATE_PRODUCTS";
const DELETE_PRODUCTS = "DELETE_PRODUCTS";

//Reducer
export default function productReducer(state = data, action) {
	switch (action.type) {
		case GET_PRODUCTS:
			return { ...state, array: action.payload };
		case POST_PRODUCTS:
			return state;
		case UPDATE_PRODUCTS:
			return state;
		case DELETE_PRODUCTS:
			window.location.reload();
			return state;
		default:
			return state;
	}
}

//Actions
export const getProductsAction = () => async (dispatch) => {
	try {
		const idUser = getValueFromCookie("id");
		const res = await axios.get(ENDPOINT_PRODUCT + "commerce/" + idUser);
		dispatch({
			type: GET_PRODUCTS,
			payload: res.data,
		});
	} catch (error) {
		console.log(error);
	}
};

export const postProductsAction = (product) => async (dispatch) => {
	try {
		const res = await axios.post(ENDPOINT_PRODUCT, product);
		dispatch({
			type: POST_PRODUCTS,
		});
	} catch (error) {
		console.log(error);
	}
};

export const deleteProductsAction = (IdProduct) => async (dispatch) => {
	try {
		const res = await axios.delete(ENDPOINT_PRODUCT + IdProduct);
		dispatch({
			type: DELETE_PRODUCTS,
		});
	} catch (error) {
		console.log(error);
	}
};
