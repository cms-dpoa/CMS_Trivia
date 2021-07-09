import React from "react";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";

const AnswerSection = ({
  options,
  setAnswerSelected,
  setActivateBtnSendAnswer,
}) => {
  const selectAnswer = (data) => {
    setAnswerSelected(data.target.id);
    setActivateBtnSendAnswer(true);
  };

  return (
    <ButtonGroup>
      <Row>
        {options.map((option) => (
          <Col key={option.id_label} sm="6" lg="3">
            <Button
              key={option.id_label}
              id={option.id_label}
              variant="outline-primary"
              className="mr-3 pl-5 pr-5 mb-3 mb-lg-0"
              onClick={selectAnswer}
            >
              {option.name}
            </Button>
          </Col>
        ))}
      </Row>
    </ButtonGroup>
  );
};

export default AnswerSection;
