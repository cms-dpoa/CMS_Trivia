import React from "react";
import { Table, Container, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  updateLabelsAction,
  deleteLabelsAction,
} from "../../redux/ducks/labelDucks";

const LabelManage = ({ labels, labelsToCheck }) => {
  const dispatch = useDispatch();

  const handleAcceptNewLabel = (label) => {
    const labelChanged = { ...label, was_checked: true };
    dispatch(updateLabelsAction(labelChanged));
  };

  const handleDeleteLabel = (label) => {
    dispatch(deleteLabelsAction(label.id_label));
  };

  const showLabelCreatedText = (wasCreated) => (wasCreated ? "Yes" : "No");

  return (
    <Container>
      <Table hover responsive="sm">
        <thead>
          <tr>
            <th className="col-1">#</th>
            <th className="col-8">Label Name</th>
            <th className="col-1">{labelsToCheck ? null : "Created"}</th>
            <th className="col-1"> </th>
          </tr>
        </thead>
        <tbody>
          {labels.map((label, index) => (
            <tr key={label.id_label}>
              <td className="col-1">{index + 1}</td>
              <td className="col-8">{label.name}</td>

              <td className="col-1 p-0 pt-1 text-center">
                {labelsToCheck ? (
                  <Button
                    variant="success"
                    className="pt-1"
                    onClick={() => handleAcceptNewLabel(label)}
                  >
                    Accept
                  </Button>
                ) : (
                  showLabelCreatedText(label.was_created)
                )}
              </td>

              <td className="col-1 p-0 pt-1">
                <Button
                  variant="danger"
                  className="p-1"
                  onClick={() => handleDeleteLabel(label)}
                >
                  <RiDeleteBin6Line size="1.25em" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default LabelManage;
