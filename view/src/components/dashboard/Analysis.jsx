import React, { useState, Fragment } from "react";
import {
  Container,
  Form,
  Col,
  Row,
  Button,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";
import { IoMdHelpCircle } from "react-icons/io";
import TopReliability from "./charts/TopReliability";
import PieTop5 from "./charts/PieTop5";

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
    <Popover id="popover-basic">
      <Popover.Title as="h3">How the score is computed?</Popover.Title>
      <Popover.Content>
        And here's some <strong>amazing</strong> content. It's very engaging.
        right?
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
            <Button variant="light" className="mt-3 mb-3">
              Score <IoMdHelpCircle />
            </Button>
          </OverlayTrigger>

          <Row>
            <Col className="col-12 d-none d-sm-block" sm="9">
              <TopReliability labels={labels} votes={votes} scores={scores} />
            </Col>
            <Col className="col-12" sm="3">
              <h6 className="text-center">Votes</h6>
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
