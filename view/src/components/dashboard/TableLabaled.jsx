import React from "react";
import {
  Table,
  Container,
  DropdownButton,
  Dropdown,
  Col,
  Row,
} from "react-bootstrap";
import { VscJson } from "react-icons/vsc";
import { GrDocumentCsv } from "react-icons/gr";
import { CSVLink } from "react-csv";

const TableLabaled = ({ data }) => {
  return (
    <Container className="mb-5">
      <Row>
        <Col>
          <h1>Table of labeled datasets</h1>
        </Col>
        <Col xs={12} md={3} className="text-right mb-3 mb-md-0">
          {data ? (
            <DropdownButton id="dropdown-basic-button" title="Download Table ">
              <Dropdown.Item
                href={`data:text/json;charset=utf-8,${encodeURIComponent(
                  JSON.stringify(data)
                )}`}
                download="labeled_datasets.json"
              >
                Json
                <VscJson size="1.5em" className="ml-5" />
              </Dropdown.Item>

              <CSVLink
                data={data}
                filename="labeled_datasets.csv"
                className="dropdown-item"
              >
                CSV
                <GrDocumentCsv size="1.5em" className="ml-5" />
              </CSVLink>
            </DropdownButton>
          ) : null}
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Dataset</th>
            <th># Votes</th>
            <th>Name Top Label 1</th>
            <th>% Label 1</th>
            <th>Score Label 1</th>
            <th>Name Top Label 2</th>
            <th>% Label 2</th>
            <th>Score Label 2</th>
          </tr>
        </thead>
        <tbody>
          {data
            ? data.map((infoDataset) => (
                <tr key={infoDataset.title}>
                  <td>{infoDataset.title}</td>
                  <td>{infoDataset.votes}</td>
                  <td>{infoDataset.top_label_1}</td>
                  <td>{infoDataset.percentage_top_label_1.toFixed(2)}</td>
                  <td>{infoDataset.score_top_label_1.toFixed(2)}</td>
                  <td>{infoDataset.top_label_2}</td>
                  <td>
                    {infoDataset.percentage_top_label_2 !== ""
                      ? infoDataset.percentage_top_label_2.toFixed(2)
                      : null}
                  </td>
                  <td>
                    {infoDataset.score_top_label_2 !== ""
                      ? infoDataset.score_top_label_2.toFixed(2)
                      : null}
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    </Container>
  );
};

export default TableLabaled;
