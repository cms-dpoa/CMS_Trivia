import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tabs, Tab, Container } from "react-bootstrap";
import LabelManage from "../components/manage/LabelManage";
import ReportProblem from "../components/manage/ReportProblem";
import { getLabelsAction } from "../redux/ducks/labelDucks";

const Manage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const excludeMiscellaneous = null;
    const checkedLabels = null;
    const createdLabels = null;
    dispatch(
      getLabelsAction(excludeMiscellaneous, checkedLabels, createdLabels)
    );
  }, []);

  const labels = useSelector((store) => store.labels.array);
  const labelsToCheck = labels.filter((label) => !label.was_checked);
  const activeLabels = labels.filter((label) => label.was_checked);

  return (
    <Container>
      <Tabs
        defaultActiveKey="label-request"
        transition={false}
        className="mb-3"
      >
        <Tab eventKey="label-request" title="Label Request">
          <LabelManage labels={labelsToCheck} labelsToCheck />
        </Tab>

        <Tab eventKey="active-label" title="Active Label">
          <LabelManage labels={activeLabels} labelsToCheck={false} />
        </Tab>

        <Tab eventKey="problems-repoted" title="Problems Reported">
          <ReportProblem />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Manage;
