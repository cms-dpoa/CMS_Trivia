import React, { useState } from "react";
import { Alert as AlertBoostrap, Button, Col } from "react-bootstrap";

const Alert = ({ showAlert }) => {
  const [show, setShow] = useState(showAlert);

  return (
    <AlertBoostrap variant="danger" onClose={() => setShow(false)} dismissible>
      <AlertBoostrap.Heading>Oh snap! You got an error!</AlertBoostrap.Heading>
      <p>
        Change this and that and try again. Duis mollis, est non commodo luctus,
        nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis
        consectetur purus sit amet fermentum.
      </p>
    </AlertBoostrap>
  );
};

export default Alert;
