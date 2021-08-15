import React, { Fragment } from "react";
import Features from "../components/home/Features";
import InfoGame from "../components/home/InfoGame";
import Masthead from "../components/home/Masthead";
import Introduction from "../components/home/Introduction";
import "../components/home/Home.css";

const Home = () => {
  return (
    <Fragment>
      <Masthead />
      <Features />
      <Introduction />
      <InfoGame />
    </Fragment>
  );
};

export default Home;
