import React, { useState, Fragment, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch, connect } from "react-redux";
import ModalNewLabel from "./ModalNewLabel";
import { getLabelsAction } from "../../../redux/ducks/labelDucks";

const QuestionLevel2 = ({ setOptionSelected, setActivateBtnSendAnswer }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLabelsAction());
  }, []);

  const labels = useSelector((store) => store.labels.array);
  const [showModalNewLabel, setShowModalNewLabel] = useState(false);
  const handleShowModalNewLabel = () => setShowModalNewLabel(true);

  const handleSelectAnswer = (event) => {
    const label = event.target.value;
    setOptionSelected({ label });
    setActivateBtnSendAnswer(true);
  };

  const clearOptionSelected = (event) => {
    // eslint-disable-next-line no-param-reassign
    event.target.value = "";
  };

  return (
    <Fragment>
      <Form>
        <Form.Group as={Row} controlId="select-section" className="mb-0">
          <Col sm="6">
            <input
              className="form-control"
              list="datalistLabelsOptions"
              placeholder="Select Label..."
              onChange={handleSelectAnswer}
              onClick={clearOptionSelected}
            />
            <datalist id="datalistLabelsOptions">
              {labels.map((label) => (
                // eslint-disable-next-line jsx-a11y/control-has-associated-label
                <option key={label.id_label} value={label.name} />
              ))}
            </datalist>
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

const mapDispatchToProps = {
  // getAnalsysDataset,
};

// export default QuestionLevel2;
export default connect(null, null)(QuestionLevel2);
