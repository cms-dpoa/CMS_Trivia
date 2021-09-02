import React, { useState, useEffect } from "react";
import { Spinner, Button, Container, Form } from "react-bootstrap";
import { useDispatch, connect } from "react-redux";
import { sendAuthAction } from "../redux/ducks/authDucks";
import ModalGameDifficulty from "../components/game/ModalGameDifficulty";

const GameSection = ({ isAuth, usernameOfAuthCookie }) => {
  const dispatch = useDispatch();

  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isUsernameSetted, setIsUsernameSetted] = useState(false);
  const [username, setUsername] = useState({ username: "" });

  useEffect(() => {
    setIsUsernameSetted(isAuth);
    setUsername({
      username: usernameOfAuthCookie,
    });
  }, [isAuth]);

  const handleChangeUsername = (event) => {
    setIsUsernameSetted(true);
    setUsername({
      ...username,
      [event.target.name]: event.target.value,
    });
  };

  const handleStartGame = (event) => {
    event.preventDefault();
    setIsGameStarted(true);
    dispatch(sendAuthAction(username.username));
  };

  return (
    <Container className="text-center mt-sm-5 pt-sm-5">
      <ModalGameDifficulty show={isGameStarted} setShow={setIsGameStarted} />
      <h1 className="mt-5 mb-5">Who wants to be a Millionaire? CMS edition</h1>

      <Form onSubmit={handleStartGame}>
        {!isAuth ? (
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Your username"
              className="col-10 col-sm-6 col-lg-3 mx-auto mt-4"
              name="username"
              onChange={handleChangeUsername}
            />
          </Form.Group>
        ) : null}

        <Button
          className="pr-5 pl-5 mt-3"
          type="submit"
          disabled={isGameStarted || !isUsernameSetted}
        >
          {isGameStarted ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="mr-2"
              />
              Loading...
            </>
          ) : (
            "Start Game"
          )}
        </Button>
      </Form>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    usernameOfAuthCookie: state.auth.user.username,
    isAuth: state.auth.isAuth,
  };
};

export default connect(mapStateToProps, null)(GameSection);
