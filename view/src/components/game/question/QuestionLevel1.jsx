import React from "react";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";
import classNames from "classnames";
import { connect } from "react-redux";

const QuestionLevel1 = ({
  setOptionSelected,
  setActivateBtnSendAnswer,
  questions,
  numQuestion,
  showOptions,
}) => {
  let { options } = questions[numQuestion];
  options = Object.values(options);

  const { showOptionsLevel1 } = showOptions;

  const handleSelectAnswer = (selectedOption) => {
    setOptionSelected(selectedOption);
    setActivateBtnSendAnswer(true);
  };

  const classOptions = (visible) =>
    classNames("pl-sm-5 pr-sm-5 mb-3 mr-3 mb-lg-0 mt-lg-3", {
      invisible: !visible,
    });

  return (
    <ButtonGroup>
      <Row>
        {options.map((option, index) => (
          <Col key={option.id_label} sm="12" lg="6">
            <Button
              block
              variant="outline-primary"
              className={classOptions(showOptionsLevel1[index + 1])}
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
