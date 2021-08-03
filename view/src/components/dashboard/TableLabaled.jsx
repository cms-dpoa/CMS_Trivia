import React, { useEffect } from "react";
import { Table, Container, DropdownButton, Dropdown } from "react-bootstrap";
import { useSelector, useDispatch, connect } from "react-redux";
import { VscJson } from "react-icons/vsc";
import { GrDocumentCsv } from "react-icons/gr";
import { CSVLink } from "react-csv";

const TableLabaled = ({ analysis }) => {
  console.log(analysis);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAuthAction());
  //   }, []);

  // const user = useSelector((store) => store.auth.user);

  const info = [
    {
      title: "WprimeToWZ_width0p2_M-800...",
      votes: 55,
      top_label_1: "Higgs Physics/Standard Model",
      percentage_top_label_1: 92.1,
      top_label_2: "Higgs Physics/Beyond Standard Model",
      percentage_top_label_2: 7.2,
    },
    {
      title: "ADDmonoPhoton_MD-2_d-3_TuneCUETP8M1_13TeV...",
      votes: 43,
      top_label_1: "Standard Model Physics/Drell-Yan",
      percentage_top_label_1: 80.1,
      top_label_2: "Standard Model Physics/ElectroWeak",
      percentage_top_label_2: 17.2,
    },
    {
      title: "Muplus_Pt1000-gun/RunIIFall15MiniAODv...",
      votes: 39,
      top_label_1: "Supersymmetry",
      percentage_top_label_1: 72.1,
      top_label_2: "Physics Modelling",
      percentage_top_label_2: 27.2,
    },
  ];

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
          {info.map((infoDataset) => (
            <tr key={infoDataset.title}>
              <td>{infoDataset.title}</td>
              <td>{infoDataset.votes}</td>
              <td>{infoDataset.top_label_1}</td>
              <td>{infoDataset.percentage_top_label_1}</td>
              <td>{infoDataset.top_label_2}</td>
              <td>{infoDataset.percentage_top_label_2}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <DropdownButton id="dropdown-basic-button" title="Download Table ">
        <Dropdown.Item href="#/action-2">
          Json
          <VscJson size="1.5em" className="ml-5" />
        </Dropdown.Item>

        <CSVLink
          data={info}
          filename="labeled_datasets.csv"
          className="dropdown-item"
        >
          CSV
          <GrDocumentCsv size="1.5em" className="ml-5" />
        </CSVLink>
      </DropdownButton>
    </Container>
  );
};

// Estos valores tienen que estar en el store
const mapStateToProps = (state) => {
  return {
    analysis: state.analysis,
  };
};

const mapDispatchToProps = {
  // getAnalsysDataset,
};

// export default TableLabaled;
export default connect(mapStateToProps, null)(TableLabaled);
