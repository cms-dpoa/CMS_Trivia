import React from "react";
import { Container } from "react-bootstrap";
import { BiErrorCircle } from "react-icons/bi";

const NotFound = () => {
  return (
    <Container className="text-center mt-5">
      <BiErrorCircle size="10em" color="red" />
      <h1>Page Not Found</h1>
    </Container>
  );
};

export default NotFound;
