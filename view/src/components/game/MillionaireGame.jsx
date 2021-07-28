import React, { Fragment, useState, useEffect } from "react";
import { Container, Button, Row, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import GameOver from "./GameOver";
import Question from "./question/Question";
import { getQuestionsAction } from "../../redux/ducks/questionDucks";

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
        // eslint-disable-next-line eqeqeq
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
              <Question
                score={score}
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
            <Container className="text-center mt-5 pt-5">
              <Spinner
                as="span"
                animation="border"
                size="lg"
                role="status"
                aria-hidden="true"
                className="mt-5"
              />
              <h4>Loading...</h4>
              <p>
                (If it takes a long time to load, it is likely that there are
                problems with the API connection.)
              </p>
            </Container>
          )}
        </Fragment>
      )}
    </Container>
  );
};

export default MillionaireGame;
