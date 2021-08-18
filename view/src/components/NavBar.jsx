import React, { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { connect } from "react-redux";

const NavBar = ({ username }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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

            <Link
              className="nav-link"
              to="/dashboard"
              onClick={() => setIsExpanded(false)}
            >
              DashBoard
            </Link>

            <Link
              className="nav-link font-italic"
              to="/"
              onClick={() => setIsExpanded(false)}
            >
              {`${username} `}
              <BiUserCircle size="1.2em" />
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.auth.user.username,
  };
};

export default connect(mapStateToProps, null)(NavBar);
