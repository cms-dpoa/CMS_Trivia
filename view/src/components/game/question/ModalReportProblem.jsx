import React, { Fragment, useState } from "react";
import { Modal, Button, Col, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
// import { createLabelAction } from "../../../redux/ducks/labelDucks";

const ModalReportProblem = ({ show, setShow }) => {
  const handleClose = () => setShow(false);
  const [reportProblem, setReportProblem] = useState({ problem: "" });
  // const dispatch = useDispatch();

  const handleOnChange = (event) => {
    setReportProblem({
      ...reportProblem,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreateReportProblem = (event) => {
    event.preventDefault();
    // dispatch(createLabelAction(reportProblem));
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
          <Modal.Title>Report Problem</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please specify the problem you have:
          <Form className="mt-3">
            <Col>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="What's the problem?"
                  name="problem"
                  onChange={handleOnChange}
                />
              </Form.Group>
            </Col>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateReportProblem}>
            Send Report
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default ModalReportProblem;
