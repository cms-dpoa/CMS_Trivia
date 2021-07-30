import React, { useState, useEffect } from "react";
import { Spinner, Button, Container, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAuthAction } from "../redux/ducks/authDucks";
import { postGameAction } from "../redux/ducks/gameDucks";
import { getQuestionsAction } from "../redux/ducks/questionDucks";
import ModalGameDifficulty from "../components/game/ModalGameDifficulty";

const GameSection = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAuthAction());
  }, []);
  const user = useSelector((store) => store.auth.user);
  // const loadQuestion = useSelector((store) => store.questions.array);
  // const questions = Object.values(loadQuestion);

  const history = useHistory();
  const [isGameStarted, setIsGameStarted] = useState(false);
  // const [showModalDifficulty, setshowModalDifficulty] = useState(false);

  const handleStartGame = () => {
    setIsGameStarted(true);
    // setshowModalDifficulty(true);
    const { username } = user;
    // dispatch(getQuestionsAction());
    // console.log(questions);

    // if (questions.length > 0) {
    //   console.log(questions);
    // }

    // dispatch(postGameAction(username));

    // eslint-disable-next-line dot-notation
    const idGame = { id_game: 1 }["id_game"];

    // if (idGame !== 0) {
    //   history.push("/play/millionaire");
    // }
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
