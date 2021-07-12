import React, { Fragment } from "react";
import NavBar from "./NavBar";
import Footer from "./footer/Footer";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <NavBar />
      {children}
      <Footer />
    </Fragment>
  );
};

export default Layout;
