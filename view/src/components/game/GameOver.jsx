import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AiFillLike } from "react-icons/ai";
import { MdMoodBad } from "react-icons/md";
import { BiHappyBeaming } from "react-icons/bi";
import { deleteAllQuestionsGameOverAction } from "../../redux/ducks/questionDucks";
import { gameOverAction } from "../../redux/ducks/gameDucks";

const GameOver = ({ score }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const playAgainAction = () => {
    history.push("/play");
    dispatch(gameOverAction());
    dispatch(deleteAllQuestionsGameOverAction());
  };

  const getMessage = () => {
    let message = "You can do a better job next time";
    let icon = <MdMoodBad size="8em" />;

    if (score > 3) {
      message = "You really did a good job";
      icon = <BiHappyBeaming size="8em" />;
    } else if (score > 2) {
      message = "You did an acceptable job";
      icon = <AiFillLike size="8em" />;
    }

    return (
      <Row className="justify-content-center mb-4 mt-4">
        <Col xs={12}> {icon} </Col>
        <Col className="font-italic">{message}</Col>
      </Row>
    );
  };

  return (
    <Card className="text-center mt-5">
      <Card.Header as="h5">Game Over</Card.Header>
      <Card.Body>
        <Card.Title>Score: {score}</Card.Title>
        {getMessage()}
        <Button
          variant="primary"
          className="pr-5 pl-5 mb-3"
          onClick={playAgainAction}
        >
          Play Again
        </Button>
      </Card.Body>
      <Card.Footer className="text-muted">
        Thank you for your help in labeling the CMS data
      </Card.Footer>
    </Card>
  );
};

export default GameOver;
