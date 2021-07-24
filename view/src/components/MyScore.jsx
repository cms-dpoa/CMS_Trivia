import React from "react";
import { Table, Container } from "react-bootstrap";

const MyScore = () => {
  return (
    <Container>
      <h1>My Score</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Game</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
          </tr>
          <tr>
            <td>3</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default MyScore;
