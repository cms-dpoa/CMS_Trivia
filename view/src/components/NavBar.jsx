import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">CMS Game</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#play">Let's Play</Nav.Link>
          <Nav.Link href="#myscore">My Score</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
