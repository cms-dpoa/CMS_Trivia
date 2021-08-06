import React, { useState } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { GiMiddleArrow } from "react-icons/gi";
import { FaBowlingBall } from "react-icons/fa";
import { ImStatsDots } from "react-icons/im";
import { useSelector, useDispatch, connect } from "react-redux";
import ModalLifelineStatistics from "./ModalLifelineStatistics";
import { setShowFieldToFalse } from "../../../redux/ducks/questionDucks";
import setInvisibleOptions from "../../utils/Lifelines";
// abbreviation LL = Lifeline

const Lifelines = ({
  // setActivateRemoveOne,
  // setActivateFiftyFifty,
  numQuestion,
  questions,
}) => {
  const dispatch = useDispatch();
  const [showModalStatisticsLL, setShowModalStatisticsLL] = useState(false);
  // variable for Statistics Lifeline
  const { options } = questions[numQuestion];
  const labels = Object.values(options).map((option) => option.name);

  const [removeOneLLIsUsed, setRemoveOneLLIsUsed] = useState(false);
  const [fiftyFiftyLLIsUsed, setFiftyFiftyLLIsUsed] = useState(false);
  const [statisticsLLIsUsed, setStatisticsLLIsUsed] = useState(false);

  const handleRemoveOneLL = () => {
    setRemoveOneLLIsUsed(true);
    const newOptions = setInvisibleOptions(options, 1);
    dispatch(setShowFieldToFalse(numQuestion, newOptions));
    // setActivateRemoveOne(true);
  };

  const handleFiftyFiftyLL = () => {
    setFiftyFiftyLLIsUsed(true);
    // setActivateFiftyFifty(true);
    setInvisibleOptions(options, 2);
  };

  const handleStatisticsLL = () => {
    setStatisticsLLIsUsed(true);
    setShowModalStatisticsLL(true);
  };

  return (
    <Container className="text-right mt-4">
      <Row>
        <Col className="p-0 col-10">
          <Button
            className="p-0"
            variant="outline-dark"
            onClick={handleRemoveOneLL}
            disabled={removeOneLLIsUsed}
          >
            <GiMiddleArrow className="p-1" size="2.5em" />
          </Button>
        </Col>

        <Col className="p-0 joker col-1">
          <Button
            className="p-0"
            variant="outline-dark"
            onClick={handleFiftyFiftyLL}
            disabled={fiftyFiftyLLIsUsed}
          >
            <FaBowlingBall className="p-1" size="2.5em" />
          </Button>
        </Col>

        <Col className="p-0 joker col-1">
          <Button
            className="p-0"
            variant="outline-dark"
            onClick={handleStatisticsLL}
            disabled={statisticsLLIsUsed}
          >
            <ImStatsDots className="p-1" size="2.5em" />
            <ModalLifelineStatistics
              show={showModalStatisticsLL}
              setShow={setShowModalStatisticsLL}
              labels={labels}
            />
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    questions: state.questions.array,
  };
};

export default connect(mapStateToProps, null)(Lifelines);
