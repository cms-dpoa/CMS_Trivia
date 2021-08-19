import React, { useState, Fragment } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateReportProblemAction } from "../../redux/ducks/reportProblemDuck";
import ModalEditDataset from "./ModalEditDataset";

const ModalProblemDetails = ({ show, setShow, problem }) => {
  const handleClose = () => setShow(false);
  const dispatch = useDispatch();

  const [showModalEditDataset, setShowModalEditDataset] = useState(false);

  const handleGoToFixProblem = () => {
    setShowModalEditDataset(true);
    handleClose();
  };

  const handleMarkAsFinished = () => {
    const problemChanged = { ...problem, status: "FINISHED" };
    dispatch(updateReportProblemAction(problemChanged));
    handleClose();
  };

  return (
    <Fragment>
      <ModalEditDataset
        show={showModalEditDataset}
        setShow={setShowModalEditDataset}
        dataset={problem ? problem.dataset : null}
        problem={problem}
      />

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Problem Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            {problem ? (
              <Row>
                <Col md={12}>
                  <Row>
                    <dt className="col-sm-3">Title</dt>
                    <dd className="col-sm-9 text-capitalize">
                      {problem.title}
                    </dd>
                    <dt className="col-sm-3">Description</dt>
                    <dd className="col-sm-9">{problem.description}</dd>
                    <dt className="col-sm-3">Dataset</dt>
                    <dd className="col-sm-9">{problem.dataset.title}</dd>
                    <dt className="col-sm-3">Suggested Solution</dt>
                    <dd className="col-sm-9">{problem.suggested_solution}</dd>
                    <dt className="col-sm-3">User</dt>
                    <dd className="col-sm-9">{problem.user.username}</dd>
                    <dt className="col-sm-3">Status</dt>
                    <dd className="col-sm-9">{problem.status}</dd>
                    <dt className="col-sm-3">Date</dt>
                    <dd className="col-sm-9">{problem.date}</dd>
                  </Row>
                </Col>
              </Row>
            ) : null}
          </Container>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={handleMarkAsFinished}>
            Mark as finished
          </Button>
          <Button onClick={handleGoToFixProblem}>Go to fix problem</Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default ModalProblemDetails;
