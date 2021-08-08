import React, { Fragment, useState } from "react";
import { Modal, Button, Col, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createLabelAction } from "../../../redux/ducks/labelDucks";

const ModalNewLabel = ({ show, setShow }) => {
  const handleClose = () => setShow(false);
  const [newLabel, setNewLabel] = useState({ name: "" });
  const dispatch = useDispatch();

  const handleOnChange = (event) => {
    setNewLabel({
      ...newLabel,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreateNewLabel = (event) => {
    event.preventDefault();
    dispatch(createLabelAction(newLabel));
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
          <Modal.Title>New Label</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Put the name of the new label below.
          <Form className="mt-3">
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Name New Label"
                  name="name"
                  onChange={handleOnChange}
                />
              </Form.Group>
            </Col>

            <p className="font-italic">
              <span className="font-weight-bold">Note:</span> The administrators
              will evaluate your request to add this new label to the list.
            </p>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateNewLabel}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default ModalNewLabel;
