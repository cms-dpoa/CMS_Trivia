import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { MdReportProblem, MdNavigateNext } from "react-icons/md";
import ModalReportProblem from "./ModalReportProblem";

const FooterQuestion = ({ numQuestionState }) => {
  const { numQuestion, setNumQuestion } = numQuestionState;
  const [showModalReportProblem, setShowModalReportProblem] = useState(false);

  const handleReportProblem = () => {
    setShowModalReportProblem(true);
  };

  const hableSkipLevel1 = () => {
    setNumQuestion(6);
  };

  return (
    <Container className="row justify-content-between m-0 p-0">
      <ModalReportProblem
        show={showModalReportProblem}
        setShow={setShowModalReportProblem}
      />
      <Button variant="warning" onClick={handleReportProblem}>
        <MdReportProblem size="1.5em" /> Report Problem
      </Button>

      {numQuestion === 1 ? (
        <Button variant="info" onClick={hableSkipLevel1}>
          Skip Level 1 <MdNavigateNext size="1.5em" />
        </Button>
      ) : null}
    </Container>
  );
};

export default FooterQuestion;
