import React, { useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
// import { getAutdAction } from "../../redux/ducks/authDucks";

const TopScore = () => {
  const dispatch = useDispatch();

  //   useEffect(() => {
  //     dispatch(getAuthAction());
  //   }, []);

  const user = useSelector((store) => store.auth.user);

  return (
    <Container>
      <h1>Tops Score</h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>UserName</th>
            <th># Game</th>
            <th>Mean Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Josue</td>
            <td>1</td>
            <td>4.50</td>
          </tr>
          <tr>
            <td>Juan</td>
            <td>2</td>
            <td>4.25</td>
          </tr>
          <tr>
            <td>Kati</td>
            <td>3</td>
            <td>5.00</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default TopScore;
