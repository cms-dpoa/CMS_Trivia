import React, { useState } from "react";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";
import setInvisibleOptions from "../../utils/joker";

const QuestionLevel1 = ({
  options,
  setAnswerSelected,
  setActivateBtnSendAnswer,
}) => {
  const [listOptions, setListOptions] = useState(options);
  const selectAnswer = (data) => {
    setAnswerSelected(data.target.id);
    setActivateBtnSendAnswer(true);
  };

  const classes = (isVisible) => {
    let className = "mr-3 pl-5 pr-5 mb-3 mb-lg-0 mt-lg-3 ";
    if (!isVisible) {
      className += "invisible";
    }
    return className;
  };

  // console.log(listOptions);

  const testVisi = () => {
    const optionsVisi = setInvisibleOptions(listOptions, 1);
    setListOptions(optionsVisi);
    console.log(optionsVisi);
  };

  return (
    <ButtonGroup>
      <Row>
        {options.map((option) => (
          <Col key={option.id_label} sm="12" lg="6">
            <Button
              block
              key={option.id_label}
              id={option.id_label}
              variant="outline-primary"
              className={classes(option.show)}
              onClick={selectAnswer}
            >
              {option.name}
            </Button>
          </Col>
        ))}
        {/* <Button onClick={testVisi}>test</Button> */}
      </Row>
    </ButtonGroup>
  );
};

export default QuestionLevel1;
