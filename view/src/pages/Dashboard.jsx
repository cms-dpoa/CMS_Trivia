import React, { useEffect } from "react";
import { Tabs, Tab, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAnalisisAction } from "../redux/ducks/analysisDucks";
import Analysis from "../components/dashboard/Analysis";
import TableLabaled from "../components/dashboard/TableLabaled";
import NotFound from "./NotFound";

const DashBoard = () => {
  const dispatch = useDispatch();
  const isAdmin = useSelector((store) => store.auth.user.is_admin);

  if (!isAdmin) {
    return <NotFound />;
  }

  useEffect(() => {
    dispatch(getAnalisisAction());
  }, []);

  const analysis = useSelector((store) => store.analysis.array);

  return (
    <Container>
      <Tabs defaultActiveKey="dashboard" transition={false} className="mb-3">
        <Tab eventKey="dashboard" title="Dashboard">
          <Analysis data={analysis ? analysis.votes_per_dataset : null} />
        </Tab>
        <Tab eventKey="table" title="Table">
          <TableLabaled
            data={analysis ? analysis.top2_labels_per_dataset : null}
          />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default DashBoard;
