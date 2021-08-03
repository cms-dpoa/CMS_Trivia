import React from "react";
import { Container, Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <Container className="text-center mt-5 pt-5">
      <Spinner
        as="span"
        animation="border"
        size="lg"
        role="status"
        aria-hidden="true"
        className="mt-5"
      />
      <h4>Loading...</h4>
      <p>
        (If it takes a long time to load, it is likely that there are problems
        with the API connection)
      </p>
    </Container>
  );
};

export default Loading;
