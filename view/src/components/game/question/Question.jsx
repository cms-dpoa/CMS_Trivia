import React, { Fragment } from "react";
import { Card, Row, Col } from "react-bootstrap";
import AnswerSection from "./AnswerSection";
import SelectSection from "./SelectSection";
import Jokers from "../Jokers";

const Question = ({
  score,
  question,
  numQuestion,
  setAnswerSelected,
  setActivateBtnSendAnswer,
}) => {
  return (
    <Fragment>
      {numQuestion <= 5 ? (
        <Jokers options={question} />
      ) : (
        <p className="mt-5 invisible">delete</p>
      )}
      <Card className="mt-3">
        <Card.Header as="h5">
          <Row>
            <Col>Question {numQuestion}</Col>
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
            <AnswerSection
              options={Object.values(question.options)}
              setAnswerSelected={setAnswerSelected}
              setActivateBtnSendAnswer={setActivateBtnSendAnswer}
            />
          ) : (
            <SelectSection
              setAnswerSelected={setAnswerSelected}
              setActivateBtnSendAnswer={setActivateBtnSendAnswer}
            />
          )}
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default Question;
