import React, { Fragment } from "react";
import { Modal, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import { getQuestionsAction } from "../../redux/ducks/questionDucks";
import { createGameAction } from "../../redux/ducks/gameDucks";

const ModalGameDifficulty = ({ show, setShow, username }) => {
  const handleClose = () => setShow(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleStartGame = (difficultyMode) => {
    dispatch(getQuestionsAction(difficultyMode));
    dispatch(createGameAction(username));
    setTimeout(() => history.push("/play/millionaire"), 500);
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

const mapStateToProps = (state) => {
  return {
    username: state.auth.user.username,
  };
};

export default connect(mapStateToProps, null)(ModalGameDifficulty);
