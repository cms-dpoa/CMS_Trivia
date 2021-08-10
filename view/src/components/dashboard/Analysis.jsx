import React, { useEffect, useState } from "react";
import { Container, Form, Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAnalisisAction } from "../../redux/ducks/analysisDucks";
import TopReliability from "./charts/TopReliability";
import PieTop5 from "./charts/PieTop5";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAnalisisAction());
  }, []);

  const analysis = useSelector((store) => store.analysis.array);
  const [infoDataset, setInfoDataset] = useState({
    title: "",
    labels: [],
    amplitudes: [],
  });
  const { title, labels, amplitudes } = infoDataset;

  const handleDatasetSelected = (event) => {
    const dataset = event.target.value;
    setInfoDataset(analysis[dataset]);
  };

  const clearDatasetSelected = (event) => {
    // eslint-disable-next-line no-param-reassign
    event.target.value = "";
  };

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
              {Object.values(analysis).map((dataset) => (
                // eslint-disable-next-line jsx-a11y/control-has-associated-label
                <option key={dataset.title} value={dataset.title} />
              ))}
            </datalist>
          </Col>
        </Form.Group>
      </Form>

      {title !== "" ? (
        <Row className="mt-5">
          <Col sm="9">
            <TopReliability labels={labels} amplitudes={amplitudes} />
          </Col>
          <Col sm="3">
            <PieTop5 labels={labels} amplitudes={amplitudes} />
          </Col>
        </Row>
      ) : (
        <Container className="text-center mt-5 pt-5">
          <h4>Select a Dataset</h4>
        </Container>
      )}
    </Container>
  );
};

export default Dashboard;
