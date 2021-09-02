import React, { Fragment } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { IoMdHelpCircle } from "react-icons/io";
import QuestionLevel1 from "./QuestionLevel1";
import QuestionLevel2 from "./QuestionLevel2";
import Lifelines from "../lifeline/Lifelines";

const QuestionLayout = ({
  score,
  question,
  numQuestion,
  optionSelected,
  setOptionSelected,
  setActivateBtnSendAnswer,
  showOptionsLevel1,
  isOptionLevel2Selected,
  datasetKnowledgeLevel,
}) => {
  return (
    <Fragment>
      {numQuestion <= 5 ? (
        <Lifelines numQuestion={numQuestion} showOptions={showOptionsLevel1} />
      ) : (
        <p className="invisible">Invisible Element</p>
      )}

      <Card className="mt-3">
        <Card.Header as="h5">
          <Row>
            <Col>
              Question {numQuestion}
              <span className="font-italic text-muted font-weight-normal ml-4">
                Level {numQuestion > 5 ? 2 : 1}
              </span>
            </Col>
            <Col>
              <p className="text-right mb-0 font-italic font-weight-normal">
                Score: {score}
                <IoMdHelpCircle className="ml-3" />
              </p>
            </Col>
          </Row>
        </Card.Header>

        <Card.Body>
          <Card.Title>What's the label of this dataset?</Card.Title>
          <Card.Text className="text-center">{question.title}</Card.Text>
          {numQuestion <= 5 ? (
            <QuestionLevel1
              setOptionSelected={setOptionSelected}
              setActivateBtnSendAnswer={setActivateBtnSendAnswer}
              numQuestion={numQuestion}
              showOptions={showOptionsLevel1}
            />
          ) : (
            <QuestionLevel2
              optionSelected={optionSelected}
              setOptionSelected={setOptionSelected}
              isOptionSelected={isOptionLevel2Selected}
              setActivateBtnSendAnswer={setActivateBtnSendAnswer}
              knowledgesLevel2={datasetKnowledgeLevel}
            />
          )}
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default QuestionLayout;
