import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import NavBar from "./NavBar";
import Footer from "./footer/Footer";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <NavBar />
      <Container id="body-container" fluid>
        {children}
      </Container>
      <Footer />
    </Fragment>
  );
};

export default Layout;
