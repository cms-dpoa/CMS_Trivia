import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import Body from "./components/Body";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Fragment>
      <NavBar />
      <Container>
        <Body />
      </Container>
    </Fragment>
  );
}

export default App;
