import React, { useState } from "react";
import { Spinner, Button, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const GameSection = () => {
  const history = useHistory();
  const [isGameStarted, setIsGameStarted] = useState(false);

  const handleStartGame = () => {
    setIsGameStarted(true);
    history.push("/play/millionaire");
  };

  return (
    <Container className="text-center mt-5 pt-5">
      <h1>Who want to be a millionaire at CMS</h1>
      <Button
        className="pr-5 pl-5 mt-5"
        onClick={handleStartGame}
        disabled={isGameStarted}
      >
        {isGameStarted ? (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="mr-2"
            />
            Loading...
          </>
        ) : (
          "Start Game"
        )}
      </Button>
    </Container>
  );
};

export default GameSection;
