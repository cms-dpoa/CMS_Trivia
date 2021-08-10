import React, { useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import classNames from "classnames";
import { connect, useDispatch } from "react-redux";
import { getLeaderBoardAction } from "../../redux/ducks/scoreDucks";

const Leaderboard = ({ leaderboards, username }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLeaderBoardAction());
  }, []);

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
          {Object.keys(leaderboards).map((key) => {
            const isUserLogIn = leaderboards[key].username === username;
            const setBold = classNames("", {
              "font-weight-bold": isUserLogIn,
            });

            return (
              <tr
                key={key}
                style={isUserLogIn ? { background: "#ffce54" } : {}}
              >
                <td className={setBold}>{key}</td>
                <td className={setBold}>{leaderboards[key].username}</td>
                <td className={setBold}>5</td>
                <td className={setBold}>{leaderboards[key].score}</td>
              </tr>
            );
          })}
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
