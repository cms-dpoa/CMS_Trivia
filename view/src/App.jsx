import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import Body from "./components/Body";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import MyScore from "./components/MyScore";
import Layout from "./components/Layout";
import generateStore from "./redux/store";

function App() {
  const store = generateStore();

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/play" />} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/play" component={Body} />
            <Route exact path="/myscore" component={MyScore} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
