import React, { Fragment, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { IoMdHelpCircle } from "react-icons/io";
import QuestionLevel1 from "./QuestionLevel1";
import QuestionLevel2 from "./QuestionLevel2";
import Lifelines from "../lifeline/Lifelines";

const QuestionLayout = ({
  score,
  question,
  numQuestion,
  setAnswerSelected,
  setActivateBtnSendAnswer,
}) => {
  // const [activateRemoveOne, setActivateRemoveOne] = useState(false);
  // const [activateFiftyFifty, setActivateFiftyFifty] = useState(false);

  return (
    <Fragment>
      {numQuestion <= 5 ? (
        <Lifelines
          options={question.options}
          numQuestion={numQuestion}
          // setActivateRemoveOne={setActivateRemoveOne}
          // setActivateFiftyFifty={setActivateFiftyFifty}
        />
      ) : (
        <p className="mt-5 invisible">Invisible Element</p>
      )}

      <Card className="mt-3">
        <Card.Header as="h5">
          <Row>
            <Col>
              Question {numQuestion}
              <IoMdHelpCircle className="ml-3" />
            </Col>
            <Col>
              <p className="text-right mb-0 font-italic font-weight-normal">
                Score: {score}
              </p>
            </Col>
          </Row>
        </Card.Header>

        <Card.Body>
          <Card.Title>What's the label of this dataset?</Card.Title>
          <Card.Text className="text-center">{question.title}</Card.Text>
          {numQuestion <= 5 ? (
            <QuestionLevel1
              options={Object.values(question.options)}
              setAnswerSelected={setAnswerSelected}
              setActivateBtnSendAnswer={setActivateBtnSendAnswer}
              // activateRemoveOne={activateRemoveOne}
              // activateFiftyFifty={activateFiftyFifty}
            />
          ) : (
            <QuestionLevel2
              setAnswerSelected={setAnswerSelected}
              setActivateBtnSendAnswer={setActivateBtnSendAnswer}
            />
          )}
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default QuestionLayout;
