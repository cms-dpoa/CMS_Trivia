import React, { useState } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { GiMiddleArrow } from "react-icons/gi";
import { FaBowlingBall } from "react-icons/fa";
import { ImStatsDots } from "react-icons/im";
import { connect, useDispatch } from "react-redux";
import ModalLifelineStatistics from "./ModalLifelineStatistics";
import setInvisibleOptions from "../../utils/Lifelines";
import { getVotesByDatasetAndCateroriesAction } from "../../../redux/ducks/analysisDucks";
// abbreviation LL = Lifeline

const Lifelines = ({ numQuestion, questions, showOptions }) => {
  const dispatch = useDispatch();
  const { showOptionsLevel1, setShowOptionsLevel1 } = showOptions;
  const [showModalStatisticsLL, setShowModalStatisticsLL] = useState(false);
  // variable for Statistics Lifeline
  // eslint-disable-next-line camelcase
  const { id_data, options, correct } = questions[numQuestion];
  const labels = Object.values(options).map((option) => option.name);

  const [removeOneLLIsUsed, setRemoveOneLLIsUsed] = useState(false);
  const [fiftyFiftyLLIsUsed, setFiftyFiftyLLIsUsed] = useState(false);
  const [statisticsLLIsUsed, setStatisticsLLIsUsed] = useState(false);

  const handleRemoveOneLL = () => {
    setRemoveOneLLIsUsed(true);
    const invisibleOptions = setInvisibleOptions(showOptionsLevel1, correct, 1);
    setShowOptionsLevel1(invisibleOptions);
  };

  const handleFiftyFiftyLL = () => {
    setFiftyFiftyLLIsUsed(true);
    const invisibleOptions = setInvisibleOptions(showOptionsLevel1, correct, 2);
    setShowOptionsLevel1(invisibleOptions);
  };

  const handleStatisticsLL = () => {
    dispatch(getVotesByDatasetAndCateroriesAction(id_data, labels));
    setStatisticsLLIsUsed(true);
    setShowModalStatisticsLL(true);
  };

  return (
    <Container className="text-right mt-4">
      <Row>
        <Col className="p-0 col col-md-10">
          <Button
            className="p-0"
            variant="outline-dark"
            onClick={handleRemoveOneLL}
            disabled={removeOneLLIsUsed}
          >
            <GiMiddleArrow className="p-1" size="2.5em" />
          </Button>
        </Col>

        <Col className="p-0 col col-md-1">
          <Button
            className="p-0"
            variant="outline-dark"
            onClick={handleFiftyFiftyLL}
            disabled={fiftyFiftyLLIsUsed}
          >
            <FaBowlingBall className="p-1" size="2.5em" />
          </Button>
        </Col>

        <Col className="p-0 col col-md-1">
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
