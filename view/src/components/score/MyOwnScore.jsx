import React, { useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAuthAction } from "../../redux/ducks/authDucks";

const MyOwnScore = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuthAction());
  }, []);

  const user = useSelector((store) => store.auth.user);

  return (
    <Container>
      <h1>My Score</h1>
      <h5 className="text-right">Mean Score {user.mean_score}</h5>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Game</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>4.50</td>
          </tr>
          <tr>
            <td>2</td>
            <td>4.25</td>
          </tr>
          <tr>
            <td>3</td>
            <td>5.00</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default MyOwnScore;
