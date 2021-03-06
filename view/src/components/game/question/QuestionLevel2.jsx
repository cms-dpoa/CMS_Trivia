/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, Fragment, useEffect } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { useSelector, useDispatch, connect } from "react-redux";
import ModalNewLabel from "./ModalNewLabel";
import { getLabelsAction } from "../../../redux/ducks/labelDucks";

const QuestionLevel2 = ({
  optionSelected,
  setOptionSelected,
  setActivateBtnSendAnswer,
  isOptionSelected,
  knowledgesLevel2,
}) => {
  const {
    initialDatasetKnowledgeLevel,
    datasetKnowledgeLevel,
    setDatasetKnowledgeLevel,
  } = knowledgesLevel2;
  const { isOptionLevel2Selected, setIsOptionLevel2Selected } =
    isOptionSelected;

  const dispatch = useDispatch();
  useEffect(() => {
    const excludeMiscellaneous = true;
    const checkedLabels = true;
    const createdLabels = null;
    dispatch(
      getLabelsAction(excludeMiscellaneous, checkedLabels, createdLabels)
    );
  }, []);

  const labels = useSelector((store) => store.labels.array);
  const [showModalNewLabel, setShowModalNewLabel] = useState(false);
  const [labelSelected, setLabelSelected] = useState("");
  const handleShowModalNewLabel = () => setShowModalNewLabel(true);
  const anotherCategoryOption = "None of the existing categories";

  const handleSelectOption = (event) => {
    const labelName = event.target.value;
    setLabelSelected(labelName);

    setOptionSelected({
      ...optionSelected,
      name: labelName,
    });

    setIsOptionLevel2Selected(true);
    if (labelName === anotherCategoryOption) {
      setDatasetKnowledgeLevel({ "I just created a new category": 0 });
    } else if (Object.keys(datasetKnowledgeLevel).length === 1) {
      setDatasetKnowledgeLevel(initialDatasetKnowledgeLevel);
    }
  };

  const handelKnowledgeLevel = (knowledgeLevel) => {
    let idLabel = -1;

    if (labelSelected !== anotherCategoryOption)
      idLabel = labels.find((label) => label.name === labelSelected).id_label;

    setOptionSelected({
      idLabel,
      name: labelSelected,
      knowledgeLevel: datasetKnowledgeLevel[knowledgeLevel],
    });
    setActivateBtnSendAnswer(true);
  };

  const clearOptionSelected = (event) => {
    // eslint-disable-next-line no-param-reassign
    event.target.value = "";
    setIsOptionLevel2Selected(false);
  };

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
                  <option value={anotherCategoryOption} />
                  {labels.map((label) => (
                    <option key={label.id_label} value={label.name} />
                  ))}
                </datalist>
              </Col>
            </Row>

            <Row>
              <Col>
                {Object.keys(datasetKnowledgeLevel).map(
                  (knowledgeLevel, index) => (
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
                  )
                )}
              </Col>
            </Row>
          </Container>

          <Col className="text-right">
            <Button
              variant="primary"
              className="pl-5 pr-5 mt-3 mt-lg-0"
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
