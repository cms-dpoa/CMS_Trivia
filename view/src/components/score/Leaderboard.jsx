import React, { useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
// import { getAutdAction } from "../../redux/ducks/authDucks";

const Leaderboard = () => {
  const dispatch = useDispatch();

  //   useEffect(() => {
  //     dispatch(getAuthAction());
  //   }, []);

  const user = useSelector((store) => store.auth.user);

  return (
    <Container>
      <h1>Leaderboard</h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Top</th>
            <th>UserName</th>
            <th># Games</th>
            <th>Mean Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Kati</td>
            <td>5</td>
            <td>5.00</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Juan</td>
            <td>2</td>
            <td>4.50</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Josue</td>
            <td>4</td>
            <td>4.25</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default Leaderboard;
