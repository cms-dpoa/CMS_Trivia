import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { MdReportProblem, MdNavigateNext } from "react-icons/md";
import { GiFinishLine } from "react-icons/gi";
import ModalReportProblem from "./ModalReportProblem";
import getURLOpenDataCERNFromLabel from "../../utils/linkShowRun1";
import getURLOpenDataCERNFromDataset from "../../utils/linkShowDataset";

const FooterQuestion = ({
  numQuestionState,
  setQuestion,
  questions,
  activeShowRun1Btn,
  labelSelected,
  dataset
}) => {
  const { numQuestion, setNumQuestion } = numQuestionState;
  const [showModalReportProblem, setShowModalReportProblem] = useState(false);

  const handleReportProblem = () => {
    setShowModalReportProblem(true);
  };

  const handleSkipLevel1 = () => {
    setNumQuestion(6);
    setQuestion(questions[6]);
  };

  const handleSkipToNextQuestionLevel2 = () => {
    setQuestion(questions[numQuestion + 1]);
    setNumQuestion(numQuestion + 1);
  };

  const handleEndGame = () => {
    const totalQuestions = Object.values(questions).length;
    setNumQuestion(numQuestion + totalQuestions);
  };

  return (
    <Container className="row justify-content-between m-0 p-0">
      <ModalReportProblem
        show={showModalReportProblem}
        setShow={setShowModalReportProblem}
      />
      <Button
        variant="warning"
        className="mt-2 mt-sm-0"
        onClick={handleReportProblem}
      >
        <MdReportProblem size="1.5em" /> Report Problem
      </Button>

      <Button
        variant="info"
        className="mt-2 mt-sm-0"
        target="_blank"
        disabled={!activeShowRun1Btn}
        href={getURLOpenDataCERNFromLabel(labelSelected)}
      >
        Run-1 open data with this label
      </Button>

      {numQuestion > 10 ? (
        <Button variant="danger" onClick={handleEndGame}>
          End Game <GiFinishLine size="1.5em" />
        </Button>
      ) : null}

      {numQuestion === 1 ? (
        <Button
          variant="info"
          className="mt-2 mt-sm-0"
          onClick={handleSkipLevel1}
        >
          Skip Level 1 <MdNavigateNext size="1.5em" />
        </Button>
      ) : null}

      {numQuestion > 5 ? (
        <Button
          variant="info"
          className="mt-2 mt-sm-0"
          target="_blank"
          href={getURLOpenDataCERNFromDataset(dataset)}
        >
          Show this dataset
        </Button>
      ) : null}

      {numQuestion > 5 ? (
        <Button
          variant="info"
          className="mt-2 mt-sm-0"
          onClick={handleSkipToNextQuestionLevel2}
        >
          Skip Question <MdNavigateNext size="1.5em" />
        </Button>
      ) : null} 

    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    questions: state.questions.array,
  };
};

export default connect(mapStateToProps, null)(FooterQuestion);
