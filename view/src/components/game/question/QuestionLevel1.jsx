import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";
import classNames from "classnames";
import { connect } from "react-redux";

const QuestionLevel1 = ({
  setOptionSelected,
  setActivateBtnSendAnswer,
  questions,
  numQuestion,
  activateRemoveOne,
  activateFiftyFifty,
}) => {
  let { options } = questions[numQuestion];
  options = Object.values(options);

  const handleSelectAnswer = (selectedOption) => {
    setOptionSelected(selectedOption);
    setActivateBtnSendAnswer(true);
  };

  const classOptions = (visible) =>
    classNames("mr-3 pl-5 pr-5 mb-3 mb-lg-0 mt-lg-3", { invisible: !visible });

  // console.log(listOptions);

  // if (activateRemoveOne) {
  //   console.log("RemoveOne");
  //   const optionsVisi = setInvisibleOptions(listOptions, 1);
  //   setListOptions(optionsVisi);
  //   console.log(optionsVisi);
  // }

  // if (activateFiftyFifty) {
  //   console.log("FiftyFifty");
  //   const optionsVisi = setInvisibleOptions(listOptions, 1);
  //   setListOptions(optionsVisi);
  //   console.log(optionsVisi);
  // }

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
