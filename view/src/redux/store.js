import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import productReducer from "./ducks/productDucks";
import authReducer from "./ducks/authDucks";
import categoryReducer from "./ducks/categoryDucks";

const rootReducer = combineReducers({
	products: productReducer,
	auth: authReducer,
	categories: categoryReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
	const middleware = applyMiddleware(thunk);
	const compose = composeEnhancers(middleware);
	const store = createStore(rootReducer, compose);
	return store;
}
