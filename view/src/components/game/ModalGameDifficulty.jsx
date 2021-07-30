import React, { Fragment } from "react";
import { Modal, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const ModalGameDifficulty = ({ show, setShow }) => {
  const handleClose = () => setShow(false);
  const history = useHistory();

  const handleStartGame = (difficultyMode) => {
    console.log(difficultyMode);
    history.push("/play/millionaire");
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
          <Button
            className="mr-4 ml-4 pr-4 pl-4"
            onClick={() => handleStartGame("difficul")}
          >
            Difficult
          </Button>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </Fragment>
  );
};

export default ModalGameDifficulty;
