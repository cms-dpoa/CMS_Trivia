import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const ProblemDetails = () => {
  const problem = {
    id_report_problem: 1,
    title: "Tag Problem",
    description: "The label of this dataset is incorrect",
    date: "20-12-2020",
    status: "IN PROCESS",
    user: "Josue",
    dataset: 1,
  };

  return (
    <Container>
      <h2>Problem Details</h2>

      <div className="row mb-3">
        <div className="col-md-7">
          <h1 className="h5 d-inline mr-2">{problem.title}</h1>
          <div className="mb-3">
            <span className="text-muted">{problem.date}</span>
          </div>

          <Row className="mb-3">
            <dt className="col-sm-3">Description</dt>
            <dd className="col-sm-9">{problem.description}</dd>
            <dt className="col-sm-3">Dataset</dt>
            <dd className="col-sm-9">{problem.dataset}</dd>
            <dt className="col-sm-3">User</dt>
            <dd className="col-sm-9">{problem.user}</dd>
            <dt className="col-sm-3">Status</dt>
            <dd className="col-sm-9">{problem.status}</dd>
          </Row>
        </div>
      </div>
    </Container>
  );
};

export default ProblemDetails;
