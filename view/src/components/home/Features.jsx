import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { MdDevices } from "react-icons/md";
import { FaCircle, FaGamepad } from "react-icons/fa";
import { ImStatsBars } from "react-icons/im";

const Features = () => {
  return (
    <section className="page-section">
      <Container fluid>
        <Container className="pt-5 pb-5">
          <Row>
            <Col className="col-lg-12 text-center">
              <h2 className="section-heading text-uppercase">Features</h2>
              <h3 className="section-subheading text-muted">
                In this project you can find...
              </h3>
            </Col>
          </Row>

          <Row className="text-center">
            <Col className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fa fa-circle fa-stack-2x text-primary" />
                <i className="fa fa-shopping-cart fa-stack-1x fa-inverse" />
              </span>
              <span className="feature-icon-container">
                <FaGamepad size="5rem" />
              </span>

              <h4>Have fun</h4>
              <p className="text-muted">
                Label dataset of experiments performed in CMS and have fun at
                the same time.
              </p>
            </Col>

            <Col className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fa fa-circle fa-stack-2x text-primary" />
                {/* <i className="fa fa-laptop fa-stack-1x fa-inverse" /> */}
                {/* <FaCircle /> */}
                <MdDevices size="5rem" />
              </span>
              <h4>Responsive Design</h4>
              <p className="text-muted">
                Adaptable web page. You can open the game from any device.
              </p>
            </Col>

            <Col className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fa fa-circle fa-stack-2x text-primary" />
                <i className="fa fa-lock fa-stack-1x fa-inverse" />
                {/* <FaCircle /> */}
                <ImStatsBars size="5rem" />
              </span>
              <h4>Result Report</h4>
              <p className="text-muted">
                The results obtained from the labeling of the data are presented
                in a dashboard and the report can be downloaded.
              </p>
            </Col>
          </Row>
        </Container>
      </Container>
    </section>
  );
};

export default Features;
