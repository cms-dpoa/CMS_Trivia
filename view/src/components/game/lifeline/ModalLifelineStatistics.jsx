import React, { Fragment } from "react";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import BarPlotLifelineStatistics from "./BarPlotLifelineStatistics";

const ModalLifelineStatistics = ({ show, setShow, votesLifeline }) => {
  const handleClose = () => setShow(false);

  return (
    <Fragment>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="lg"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Statistics Joker</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {votesLifeline ? (
            <BarPlotLifelineStatistics
              labels={votesLifeline.labels}
              votes={votesLifeline.votes}
            />
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    votesLifeline: state.analysis.votesLifeline,
  };
};

export default connect(mapStateToProps, null)(ModalLifelineStatistics);
