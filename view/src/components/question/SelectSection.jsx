import React, { useState, Fragment } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import ModalNewLabel from "./ModalNewLabel";
import { getLabels } from "../initData";

const SelectSection = ({ setAnswerSelected, setActivateBtnSendAnswer }) => {
  const labels = getLabels;

  const [showModalNewLabel, setShowModalNewLabel] = useState(false);
  const handleShowModalNewLabel = () => setShowModalNewLabel(true);

  const selectAnswer = () => {
    setActivateBtnSendAnswer(true);
  };

  return (
    <Fragment>
      <Form>
        <Form.Group as={Row} controlId="select-section" className="mb-0">
          <Col sm="3">
            <Form.Control as="select" custom onClick={selectAnswer}>
              <option>Select Label</option>
              {labels.map((label) => (
                <option key={label.id_label}>{label.name}</option>
              ))}
            </Form.Control>
          </Col>

          <Col lg="3">
            <Button
              variant="primary"
              className="pl-5 pr-5"
              onClick={handleShowModalNewLabel}
            >
              Add New Label
            </Button>
          </Col>
        </Form.Group>
      </Form>
      <ModalNewLabel show={showModalNewLabel} setShow={setShowModalNewLabel} />
    </Fragment>
  );
};

export default SelectSection;

// <div className="col-12 col-lg-5 mx-auto">
// <input
//   list="type-label"
//   name="label"
//   id="label"
//   placeholder="Select Label"
// />
// <datalist id="type-label">
//   <option value="Labrador"></option>
//   <option value="Schnauzer"></option>
//   <option value="Chiguagua"></option>
//   <option value="Pitbull"></option>
// </datalist>
// </div>
