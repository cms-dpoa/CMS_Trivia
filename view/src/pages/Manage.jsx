import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tabs, Tab, Container } from "react-bootstrap";
import LabelManage from "../components/manage/LabelManage";
import ReportProblem from "../components/manage/ReportProblem";
import UserManage from "../components/manage/UserManage";
import { getLabelsAction } from "../redux/ducks/labelDucks";
import NotFound from "./NotFound";
import { getUsersAction } from "../redux/ducks/userDucks";

const Manage = () => {
  const dispatch = useDispatch();
  const isAdmin = useSelector((store) => store.auth.user.is_admin);
  const isSuperUser = useSelector((store) => store.auth.user.is_superuser);

  if (!isAdmin) {
    return <NotFound />;
  }

  useEffect(() => {
    const excludeMiscellaneous = null;
    const checkedLabels = null;
    const createdLabels = null;
    dispatch(
      getLabelsAction(excludeMiscellaneous, checkedLabels, createdLabels)
    );

    dispatch(getUsersAction());
  }, []);

  const labels = useSelector((store) => store.labels.array);
  const labelsToCheck = labels.filter((label) => !label.was_checked);
  const activeLabels = labels.filter((label) => label.was_checked);
  const users = useSelector((store) => store.users.array);

  return (
    <Container>
      <Tabs
        defaultActiveKey="label-request"
        transition={false}
        className="mb-3"
      >
        <Tab eventKey="label-request" title="Labels Request">
          <LabelManage labels={labelsToCheck} labelsToCheck />
        </Tab>
        <Tab eventKey="active-label" title="Active Labels">
          <LabelManage labels={activeLabels} labelsToCheck={false} />
        </Tab>

        <Tab eventKey="problems-repoted" title="Problems Reported">
          <ReportProblem />
        </Tab>

        {isSuperUser ? (
          <Tab eventKey="users" title="Users">
            <UserManage users={users} />
          </Tab>
        ) : null}
      </Tabs>
    </Container>
  );
};

export default Manage;
