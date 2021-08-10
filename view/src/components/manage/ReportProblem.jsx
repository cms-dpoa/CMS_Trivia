import React, { useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getLabelsAction } from "../../redux/ducks/labelDucks";
import "./ReportProblem.css";

const ReportProblem = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getLabelsAction());
  }, []);

  const problems = useSelector((store) => store.labels.array);

  const handleClickProblem = (problem) => {
    console.log(problem);
    setTimeout(() => history.push("/manage/problemDetails"), 500);
  };

  return (
    <Container>
      <Table hover responsive="sm" id="table-report-problem">
        <thead>
          <tr>
            <th className="col-1">#</th>
            <th className="col-8">Problem Description</th>
            <th className="col-1">Date</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem, index) => (
            <tr
              key={problem.id_label}
              onClick={() => handleClickProblem(problem)}
            >
              <td className="col-1">{index + 1}</td>
              <td className="col-8">{problem.name}</td>
              <td className="col-1 p-0 pt-1">22-08-2021</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ReportProblem;
