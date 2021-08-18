import React, { Fragment, useState } from "react";
import { Modal, Button, Col, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createReportProblemAction } from "../../../redux/ducks/reportProblemDuck";

const ModalReportProblem = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const [reportProblem, setReportProblem] = useState({
    title: "",
    description: "",
    status: "",
    user: "",
    dataset: -1,
  });

  const handleOnChange = (event) => {
    setReportProblem({
      ...reportProblem,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreateReportProblem = (event) => {
    event.preventDefault();
    dispatch(createReportProblemAction(reportProblem));
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
