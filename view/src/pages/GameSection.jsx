import React, { useState, useEffect } from "react";
import { Spinner, Button, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getAuthAction } from "../redux/ducks/authDucks";
import ModalGameDifficulty from "../components/game/ModalGameDifficulty";

const GameSection = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuthAction());
  }, []);

  const [isGameStarted, setIsGameStarted] = useState(false);

  const handleStartGame = () => {
    setIsGameStarted(true);
  };

  return (
    <Container className="text-center mt-5 pt-5">
      <ModalGameDifficulty show={isGameStarted} setShow={setIsGameStarted} />
      <h1 className="mt-5 mb-5">Who wants to be a Millionaire? CMS edition</h1>
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
