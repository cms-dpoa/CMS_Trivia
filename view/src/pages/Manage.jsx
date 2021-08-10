import React from "react";
import { Tabs, Tab, Container } from "react-bootstrap";
import NewLabelRequest from "../components/manage/NewLabelRequest";
import ReportProblem from "../components/manage/ReportProblem";

const Manage = () => {
  return (
    <Container>
      <Tabs
        defaultActiveKey="label-request"
        transition={false}
        className="mb-3"
      >
        <Tab eventKey="label-request" title="Label Request">
          <NewLabelRequest />
        </Tab>
        <Tab eventKey="problems-repoted" title="Problems Reported">
          <ReportProblem />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Manage;
