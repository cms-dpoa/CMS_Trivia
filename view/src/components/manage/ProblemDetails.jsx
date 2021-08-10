import React from "react";
import { Container } from "react-bootstrap";

const ProblemDetails = () => {
  return (
    <Container>
      <h2>Problem Details</h2>

      <div className="row mb-3">
        <div className="col-md-7">
          <h1 className="h4 d-inline mr-2">Great product name goes here</h1>
          <div className="mb-3">
            <span className="text-muted small">42 ratings and 4 reviews</span>
          </div>

          <dl className="row small mb-3">
            <dt className="col-sm-3">Description</dt>
            <dd className="col-sm-9">----------</dd>
            <dt className="col-sm-3">Status</dt>
            <dd className="col-sm-9">Authorised Store</dd>
          </dl>
        </div>
      </div>
    </Container>
  );
};

export default ProblemDetails;
