import React, { useEffect } from "react";
import { Table, Container, DropdownButton, Dropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RiFileExcel2Line } from "react-icons/ri";
import { VscJson } from "react-icons/vsc";

const TableLabaled = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAuthAction());
  //   }, []);

  // const user = useSelector((store) => store.auth.user);

  return (
    <Container>
      <h1>Table of labeled datasets</h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Dataset</th>
            <th># Votes</th>
            <th>Name Top Label 1</th>
            <th>% Top Label 1</th>
            <th>Name Top Label 2</th>
            <th>% Top Label 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dataset 1</td>
            <td>55</td>
            <td>Label x</td>
            <td>92.10%</td>
            <td>Label y</td>
            <td>7.20%</td>
          </tr>
          <tr>
            <td>Dataset 2</td>
            <td>43</td>
            <td>Label W</td>
            <td>80.10%</td>
            <td>Label Y</td>
            <td>17.20%</td>
          </tr>
          <tr>
            <td>Dataset 3</td>
            <td>39</td>
            <td>Label Z</td>
            <td>72.10%</td>
            <td>Label X</td>
            <td>27.20%</td>
          </tr>
        </tbody>
      </Table>
      <DropdownButton id="dropdown-basic-button" title="Download Table ">
        <Dropdown.Item href="#/action-1">
          Excel
          <RiFileExcel2Line size="1.5em" className="ml-5 my-auto" />
        </Dropdown.Item>
        <Dropdown.Item href="#/action-2">
          Json
          <VscJson size="1.5em" className="ml-5 my-auto" />
        </Dropdown.Item>
      </DropdownButton>
    </Container>
  );
};

export default TableLabaled;
