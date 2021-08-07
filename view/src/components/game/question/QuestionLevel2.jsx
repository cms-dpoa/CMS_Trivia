import React, { useState, Fragment, useEffect } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { useSelector, useDispatch, connect } from "react-redux";
import ModalNewLabel from "./ModalNewLabel";
import { getLabelsAction } from "../../../redux/ducks/labelDucks";

const QuestionLevel2 = ({
  setOptionSelected,
  setActivateBtnSendAnswer,
  isOptionSelected,
}) => {
  const { isOptionLevel2Selected, setIsOptionLevel2Selected } =
    isOptionSelected;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLabelsAction());
  }, []);

  const labels = useSelector((store) => store.labels.array);
  const [showModalNewLabel, setShowModalNewLabel] = useState(false);
  const handleShowModalNewLabel = () => setShowModalNewLabel(true);

  const handleSelectOption = (event) => {
    const label = event.target.value;
    setOptionSelected({ label });
    setIsOptionLevel2Selected(true);
  };

  const handelKnowledgeLevel = (knowledgeLevel) => {
    console.log(knowledgeLevel);
    setActivateBtnSendAnswer(true);
  };

  const clearOptionSelected = (event) => {
    // eslint-disable-next-line no-param-reassign
    event.target.value = "";
    setIsOptionLevel2Selected(false);
  };

  const datasetKnowledgeLevel = [
    "I know this dataset for sure",
    "I think I know but it may be wrong",
    "I'm just guessing",
  ];

  return (
    <Fragment>
      <Form id="question-level-2-form">
        <Form.Group as={Row} controlId="select-section" className="mb-0">
          <Container>
            <Row>
              <Col>
                <input
                  className="form-control"
                  list="datalistLabelsOptions"
                  placeholder="Select Label..."
                  onChange={handleSelectOption}
                  onClick={clearOptionSelected}
                />
                <datalist id="datalistLabelsOptions">
                  {labels.map((label) => (
                    // eslint-disable-next-line jsx-a11y/control-has-associated-label
                    <option key={label.id_label} value={label.name} />
                  ))}
                </datalist>
              </Col>
            </Row>

            <Row>
              <Col>
                {datasetKnowledgeLevel.map((knowledgeLevel, index) => (
                  <div key={knowledgeLevel} className="mt-2">
                    <Form.Check
                      inline
                      label={knowledgeLevel}
                      name="group1"
                      type="radio"
                      id={`inline-radio-${index}`}
                      disabled={!isOptionLevel2Selected}
                      onClick={() => handelKnowledgeLevel(knowledgeLevel)}
                    />
                  </div>
                ))}
              </Col>
            </Row>
          </Container>

          <Col className="text-right">
            <Button
              variant="primary"
              className="pl-5 pr-5 mt-sm-3 mt-lg-0"
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

export default connect(null, null)(QuestionLevel2);
