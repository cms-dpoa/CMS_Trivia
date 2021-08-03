import React, { Fragment, useState, useEffect } from "react";
import { Container, Button, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GameOver from "./GameOver";
import Loading from "./Loading";
import QuestionLayout from "./question/QuestionLayout";
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

  const configToast = {
    position: "top-left",
    autoClose: 3000,
    draggable: true,
  };

  const NextQuestion = () => {
    if (numQuestion <= 5) {
      const optionsQuestion = Object.values(question.options);
      const answerSeleted = optionsQuestion.find(
        // eslint-disable-next-line eqeqeq
        (option) => option.id_label == IdAswerSelected
      );
      const tagQuestion = (
        <span className="font-weight-bold">Question {numQuestion}</span>
      );
      if (answerSeleted.is_correct) {
        setScore(score + 1);
        toast.success(<>{tagQuestion} is correct!</>, configToast);
      } else {
        toast.error(<>{tagQuestion} is incorrect!</>, configToast);
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
      <ToastContainer />
      {numQuestion > 10 ? (
        <GameOver resetGameAction={resetGameAction} score={score} />
      ) : (
        <Fragment>
          {questions.length > 0 ? (
            <Fragment>
              <QuestionLayout
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
            <Loading />
          )}
        </Fragment>
      )}
    </Container>
  );
};

export default MillionaireGame;
