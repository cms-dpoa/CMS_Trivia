import React, { useEffect } from "react";
import { Tabs, Tab, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import MyOwnScore from "../components/score/MyOwnScore";
import Leaderboard from "../components/score/Leaderboard";
import { getAuthAction } from "../redux/ducks/authDucks";

const MyScore = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuthAction());
  }, []);

  return (
    <Container>
      <Tabs defaultActiveKey="my-score" transition={false} className="mb-3">
        <Tab eventKey="my-score" title="My Score">
          <MyOwnScore />
        </Tab>
        <Tab eventKey="leaderboard" title="Leaderboard">
          <Leaderboard />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default MyScore;
