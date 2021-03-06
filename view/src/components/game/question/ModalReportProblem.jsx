import React, { Fragment, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, connect } from "react-redux";
import { createReportProblemAction } from "../../../redux/ducks/reportProblemDuck";

const ModalReportProblem = ({ show, setShow, username, questions }) => {
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const [reportProblem, setReportProblem] = useState({
    title: "",
    description: "",
    suggested_solution: "",
    user: username,
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
    const dataset = Object.values(questions).find(
      (question) => question.title === reportProblem.dataset
    ).id_data;

    dispatch(createReportProblemAction({ ...reportProblem, dataset }));
  };

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
          <Modal.Title>Report Problem</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form>
            <Form.Group>
              <Form.Label className="font-weight-bold">Title*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                onChange={handleOnChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="font-weight-bold">
                Describle the problem*
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Describle the problem"
                name="description"
                onChange={handleOnChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="font-weight-bold">Dataset*</Form.Label>
              <Form.Control
                as="select"
                name="dataset"
                onChange={handleOnChange}
              >
                <option hidden>Select Dataset</option>
                {Object.values(questions).map((question) => (
                  <option key={question.id_data}>{question.title}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label className="font-weight-bold">Solution*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Suggest a solution"
                name="suggested_solution"
                onChange={handleOnChange}
              />
            </Form.Group>
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

const mapStateToProps = (state) => {
  return {
    username: state.auth.user.username,
    questions: state.questions.array,
  };
};

export default connect(mapStateToProps, null)(ModalReportProblem);
