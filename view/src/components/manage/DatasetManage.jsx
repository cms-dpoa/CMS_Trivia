import React, { useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getReportProblemsAction } from "../../redux/ducks/reportProblemDuck";
import "./ReportProblem.css";

const DatasetManage = () => {
  const datasets = [];

  const handleClickDataset = () => {};

  return (
    <Container>
      <Table hover responsive="sm" id="table-report-problem">
        <thead>
          <tr>
            <th className="col-1">#</th>
            <th className="col-8">Title</th>
            <th className="col-1">Status</th>
            <th className="col-1">Date</th>
          </tr>
        </thead>
        <tbody>
          {datasets.map((dataset, index) => (
            <tr
              key={dataset.id_report_dataset}
              onClick={() => handleClickDataset(dataset)}
            >
              <td className="col-1">{index + 1}</td>
              <td className="col-8">{dataset.title}</td>
              <td className="col-1">{dataset.status}</td>
              <td className="col-1 p-0 pt-1">22-08-2021</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default DatasetManage;
