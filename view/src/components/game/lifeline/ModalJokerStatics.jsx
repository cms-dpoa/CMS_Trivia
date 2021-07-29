import React, { Fragment } from "react";
import { Modal, Button } from "react-bootstrap";
import TopReliability from "../../dashboard/charts/TopReliability";

const ModalJokerStatics = ({ show, setShow, labels }) => {
  const handleClose = () => setShow(false);

  const amplitudes = [5, 9, 7, 2];

  return (
    <Fragment>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="lg"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Statistics Joker</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TopReliability labels={labels} amplitudes={amplitudes} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default ModalJokerStatics;
