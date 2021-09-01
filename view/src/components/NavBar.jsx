import React, { useState, Fragment, useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import { BiUserCircle, BiLogOut, BiLogIn } from "react-icons/bi";
import { connect, useDispatch } from "react-redux";
import { logOut, isLogIn } from "./utils/auth";
import { setAuthFromCookieAction } from "../redux/ducks/authDucks";

const NavBar = ({ username, isAdmin, isAuth }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!isAuth && isLogIn()) {
      dispatch(setAuthFromCookieAction());
    }
  }, [isAuth]);

  const handleLogInNav = () => {
    history.push("/play");
  };

  return (
    <Navbar expanded={isExpanded} expand="md" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/home">CMS Game</Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setIsExpanded(!isExpanded)}
        />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="col-md-6 ms-md-auto pr-0 justify-content-end"
        >
          <Nav className="text-center">
            <Link
              className="nav-link"
              to="/home"
              onClick={() => setIsExpanded(false)}
            >
              Home
            </Link>

            <Link
              className="nav-link"
              to="/play"
              onClick={() => setIsExpanded(false)}
            >
              Let's Play
            </Link>

            <Link
              className="nav-link"
              to="/myscore"
              onClick={() => setIsExpanded(false)}
            >
              My Score
            </Link>

            {isAdmin ? (
              <Fragment>
                <Link
                  className="nav-link"
                  to="/dashboard"
                  onClick={() => setIsExpanded(false)}
                >
                  DashBoard
                </Link>
                <Link
                  className="nav-link"
                  to="/manage"
                  onClick={() => setIsExpanded(false)}
                >
                  Manage
                </Link>
              </Fragment>
            ) : null}

            <NavDropdown
              title={
                <>
                  {`${username} `}
                  <BiUserCircle size="1.2em" />
                </>
              }
              id="nav-dropdown-user"
              className="font-italic"
            >
              {isAuth ? (
                <NavDropdown.Item onClick={logOut}>
                  Log Out <BiLogOut className="ml-3" />
                </NavDropdown.Item>
              ) : (
                <NavDropdown.Item onClick={handleLogInNav}>
                  Log In <BiLogIn className="ml-3" />
                </NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    username: state.auth.user.username,
    isAdmin: state.auth.user.is_admin,
  };
};

export default connect(mapStateToProps, null)(NavBar);
