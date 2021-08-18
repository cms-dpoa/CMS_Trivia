import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Introduction = () => {
  return (
    <Container className="bg-light pt-4 pb-4 page-section mt-5" fluid>
      <Container>
        <Row>
          <Col className="col-lg-12 text-center">
            <h2 className="section-heading text-uppercase">Introduction</h2>
            <h3 className="section-subheading text-muted">
              what are we trying to solve?
            </h3>
          </Col>
        </Row>

        <p className="text-justify">
          Datasets in the{" "}
          <a href="https://opendata.cern.ch/">CERN open data portal</a> are
          categorized (or labelled) according to the physics subfield they
          relate to. For example, the dataset{" "}
          <code>
            /GluGluHToGG_M123_13TeV_amcatnloFXFX_pythia8/RunIIFall15MiniAODv2-PU25nsData2015v1_76X_mcRun2_asymptotic_v12-v1/MINIAODSIM
          </code>{" "}
          belongs to the category: <code>Higgs Physics/Standard Model</code>.
          Assigning labels to each dataset is a tedious task because researchers
          sometimes don&#39;t follow the naming convention and the categories
          are not present in the dataset metadata. Until now, this
          categorization has been done &quot;by-hand&quot;, by interviewing
          experts on the content of each dataset. The problem is that there are
          more than 600 datasets (and more to come) that have not yet been
          categorized. These datasets are thus not accessible for researchers
          who do not know the exact name of the dataset. The purpose of this
          game is to enable CERN researchers to easily assign a label to each
          unlabelled dataset in the open data collection, making it a less
          tedious task.
        </p>
      </Container>
    </Container>
  );
};

export default Introduction;
