import React, { Fragment, useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import GameOver from "./GameOver";
import Loading from "./Loading";
import QuestionLayout from "./question/QuestionLayout";
import configToast from "../utils/ConfigToast";
import FooterQuestion from "./question/FooterQuestion";
import { sendScoreGameLevel1Action } from "../../redux/ducks/gameDucks";
import { sendVoteAction } from "../../redux/ducks/voteDucks";

const MillionaireGame = ({ questions, username, idGame }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  // if (questions.length === 0) {
  //   const returnPlayPage = () =>
  //     questions.length === 0 ? history.push("/play") : null;
  //   setTimeout(returnPlayPage, 10000);
  // }

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
  const initialDatasetKnowledgeLevel = {
    "I know this dataset for sure": 5,
    "I think I know but it may be wrong": 2.5,
    "I'm just guessing": 0,
  };
  const [datasetKnowledgeLevel, setDatasetKnowledgeLevel] = useState(
    initialDatasetKnowledgeLevel
  );

  console.log(optionSelected);
  const toastBody = (
    <span className="font-weight-bold">Question {numQuestion}</span>
  );

  const sendScoreGameLevel1 = () => {
    dispatch(sendScoreGameLevel1Action(username, score, idGame));
  };

  const sendLabelDatasetLevel2 = () => {
    const idDataset = question.id_data;
    const { idLabel, knowledgeLevel } = optionSelected;

    if (knowledgeLevel !== 0)
      dispatch(
        sendVoteAction(idDataset, idLabel, username, idGame, knowledgeLevel)
      );
  };

  useEffect(() => {
    if (numQuestion === 6) {
      sendScoreGameLevel1();
    }
  }, [numQuestion]);

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
      sendLabelDatasetLevel2();
      document.getElementById("question-level-2-form").reset();
      setIsOptionLevel2Selected(false);
      setDatasetKnowledgeLevel(initialDatasetKnowledgeLevel);
    }
    if (numQuestion < 10) {
      setQuestion(questions[numQuestion + 1]);
      setActivateBtnSendAnswer(false);
    }
    setNumQuestion(numQuestion + 1);
  };

  return (
    <Container>
      {numQuestion > 10 ? (
        <GameOver score={score} />
      ) : (
        <Fragment>
          {questions && question ? (
            <Fragment>
              <QuestionLayout
                score={score}
                question={question}
                numQuestion={numQuestion}
                setOptionSelected={setOptionSelected}
                optionSelected={optionSelected}
                setActivateBtnSendAnswer={setActivateBtnSendAnswer}
                showOptionsLevel1={{ showOptionsLevel1, setShowOptionsLevel1 }}
                isOptionLevel2Selected={{
                  isOptionLevel2Selected,
                  setIsOptionLevel2Selected,
                }}
                datasetKnowledgeLevel={{
                  initialDatasetKnowledgeLevel,
                  datasetKnowledgeLevel,
                  setDatasetKnowledgeLevel,
                }}
              />
              <Button
                className="mt-5 mb-4 font-weight-bold"
                block
                onClick={NextQuestion}
                disabled={!activateBtnSendAnswer}
              >
                Send Answer
              </Button>
              <FooterQuestion
                numQuestionState={{ numQuestion, setNumQuestion }}
                setQuestion={setQuestion}
                activeShowRun1Btn={activateBtnSendAnswer}
                labelSelected={
                  optionSelected !== {} ? optionSelected.name : null
                }
              />
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
    username: state.auth.user.username,
    idGame: state.game.idGame,
  };
};

export default connect(mapStateToProps, null)(MillionaireGame);
