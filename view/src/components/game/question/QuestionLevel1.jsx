import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";
import classNames from "classnames";

const QuestionLevel1 = ({
  options,
  setAnswerSelected,
  setActivateBtnSendAnswer,
  activateRemoveOne,
  activateFiftyFifty,
}) => {
  // const [listOptions, setListOptions] = useState(options);

  const handleSelectAnswer = (data) => {
    setAnswerSelected(data.target.id);
    setActivateBtnSendAnswer(true);
  };

  useEffect(() => {});

  // const classOptions = (isVisible) => {
  //   let className = "mr-3 pl-5 pr-5 mb-3 mb-lg-0 mt-lg-3 ";
  //   if (!isVisible) {
  //     className += "invisible";
  //   }
  //   return className;
  // };

  const classOptions = (visible) =>
    classNames("mr-3 pl-5 pr-5 mb-3 mb-lg-0 mt-lg-3", { invisible: !visible });

  // console.log(listOptions);

  // if (activateRemoveOne) {
  //   console.log("RemoveOne");
  //   const optionsVisi = setInvisibleOptions(listOptions, 1);
  //   setListOptions(optionsVisi);
  //   console.log(optionsVisi);
  // }

  // if (activateFiftyFifty) {
  //   console.log("FiftyFifty");
  //   const optionsVisi = setInvisibleOptions(listOptions, 1);
  //   setListOptions(optionsVisi);
  //   console.log(optionsVisi);
  // }

  return (
    <ButtonGroup>
      <Row>
        {options.map((option) => (
          <Col key={option.id_label} sm="12" lg="6">
            <Button
              block
              key={option.id_label}
              id={option.id_label}
              variant="outline-primary"
              className={classOptions(option.show)}
              onClick={handleSelectAnswer}
            >
              {option.name}
            </Button>
          </Col>
        ))}
        {/* <Button onClick={testVisi}>test</Button> */}
      </Row>
    </ButtonGroup>
  );
};

export default QuestionLevel1;
