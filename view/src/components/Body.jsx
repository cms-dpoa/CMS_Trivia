import React, { Fragment, useState } from "react";
import { Container, Button } from "react-bootstrap";
import GameOver from "./GameOver";
import Question from "./question/Question";
import { getQuestions } from "./initData";

const Body = () => {
  const questions = getQuestions;

  const [numQuestion, setNumQuestion] = useState(1);
  const [question, setQuestion] = useState(questions[numQuestion - 1]);
  const [score, setScore] = useState(0);
  const [activateBtnSendAnswer, setActivateBtnSendAnswer] = useState(false);
  const [IdAswerSelected, setIdAnswerSelected] = useState(0);

  const NextQuestion = () => {
    if (numQuestion <= 5) {
      const optionsQuestion = question.options;
      const answerSeleted = optionsQuestion.find(
        (option) => option.id_label == IdAswerSelected
      );
      if (answerSeleted.is_correct) {
        setScore(score + 1);
      }
    }
    setQuestion(questions[numQuestion]);
    setNumQuestion(numQuestion + 1);
    setActivateBtnSendAnswer(false);
    var print = "Question " + numQuestion + " - Score " + score;
    console.log(print);
  };

  const resetGameAction = () => {
    console.log("reset Game");
    setNumQuestion(1);
    setScore(0);
    setQuestion(questions[0]);
  };

  return (
    <Container>
      {numQuestion > 10 ? (
        <GameOver resetGameAction={resetGameAction} score={score} />
      ) : (
        <Fragment>
          <Question
            question={question}
            numQuestion={numQuestion}
            setAnswerSelected={setIdAnswerSelected}
            setActivateBtnSendAnswer={setActivateBtnSendAnswer}
          />

          <Button
            variant="primary"
            className="mt-5 font-weight-bold"
            block
            onClick={NextQuestion}
            disabled={!activateBtnSendAnswer}
          >
            Send Answer
          </Button>
        </Fragment>
      )}
    </Container>
  );
};

export default Body;
