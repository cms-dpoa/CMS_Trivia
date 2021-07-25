import React from "react";
import { Tabs, Tab, Container } from "react-bootstrap";
import MyOwnScore from "../components/score/MyOwnScore";
import TopScore from "../components/score/TopScore";

const MyScore = () => {
  return (
    <Container>
      <Tabs defaultActiveKey="my-score" transition={false} className="mb-3">
        <Tab eventKey="my-score" title="My Score">
          <MyOwnScore />
        </Tab>
        <Tab eventKey="top-score" title="Top Scores">
          <TopScore />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default MyScore;
