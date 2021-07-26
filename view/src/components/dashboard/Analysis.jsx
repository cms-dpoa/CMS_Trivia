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
  console.log(analysis);

  const handleDatasetSelected = () => {
    console.log("cambiio");
  };
  const dataFormat = {
    title: "",
    labels: ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5"],
    amplitudes: [19, 12, 5, 3, 2],
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

      {/* <Row>
        <Col>
          <TopReliability labels={labels} amplitudes={amplitudes} />
        </Col>
        <Col>
          <PieTop5 labels={labels} amplitudes={amplitudes} />
        </Col>
      </Row> */}
      <TopReliability labels={labels} amplitudes={amplitudes} />
      <PieTop5 labels={labels} amplitudes={amplitudes} />
    </Container>
  );
};

export default Dashboard;
