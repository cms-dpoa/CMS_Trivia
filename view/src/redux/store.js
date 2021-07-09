import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import authReducer from "./ducks/authDucks";
import labelReducer from "./ducks/labelDucks";
import questionReducer from "./ducks/questionDucks";

const rootReducer = combineReducers({
  auth: authReducer,
  questions: questionReducer,
  labels: labelReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  const middleware = applyMiddleware(thunk);
  const compose = composeEnhancers(middleware);
  const store = createStore(rootReducer, compose);
  return store;
}
