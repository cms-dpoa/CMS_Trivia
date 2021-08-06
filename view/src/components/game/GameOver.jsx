import React, { useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteAllQuestionsGameOverAction } from "../../redux/ducks/questionDucks";

const GameOver = ({ score }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {}, []);

  const playAgainAction = () => {
    history.push("/play");
    dispatch(deleteAllQuestionsGameOverAction());
  };

  return (
    <Card className="text-center mt-5">
      <Card.Header as="h5">Game Over</Card.Header>
      <Card.Body>
        {/* <Card.Title>Special title treatment</Card.Title> */}
        <Card.Text>You did a great job!</Card.Text>
        <Button variant="primary" onClick={playAgainAction}>
          Play Again
        </Button>
      </Card.Body>
      <Card.Footer className="text-muted">Score: {score}</Card.Footer>
    </Card>
  );
};

export default GameOver;
