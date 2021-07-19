import React from "react";
import { Card } from "react-bootstrap";
import AnswerSection from "./AnswerSection";
import SelectSection from "./SelectSection";

const Question = ({
  question,
  numQuestion,
  setAnswerSelected,
  setActivateBtnSendAnswer,
}) => {
  return (
    <Card className="mt-5">
      <Card.Header as="h5">Question {numQuestion}</Card.Header>
      <Card.Body>
        <Card.Title>What's the label of this dataset?</Card.Title>
        <Card.Text>{question.title}</Card.Text>
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
  );
};

export default Question;
