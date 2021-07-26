import React from "react";
import { Tabs, Tab, Container } from "react-bootstrap";
import Analysis from "../components/dashboard/Analysis";
import TableLabaled from "../components/dashboard/TableLabaled";

const MyScore = () => {
  return (
    <Container>
      <Tabs defaultActiveKey="my-score" transition={false} className="mb-3">
        <Tab eventKey="my-score" title="Dashboard">
          <Analysis />
        </Tab>
        <Tab eventKey="top-score" title="Table">
          <TableLabaled />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default MyScore;
