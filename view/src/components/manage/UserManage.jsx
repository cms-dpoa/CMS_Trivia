import React from "react";
import { Table, Container, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { FaCheck } from "react-icons/fa";
import { updateUserAction } from "../../redux/ducks/userDucks";

const UserManage = ({ users }) => {
  const dispatch = useDispatch();

  const handleUpdatedUser = (user, setSuperAdmin) => {
    const userChanged = { ...user };
    if (setSuperAdmin) {
      const isSuperUser = !userChanged.is_superuser;
      userChanged.is_superuser = isSuperUser;
      userChanged.is_admin = isSuperUser;
    } else {
      userChanged.is_admin = !user.is_admin;
    }
    dispatch(updateUserAction(userChanged));
  };

  const colorButton = (isActivate) => (isActivate ? "success" : "light");

  return (
    <Container>
      <Table hover responsive="sm">
        <thead>
          <tr>
            <th className="col-1">#</th>
            <th className="col-6">Username</th>
            <th className="col-2 text-center">Mean Score</th>
            <th className="col-1 text-center">Admin</th>
            <th className="col-1 text-center">SuperAdmin</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.username}>
              <td className="col-1">{index + 1}</td>
              <td className="col-6">{user.username}</td>
              <td className="col-2 text-center">
                {user.mean_score.toFixed(2)}
              </td>

              <td className="col-1 p-0 pt-1 text-center">
                <Button
                  variant={colorButton(user.is_admin)}
                  onClick={() => handleUpdatedUser(user, false)}
                >
                  <FaCheck size="1.2rem" />
                </Button>
              </td>

              <td className="col-1 p-0 pt-1 text-center">
                <Button
                  variant={colorButton(user.is_superuser)}
                  onClick={() => handleUpdatedUser(user, true)}
                >
                  <FaCheck size="1.2rem" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserManage;
