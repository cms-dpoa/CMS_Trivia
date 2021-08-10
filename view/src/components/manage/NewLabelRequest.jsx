import React, { useEffect } from "react";
import { Table, Container, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getLabelsAction } from "../../redux/ducks/labelDucks";

const NewLabelRequest = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLabelsAction());
  }, []);

  const labels = useSelector((store) => store.labels.array);

  const handleAcceptNewLabel = (label) => {
    console.log(label);
    console.log("Accept");
  };

  const handleDeleteLabel = (label) => {
    console.log("Accept");
  };

  return (
    <Container>
      <Table hover responsive="sm">
        <thead>
          <tr>
            <th className="col-1">#</th>
            <th className="col-8">Label Name</th>
            <th className="col-1"> </th>
            <th className="col-1"> </th>
          </tr>
        </thead>
        <tbody>
          {labels.map((label, index) => (
            <tr key={label.id_label}>
              <td className="col-1">{index + 1}</td>
              <td className="col-8">{label.name}</td>

              <td className="col-1 p-0 pt-1">
                <Button
                  variant="success"
                  className="pt-1"
                  onClick={() => handleAcceptNewLabel(label)}
                >
                  Accept
                </Button>
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

export default NewLabelRequest;
