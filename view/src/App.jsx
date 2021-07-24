import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import GameSection from "./components/GameSection";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import MyScore from "./components/MyScore";
import Layout from "./components/Layout";
import generateStore from "./redux/store";
import DashBoard from "./components/dashboard/dashboard";
import MillionaireGame from "./components/MillionaireGame";

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
            <Route exact path="/dashboard" component={DashBoard} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
