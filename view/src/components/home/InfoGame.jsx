import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaRegGrimace } from "react-icons/fa";
import { BsLifePreserver, BsTag } from "react-icons/bs";
import { RiMapPinAddLine } from "react-icons/ri";

const InfoGame = () => {
  return (
    <section className="page-section">
      <Container>
        <Row>
          <Col className="col-lg-12 text-center">
            <h2 className="section-heading text-uppercase">Game Information</h2>
            <h3 className="section-subheading text-muted">
              The game is vaguely inspired by the TV show: Who Wants to be a
              Millionaire.
            </h3>
          </Col>
        </Row>

        <Row>
          <Col className="col-lg-12">
            <ul className="timeline">
              <li>
                <div className="timeline-image">
                  <FaRegGrimace
                    size="6rem"
                    className="mt-2 mt-lg-4 info-icon"
                  />
                </div>
                <div className="timeline-panel">
                  <div className="timeline-heading">
                    <h4>Level 1</h4>
                    <h4 className="subheading">Players&#39; reliability</h4>
                  </div>
                  <div className="timeline-body">
                    <p className="text-muted">
                      This will help us choose a category for an unlabelled
                      dataset in case various options are proposed by different
                      players. Questions in this level consist on the
                      classification of an already labelled dataset.
                    </p>
                  </div>
                </div>
              </li>

              <li className="timeline-inverted">
                <div className="timeline-image">
                  <BsLifePreserver
                    size="6rem"
                    className="mt-2 mt-lg-4 info-icon"
                  />
                </div>
                <div className="timeline-panel">
                  <div className="timeline-heading">
                    <h4>Level 1</h4>
                    <h4 className="subheading">Lifelines</h4>
                  </div>
                  <div className="timeline-body">
                    <p className="text-muted">
                      <span className="font-weight-bold">- Delete one:</span>{" "}
                      One incorrect answer is eliminated. <br />
                      <span className="font-weight-bold">- 50:50:</span> Two
                      incorrect answers are eliminated. <br />
                      <span className="font-weight-bold">
                        - Phone a Friend:{" "}
                      </span>
                      Higgs, Feynman and other famous physists appear and give
                      hints on what they believe the answer might be.
                    </p>
                  </div>
                </div>
              </li>

              <li>
                <div className="timeline-image">
                  <BsTag size="6rem" className="mt-2 mt-lg-4 info-icon" />
                </div>
                <div className="timeline-panel">
                  <div className="timeline-heading">
                    <h4>Level 2</h4>
                    <h4 className="subheading">Label the Data</h4>
                  </div>
                  <div className="timeline-body">
                    <p className="text-muted">
                      This level is the central part of the game. In this level,
                      questions consist on the classification of unlabelled
                      datasets. In this case, there will be no options and no
                      lifelines (we don&#39;t know the true label).
                    </p>
                  </div>
                </div>
              </li>

              <li className="timeline-inverted">
                <div className="timeline-image">
                  <RiMapPinAddLine
                    size="6rem"
                    className="mt-2 mt-lg-4 info-icon"
                  />
                </div>
                <div className="timeline-panel">
                  <div className="timeline-heading">
                    <h4>Level 2</h4>
                    <h4 className="subheading">Create category</h4>
                  </div>
                  <div className="timeline-body">
                    <p className="text-muted">
                      There&#39;s also the possibility to create a new category.
                      We trust the answers based on the option you choose on
                      your expertise and on your score in Level1. By answering
                      these questions you will help built a more complete CMS
                      open data portal.
                    </p>
                  </div>
                </div>
              </li>

              <li className="timeline-inverted">
                <div className="timeline-image">
                  <h4 className="font-weight-bold">
                    Thanks
                    <br />
                    for
                    <br />
                    playing!
                  </h4>
                </div>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default InfoGame;
