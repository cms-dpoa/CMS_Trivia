import React, { Fragment } from "react";
import { Modal, Button, Col, Form } from "react-bootstrap";

const ModalNewLabel = (props) => {
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
          Put the name of the new label below.
          <Form className="mt-3">
            <Col>
              <Form.Group>
                <Form.Control type="text" placeholder="Name New Label" />
              </Form.Group>
            </Col>
          </Form>
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

export default ModalNewLabel;
