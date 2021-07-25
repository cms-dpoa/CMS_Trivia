import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import authReducer from "./ducks/authDucks";
import labelReducer from "./ducks/labelDucks";
import analysisReducer from "./ducks/analysisDucks";
import questionReducer from "./ducks/questionDucks";
import dataReducer from "./ducks/datasDucks";
import voteReducer from "./ducks/voteDucks";

const rootReducer = combineReducers({
  labels: labelReducer,
  auth: authReducer,
  analysis: analysisReducer,
  questions: questionReducer,
  datas: dataReducer,
  votes: voteReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  const middleware = applyMiddleware(thunk);
  const storeCompose = composeEnhancers(middleware);
  const store = createStore(rootReducer, storeCompose);
  return store;
}
