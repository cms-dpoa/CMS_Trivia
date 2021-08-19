import React, { useState, Fragment } from "react";
import {
  Container,
  Form,
  Col,
  Row,
  Button,
  Popover,
  OverlayTrigger,
  Image,
} from "react-bootstrap";
import { IoMdHelpCircle } from "react-icons/io";
import TopReliability from "./charts/TopReliability";
import PieTop5 from "./charts/PieTop5";
import ScoreImg from "../../assets/score.png";

const Dashboard = ({ data }) => {
  const [infoDataset, setInfoDataset] = useState({
    title: "",
    labels: [],
    votes: [],
    scores: [],
  });
  const { title, labels, votes, scores } = infoDataset;

  const handleDatasetSelected = (event) => {
    const dataset = event.target.value;
    if (data[dataset]) {
      setInfoDataset(data[dataset]);
    }
  };

  const clearDatasetSelected = (event) => {
    // eslint-disable-next-line no-param-reassign
    event.target.value = "";
  };

  const popover = (
    <Popover style={{ maxWidth: "40%" }}>
      <Popover.Title as="h3">How the score is computed?</Popover.Title>
      <Popover.Content>
        Each user has a score (call <strong>Mean Score</strong>), which is
        obtained with the questions of level 1. Also, for each dataset labeled
        in level 2, the
        <strong> level of knowledge</strong> of that label is obtained.
        Therefore, the score is calculated:
        <Image src={ScoreImg} alt="score metric" className="mt-3" thumbnail />
      </Popover.Content>
    </Popover>
  );

  return (
    <Container>
      <h1>Dashboard</h1>

      <Form>
        <Form.Group as={Row} controlId="select-section" className="mb-0">
          <Col sm="12">
            <input
              className="form-control"
              list="datalistDatasetsOptions"
              placeholder="Select Dataset..."
              onClick={clearDatasetSelected}
              onChange={handleDatasetSelected}
            />
            <datalist id="datalistDatasetsOptions">
              {data
                ? Object.values(data).map((dataset) => (
                    // eslint-disable-next-line jsx-a11y/control-has-associated-label
                    <option key={dataset.title} value={dataset.title} />
                  ))
                : null}
            </datalist>
          </Col>
        </Form.Group>
      </Form>

      {title !== "" ? (
        <Fragment>
          <OverlayTrigger trigger="click" placement="right" overlay={popover}>
            <Button variant="light" className="mt-3 mb-3 d-none d-sm-block">
              Score <IoMdHelpCircle />
            </Button>
          </OverlayTrigger>

          <Row>
            <Col className="col-12 d-none d-sm-block" sm="9">
              <TopReliability labels={labels} votes={votes} scores={scores} />
            </Col>
            <Col className="col-12" sm="3">
              <h6 className="text-center mt-3 mt-sm-0">Votes</h6>
              <PieTop5 labels={labels} votes={votes} scores={scores} />
            </Col>
          </Row>
        </Fragment>
      ) : (
        <Container className="text-center mt-5 pt-5">
          <h4>Select a Dataset</h4>
        </Container>
      )}
    </Container>
  );
};

export default Dashboard;
