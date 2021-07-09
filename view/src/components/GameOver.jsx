import React from "react";
import { Card, Button } from "react-bootstrap";

const GameOver = ({ resetGameAction }) => {
  const playAgainAction = () => {
    resetGameAction();
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
      <Card.Footer className="text-muted">Score: 5</Card.Footer>
    </Card>
  );
};

export default GameOver;
