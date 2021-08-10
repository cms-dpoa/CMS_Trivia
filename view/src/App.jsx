import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import GameSection from "./pages/GameSection";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import MyScore from "./pages/MyScore";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import generateStore from "./redux/store";
import MillionaireGame from "./components/game/MillionaireGame";
import Manage from "./pages/Manage";
import ProblemDetails from "./components/manage/ProblemDetails";

function App() {
  const store = generateStore();

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/play" />} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/play" component={GameSection} />
            <Route exact path="/play/millionaire" component={MillionaireGame} />
            <Route exact path="/myscore" component={MyScore} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/manage" component={Manage} />
            <Route
              exact
              path="/manage/problemDetails"
              component={ProblemDetails}
            />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
