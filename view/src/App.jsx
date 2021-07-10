import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Body from "./components/Body";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import MyScore from "./components/MyScore";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/play" component={Body} />
          <Route exact path="/myscore" component={MyScore} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
