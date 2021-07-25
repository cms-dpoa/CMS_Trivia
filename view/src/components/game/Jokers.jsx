import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { GiMiddleArrow } from "react-icons/gi";
import { FiPhoneCall } from "react-icons/fi";
import { ImStatsDots } from "react-icons/im";
import "./Jokers.css";

const Jokers = () => {
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
          <FiPhoneCall
            className="border border-secondary p-1 rounded"
            size="2.5em"
          />
        </Col>

        <Col className="p-0 joker col-1">
          <ImStatsDots
            className="border border-secondary p-1 rounded"
            size="2.5em"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Jokers;
