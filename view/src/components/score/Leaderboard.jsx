import React, { useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { getLeaderBoardAction } from "../../redux/ducks/scoreDucks";

const Leaderboard = ({ leaderboards, username }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLeaderBoardAction());
  }, []);

  return (
    <Container>
      <h1>Leaderboard {username}</h1>

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
          {Object.keys(leaderboards).map((key) => (
            <tr
              key={key}
              style={
                leaderboards[key].username === username
                  ? { background: "#ffce54" }
                  : {}
              }
            >
              <td>{key}</td>
              <td>{leaderboards[key].username}</td>
              <td>5</td>
              <td>{leaderboards[key].score}</td>
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
    username: state.auth.user.username,
    leaderboards: state.scores.leaderboards,
  };
};

export default connect(mapStateToProps, null)(Leaderboard);
