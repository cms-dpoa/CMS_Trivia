import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import authReducer from "./ducks/authDucks";
import labelReducer from "./ducks/labelDucks";
import analysisReducer from "./ducks/analysisDucks";
import questionReducer from "./ducks/questionDucks";
import voteReducer from "./ducks/voteDucks";
import gameReducer from "./ducks/gameDucks";
import scoreReducer from "./ducks/scoreDucks";

const rootReducer = combineReducers({
  labels: labelReducer,
  auth: authReducer,
  analysis: analysisReducer,
  questions: questionReducer,
  scores: scoreReducer,
  votes: voteReducer,
  game: gameReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  const middleware = applyMiddleware(thunk);
  const storeCompose = composeEnhancers(middleware);
  const store = createStore(rootReducer, storeCompose);
  return store;
}
