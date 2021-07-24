import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/home">CMS Game</Navbar.Brand>
        <Nav className="me-auto">
          <Link className="nav-link" to="/home">
            Home
          </Link>
          <Link className="nav-link" to="/play">
            Let's Play
          </Link>
          <Link className="nav-link" to="/myscore">
            My Score
          </Link>
          <Link className="nav-link" to="/dashboard">
            DashBoard
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
