import React, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { GiMiddleArrow } from "react-icons/gi";
import { FaBowlingBall } from "react-icons/fa";
import { ImStatsDots } from "react-icons/im";
import ModalLifelineStatistics from "./ModalLifelineStatistics";
import "./Lifelines.css";

const Lifelines = ({ options }) => {
  const [showModalStaticJoker, setShowModalStaticJoker] = useState(false);
  const handleStaticJoker = () => setShowModalStaticJoker(true);
  const labels = Object.values(options.options).map((option) => option.name);

  return (
    <Container className="text-right mt-4">
      <Row>
        <Col className="p-0 joker col-10">
          <GiMiddleArrow
            className="border border-secondary p-1 mr-1 rounded"
            size="2.5em"
          />
        </Col>

        <Col className="p-0 joker col-1">
          <FaBowlingBall
            className="border border-secondary p-1 rounded"
            size="2.5em"
          />
        </Col>

        <Col className="p-0 joker col-1">
          <ImStatsDots
            className="border border-secondary p-1 rounded"
            size="2.5em"
            onClick={handleStaticJoker}
          />
        </Col>
      </Row>
      <ModalLifelineStatistics
        show={showModalStaticJoker}
        setShow={setShowModalStaticJoker}
        labels={labels}
      />
    </Container>
  );
};

export default Lifelines;
