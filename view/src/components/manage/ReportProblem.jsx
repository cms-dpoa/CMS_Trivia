import React, { useEffect, useState } from "react";
import { Table, Container, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  getReportProblemsAction,
  updateReportProblemAction,
} from "../../redux/ducks/reportProblemDuck";
import ModalProblemDetails from "./ModalProblemDetails";
import "./ReportProblem.css";

const ReportProblem = () => {
  const dispatch = useDispatch();

  const [showDetailProblem, setShowDetailProblem] = useState(false);
  const [problemSelected, setProblemSelected] = useState(null);

  useEffect(() => {
    dispatch(getReportProblemsAction());
  }, []);

  const problems = useSelector((store) => store.reportProblems.array);

  const handleClickProblem = (problemSelect) => {
    const problemChanged = { ...problemSelect, status: "IN POGRESS" };
    setProblemSelected(problemChanged);
    dispatch(updateReportProblemAction(problemChanged));
    setShowDetailProblem(true);
  };

  return (
    <Container>
      <ModalProblemDetails
        show={showDetailProblem}
        setShow={setShowDetailProblem}
        problem={problemSelected}
      />

      <Row>
        <h5>Total: {problems.length}</h5>
      </Row>
      <Table hover responsive="sm" id="table-report-problem">
        <thead>
          <tr>
            <th className="col-1">#</th>
            <th className="col-8">Title</th>
            <th className="col-2 text-center">Status</th>
            <th className="col-1">Date</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem, index) => (
            <tr
              key={problem.id_report_problem}
              onClick={() => handleClickProblem(problem)}
            >
              <td className="col-1">{index + 1}</td>
              <td className="col-8">{problem.title}</td>
              <td className="col-2 text-center">{problem.status}</td>
              <td className="col-1 p-0 pt-1">{problem.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ReportProblem;
