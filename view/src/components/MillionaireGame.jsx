import React from "react";
import { Spinner, Button, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import Body from "./Body";

const MillionaireGame = () => {
  const history = useHistory();

  const handleStartGame = () => {
    console.log("To game");
    history.push("/play/millionaire");
  };

  return (
    <Container className="text-center mt-5 pt-5">
      <h1>Who want to be a millionaire at CMS</h1>
      <Button className="pr-5 pl-5 mt-5" onClick={handleStartGame}>
        Start Game
      </Button>
      {/* <Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Loading...
      </Button> */}
    </Container>
  );
};

export default MillionaireGame;
