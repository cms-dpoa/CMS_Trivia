import React, { Fragment, useLayoutEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch, connect } from "react-redux";
import { getQuestionsAction } from "../../redux/ducks/questionDucks";

const ModalGameDifficulty = ({ show, setShow }) => {
  const handleClose = () => setShow(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleStartGame = (difficultyMode) => {
    dispatch(getQuestionsAction());
    console.log(difficultyMode);
    // wait until the questions load
    setTimeout(() => history.push("/play/millionaire"), 400);
  };

  return (
    <Fragment>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="md"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Difficulty of the game</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Button
            className="mr-4 ml-4 pr-4 pl-4"
            onClick={() => handleStartGame("easy")}
          >
            Easy
          </Button>
          <Button
            className="mr-4 ml-4 pr-4 pl-4"
            onClick={() => handleStartGame("normal")}
          >
            Normal
          </Button>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default ModalGameDifficulty;
