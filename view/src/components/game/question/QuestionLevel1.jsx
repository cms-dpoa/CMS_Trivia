import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";
import classNames from "classnames";
import { connect } from "react-redux";

const QuestionLevel1 = ({
  setOptionSelected,
  setActivateBtnSendAnswer,
  questions,
  numQuestion,
}) => {
  let { options } = questions[numQuestion];
  options = Object.values(options);

  useEffect(() => {}, [questions]);

  const handleSelectAnswer = (selectedOption) => {
    setOptionSelected(selectedOption);
    setActivateBtnSendAnswer(true);
  };

  const classOptions = (visible) => {
    if (!visible) console.log("visible");
    return classNames("mr-3 pl-5 pr-5 mb-3 mb-lg-0 mt-lg-3", {
      invisible: !visible,
    });
  };

  return (
    <ButtonGroup>
      <Row>
        {options.map((option) => (
          <Col key={option.id_label} sm="12" lg="6">
            <Button
              block
              variant="outline-primary"
              className={classOptions(option.show)}
              onClick={() => handleSelectAnswer(option)}
            >
              {option.name}
            </Button>
          </Col>
        ))}
      </Row>
    </ButtonGroup>
  );
};

const mapStateToProps = (state) => {
  return {
    questions: state.questions.array,
  };
};

export default connect(mapStateToProps, null)(QuestionLevel1);
