import React, { Fragment, useState, useEffect } from "react";
import { Container, Button, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import GameOver from "./GameOver";
import Question from "./question/Question";
import { getQuestionsAction } from "../../redux/ducks/questionDucks";
import Jokers from "./Jokers";

const MillionaireGame = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestionsAction());
  }, []);

  const loadQuestion = useSelector((store) => store.questions.array);
  const questions = Object.values(loadQuestion);

  const [numQuestion, setNumQuestion] = useState(1);
  const [question, setQuestion] = useState(questions[numQuestion - 1]);
  const [score, setScore] = useState(0);
  const [activateBtnSendAnswer, setActivateBtnSendAnswer] = useState(false);
  const [IdAswerSelected, setIdAnswerSelected] = useState(0);
  if (questions.length > 0 && !question) {
    setQuestion(questions[numQuestion - 1]);
  }

  const NextQuestion = () => {
    if (numQuestion <= 5) {
      const optionsQuestion = Object.values(question.options);
      const answerSeleted = optionsQuestion.find(
        (option) => option.id_label == IdAswerSelected
      );
      if (answerSeleted.is_correct) {
        setScore(score + 1);
      }
    }
    setNumQuestion(numQuestion + 1);
    if (numQuestion < 10) {
      setQuestion(questions[numQuestion]);
      setActivateBtnSendAnswer(false);
      const print = `Question ${numQuestion} - Score ${score}`;
      console.log(print);
    }
  };

  const resetGameAction = () => {
    setNumQuestion(1);
    setScore(0);
    setQuestion(questions[0]);
    setActivateBtnSendAnswer(false);
  };

  return (
    <Container>
      {numQuestion > 10 ? (
        <GameOver resetGameAction={resetGameAction} score={score} />
      ) : (
        <Fragment>
          {questions.length > 0 ? (
            <Fragment>
              <Jokers />
              <Question
                question={question}
                numQuestion={numQuestion}
                setAnswerSelected={setIdAnswerSelected}
                setActivateBtnSendAnswer={setActivateBtnSendAnswer}
              />
              <Button
                className="mt-5 mb-5 font-weight-bold"
                block
                onClick={NextQuestion}
                disabled={!activateBtnSendAnswer}
              >
                Send Answer
              </Button>
            </Fragment>
          ) : (
            <h5>Loading</h5>
          )}
        </Fragment>
      )}
    </Container>
  );
};

export default MillionaireGame;
