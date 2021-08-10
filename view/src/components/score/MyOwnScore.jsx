import React, { useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { getMyScoresAction } from "../../redux/ducks/scoreDucks";

const MyOwnScore = ({ user, myScores }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyScoresAction(user.username));
  }, []);

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
          {Object.keys(myScores).map((key) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{myScores[key]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    user: state.auth.user,
    myScores: state.scores.myScores,
  };
};

export default connect(mapStateToProps, null)(MyOwnScore);
