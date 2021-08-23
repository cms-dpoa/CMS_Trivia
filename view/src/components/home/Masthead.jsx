import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
// import mastheadFig from "../../assets/masthead.jpg";

const Masthead = () => {
  return (
    <Container className="pt-5 pb-5 mt-md-5 mb-md-5">
      <Row className="d-flex align-items-center mt-3 mb-4">
        <Col>
          <h2>Play games, tag CMS exprimental datasets and win!</h2>
          <Link to="/play">
            <Button className="mt-4 pl-5 pr-5"> Go play </Button>
          </Link>
        </Col>

        <Col xs={12} sm={6}>
          <Image
            src="https://img.freepik.com/vector-gratis/jugadores-que-usan-diferentes-dispositivos-juegan-telefonos-moviles-tabletas-computadoras-portatiles-consolas-ilustracion-dibujos-animados_74855-14380.jpg?size=626&ext=jpg&ga=GA1.2.608155326.1628121600"
            thumbnail
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Masthead;
