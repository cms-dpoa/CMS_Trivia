/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import { useDispatch, connect } from "react-redux";
import { updateDatasetAction } from "../../redux/ducks/datasetDuck";
import { updateReportProblemAction } from "../../redux/ducks/reportProblemDuck";

const ModalEditDataset = ({ show, setShow, dataset, labels, problem }) => {
  const handleClose = () => setShow(false);
  const dispatch = useDispatch();

  const [labelSelected, setLabelSelected] = useState("");
  const activeLabels = labels.filter((label) => label.was_checked);

  useEffect(() => {
    if (dataset) setLabelSelected(dataset.original_label.name);
  }, [dataset]);

  const handleSelectOption = (event) => {
    const labelName = event.target.value;
    setLabelSelected(labelName);
  };

  const handleSaveAndFixProblem = () => {
    const problemChanged = { ...problem, status: "FINISHED" };
    dispatch(updateReportProblemAction(problemChanged));

    const idLabel = labels.find(
      (label) => label.name === labelSelected
    ).id_label;
    const datasetChanged = { ...dataset, original_label: idLabel };
    dispatch(updateDatasetAction(datasetChanged));
    handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Dataset Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          {dataset ? (
            <Row>
              <Col md={12}>
                <Row>
                  <dt className="col-sm-2">Title</dt>
                  <dd className="col-sm-10 text-capitalize">{dataset.title}</dd>
                  <dt className="col-sm-2">Label</dt>
                  <dd className="col-sm-10">
                    <Form id="edit-dataset-form">
                      <Form.Group
                        as={Row}
                        controlId="select-section"
                        className="mb-0"
                      >
                        <Container>
                          <Row>
                            <Col>
                              <input
                                className="form-control"
                                list="datalistLabelsOptions"
                                placeholder="Select Label..."
                                onChange={handleSelectOption}
                                defaultValue={dataset.original_label.name}
                              />
                              <datalist id="datalistLabelsOptions">
                                {activeLabels.map((label) => (
                                  <option
                                    key={label.id_label}
                                    value={label.name}
                                  />
                                ))}
                              </datalist>
                            </Col>
                          </Row>
                        </Container>
                      </Form.Group>
                    </Form>
                  </dd>
                </Row>
              </Col>
            </Row>
          ) : null}
        </Container>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Cancel
        </Button>

        <Button onClick={handleSaveAndFixProblem}>Save and fix problem</Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    labels: state.labels.array,
  };
};

export default connect(mapStateToProps, null)(ModalEditDataset);
