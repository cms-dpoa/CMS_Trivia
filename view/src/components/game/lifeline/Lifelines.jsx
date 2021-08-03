import React, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { GiMiddleArrow } from "react-icons/gi";
import { FaBowlingBall } from "react-icons/fa";
import { ImStatsDots } from "react-icons/im";
import ModalLifelineStatistics from "./ModalLifelineStatistics";
import "./Lifelines.css";
// abbreviation LL = Lifeline

const Lifelines = ({ options }) => {
  const [showModalStatisticsLL, setShowModalStatisticsLL] = useState(false);
  const labels = Object.values(options.options).map((option) => option.name);

  const [removeOneLLIsUsed, setRemoveOneLLIsUsed] = useState(false);
  const [fiftyFiftyLLIsUsed, setFiftyFiftyLLIsUsed] = useState(false);
  const [statisticsLLIsUsed, setStatisticsLLIsUsed] = useState(false);

  const handleRemoveOneLL = () => {
    setRemoveOneLLIsUsed(true);
    setShowModalStatisticsLL(true);
  };

  const handleFiftyFiftyLL = () => {
    setFiftyFiftyLLIsUsed(true);
    setShowModalStatisticsLL(true);
  };

  const handleStatisticsLL = () => {
    setStatisticsLLIsUsed(true);
    setShowModalStatisticsLL(true);
    console.log("Click StatisticsLL");
  };

  return (
    <Container className="text-right mt-4">
      <Row>
        <Col className="p-0 joker col-10">
          <GiMiddleArrow
            className="border border-secondary p-1 mr-1 rounded"
            size="2.5em"
            onClick={handleRemoveOneLL}
          />
        </Col>

        <Col className="p-0 joker col-1">
          <FaBowlingBall
            className="border border-secondary p-1 rounded"
            size="2.5em"
            onClick={handleFiftyFiftyLL}
          />
        </Col>

        <Col className="p-0 joker col-1">
          <ImStatsDots
            className="border border-secondary p-1 rounded"
            size="2.5em"
            onClick={handleStatisticsLL}
          />
          <ModalLifelineStatistics
            show={showModalStatisticsLL}
            setShow={setShowModalStatisticsLL}
            labels={labels}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Lifelines;
