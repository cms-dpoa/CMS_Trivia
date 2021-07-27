import React, { Fragment } from "react";
import { Modal, Button } from "react-bootstrap";
import TopReliability from "../../dashboard/charts/TopReliability";

const ModalJokerStatics = (props) => {
  const handleClose = () => props.setShow(false);

  return (
    <Fragment>
      <Modal
        show={props.show}
        onHide={handleClose}
        backdrop="static"
        size="md"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>New Label</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TopReliability />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Create</Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default ModalJokerStatics;
