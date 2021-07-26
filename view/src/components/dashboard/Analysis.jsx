import React, { useEffect } from "react";
import { Container, Form, Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAnalisisAction } from "../../redux/ducks/analysisDucks";
import { getDatasAction } from "../../redux/ducks/datasDucks";
import TopReliability from "./charts/TopReliability";
import PieTop5 from "./charts/PieTop5";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAnalisisAction());
    dispatch(getDatasAction());
  }, []);

  const analysis = useSelector((store) => store.analysis.array);
  const datasets = useSelector((store) => store.datas.array);

  const handleDatasetSelected = () => {
    console.log("cambiio");
  };
  const dataFormat = {
    title: "",
    labels: ["Exotica/Dark Matter", "Physics Modelling", "Exotica/Gravitons"],
    amplitudes: [19, 12, 5],
  };
  const { labels, amplitudes } = dataFormat;

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
              onChange={handleDatasetSelected}
            />
            <datalist id="datalistDatasetsOptions">
              {datasets.map((dataset) => (
                // eslint-disable-next-line jsx-a11y/control-has-associated-label
                <option key={dataset.id_dataset} value={dataset.title} />
              ))}
            </datalist>
          </Col>
        </Form.Group>
      </Form>

      <Row className="mt-4">
        <Col sm="9">
          <TopReliability labels={labels} amplitudes={amplitudes} />
        </Col>
        <Col sm="3">
          <PieTop5 labels={labels} amplitudes={amplitudes} />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
