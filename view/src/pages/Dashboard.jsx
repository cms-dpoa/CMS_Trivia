import React, { useEffect } from "react";
import { Container, Form, Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAnalisisAction } from "../redux/ducks/analysisDucks";
import { getDatasAction } from "../redux/ducks/datasDucks";
import TopReliability from "../components/dashboard/TopReliability";

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

  return (
    <Container>
      <h1>Dashboard</h1>

      <Form>
        <Form.Group as={Row} controlId="select-section" className="mb-0">
          <Col sm="6">
            <Form.Control as="select" custom onChange={handleDatasetSelected}>
              <option>Select Dataset</option>
              {datasets.map((dataset) => (
                <option key={dataset.id_dataset}>{dataset.title}</option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>
      </Form>

      <TopReliability />
    </Container>
  );
};

export default Dashboard;
