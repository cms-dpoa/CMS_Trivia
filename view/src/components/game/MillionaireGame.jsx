import React, { Fragment, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import GameOver from "./GameOver";
import Loading from "./Loading";
import QuestionLayout from "./question/QuestionLayout";
import configToast from "../utils/ConfigToast";

const MillionaireGame = (props) => {
  const { questions } = props;
  const history = useHistory();

  if (questions.length === 0) {
    history.push("/play");
  }

  const [numQuestion, setNumQuestion] = useState(1);
  const [question, setQuestion] = useState(questions[numQuestion]);
  const [score, setScore] = useState(0);
  const [activateBtnSendAnswer, setActivateBtnSendAnswer] = useState(false);
  const [optionSelected, setOptionSelected] = useState({});
  const [isOptionLevel2Selected, setIsOptionLevel2Selected] = useState(false);
  const initialShowOptionsLevel1 = { 1: true, 2: true, 3: true, 4: true };
  const [showOptionsLevel1, setShowOptionsLevel1] = useState(
    initialShowOptionsLevel1
  );

  const toastBody = (
    <span className="font-weight-bold">Question {numQuestion}</span>
  );

  const NextQuestion = () => {
    if (numQuestion <= 5) {
      setShowOptionsLevel1(initialShowOptionsLevel1);
      if (optionSelected.is_correct) {
        setScore(score + 1);
        toast.success(<>{toastBody} is correct!</>, configToast);
      } else {
        toast.error(<>{toastBody} is incorrect!</>, configToast);
      }
    } else {
      document.getElementById("question-level-2-form").reset();
      setIsOptionLevel2Selected(false);
    }
    setNumQuestion(numQuestion + 1);
    if (numQuestion < 10) {
      setQuestion(questions[numQuestion]);
      setActivateBtnSendAnswer(false);
    }
  };

  return (
    <Container>
      <ToastContainer />
      {numQuestion > 10 ? (
        <GameOver score={score} />
      ) : (
        <Fragment>
          {questions.length !== 0 ? (
            <Fragment>
              <QuestionLayout
                score={score}
                question={question}
                numQuestion={numQuestion}
                setOptionSelected={setOptionSelected}
                setActivateBtnSendAnswer={setActivateBtnSendAnswer}
                showOptionsLevel1={{ showOptionsLevel1, setShowOptionsLevel1 }}
                isOptionLevel2Selected={{
                  isOptionLevel2Selected,
                  setIsOptionLevel2Selected,
                }}
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

const mapStateToProps = (state) => {
  return {
    questions: state.questions.array,
  };
};

export default connect(mapStateToProps, null)(MillionaireGame);
