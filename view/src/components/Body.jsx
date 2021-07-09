import React, { Fragment, useState } from "react";
import { Container, Button } from "react-bootstrap";
import GameOver from "./GameOver";
import Question from "./question/Question";

const Body = () => {
  const questions = [
    {
      id_data: 444,
      title: "data 1 xyxyxyyxyxyx",

      options: [
        {
          id_label: 44,
          name: "Label 1",
          is_correct: false,
        },
        {
          id_label: 2,
          name: "Label 2",
          is_correct: true,
        },
        {
          id_label: 3,
          name: "Label 3",
          is_correct: false,
        },
        {
          id_label: 4,
          name: "Label 4",
          is_correct: false,
        },
      ],
    },
    {
      id_data: 444,
      title: "data 2 xyxyxyyxyxyx",

      options: [
        {
          id_label: 1,
          name: "Label 1",
          is_correct: false,
        },
        {
          id_label: 2,
          name: "Label 2",
          is_correct: true,
        },
        {
          id_label: 3,
          name: "Label 3",
          is_correct: false,
        },
        {
          id_label: 4,
          name: "Label 4",
          is_correct: false,
        },
      ],
    },
    {
      id_data: 444,
      title: "data 3 xyxyxyyxyxyx",

      options: [
        {
          id_label: 1,
          name: "Label 1",
          is_correct: false,
        },
        {
          id_label: 2,
          name: "Label 2",
          is_correct: true,
        },
        {
          id_label: 3,
          name: "Label 3",
          is_correct: false,
        },
        {
          id_label: 4,
          name: "Label 4",
          is_correct: false,
        },
      ],
    },
    {
      id_data: 444,
      title: "data 4 xyxyxyyxyxyx",

      options: [
        {
          id_label: 1,
          name: "Label 1",
          is_correct: false,
        },
        {
          id_label: 2,
          name: "Label 2",
          is_correct: true,
        },
        {
          id_label: 3,
          name: "Label 3",
          is_correct: false,
        },
        {
          id_label: 4,
          name: "Label 4",
          is_correct: false,
        },
      ],
    },
    {
      id_data: 444,
      title: "data 5 xyxyxyyxyxyx",

      options: [
        {
          id_label: 1,
          name: "Label 1",
          is_correct: false,
        },
        {
          id_label: 2,
          name: "Label 2",
          is_correct: true,
        },
        {
          id_label: 3,
          name: "Label 3",
          is_correct: false,
        },
        {
          id_label: 4,
          name: "Label 4",
          is_correct: false,
        },
      ],
    },
    {
      id_data: 444,
      title: "data 6 xyxyxyyxyxyx",

      options: [
        {
          id_label: 1,
          name: "Label 1",
          is_correct: false,
        },
        {
          id_label: 2,
          name: "Label 2",
          is_correct: true,
        },
        {
          id_label: 3,
          name: "Label 3",
          is_correct: false,
        },
        {
          id_label: 4,
          name: "Label 4",
          is_correct: false,
        },
      ],
    },
    {
      id_data: 444,
      title: "data 7 xyxyxyyxyxyx",

      options: [
        {
          id_label: 1,
          name: "Label 1",
          is_correct: false,
        },
        {
          id_label: 2,
          name: "Label 2",
          is_correct: true,
        },
        {
          id_label: 3,
          name: "Label 3",
          is_correct: false,
        },
        {
          id_label: 4,
          name: "Label 4",
          is_correct: false,
        },
      ],
    },
    {
      id_data: 444,
      title: "data 8 xyxyxyyxyxyx",

      options: [
        {
          id_label: 1,
          name: "Label 1",
          is_correct: false,
        },
        {
          id_label: 2,
          name: "Label 2",
          is_correct: true,
        },
        {
          id_label: 3,
          name: "Label 3",
          is_correct: false,
        },
        {
          id_label: 4,
          name: "Label 4",
          is_correct: false,
        },
      ],
    },
    {
      id_data: 444,
      title: "data 9 xyxyxyyxyxyx",

      options: [
        {
          id_label: 1,
          name: "Label 1",
          is_correct: false,
        },
        {
          id_label: 2,
          name: "Label 2",
          is_correct: true,
        },
        {
          id_label: 3,
          name: "Label 3",
          is_correct: false,
        },
        {
          id_label: 4,
          name: "Label 4",
          is_correct: false,
        },
      ],
    },
    {
      id_data: 444,
      title: "data 10 xyxyxyyxyxyx",

      options: [
        {
          id_label: 1,
          name: "Label 1",
          is_correct: false,
        },
        {
          id_label: 2,
          name: "Label 2",
          is_correct: true,
        },
        {
          id_label: 3,
          name: "Label 3",
          is_correct: false,
        },
        {
          id_label: 4,
          name: "Label 4",
          is_correct: false,
        },
      ],
    },
  ];

  const [numQuestion, setNumQuestion] = useState(1);
  const [question, setQuestion] = useState(questions[numQuestion - 1]);
  const [score, setScore] = useState(0);
  const [activateBtnSendAnswer, setActivateBtnSendAnswer] = useState(false);
  const [IdAswerSelected, setIdAnswerSelected] = useState(0);

  const NextQuestion = () => {
    if (numQuestion <= 5) {
      const optionsQuestion = question.options;
      const answerSeleted = optionsQuestion.find(
        (option) => option.id_label == IdAswerSelected
      );
      if (answerSeleted.is_correct) {
        setScore(score + 1);
      }
    }
    setQuestion(questions[numQuestion]);
    setNumQuestion(numQuestion + 1);
    setActivateBtnSendAnswer(false);
    var print = "Question " + numQuestion + " - Score " + score;
    console.log(print);
  };

  const resetGameAction = () => {
    console.log("reset Game");
    setNumQuestion(1);
    setScore(0);
    setQuestion(questions[0]);
  };

  return (
    <Container>
      {numQuestion > 10 ? (
        <GameOver resetGameAction={resetGameAction} score={score} />
      ) : (
        <Fragment>
          <Question
            question={question}
            numQuestion={numQuestion}
            setAnswerSelected={setIdAnswerSelected}
            setActivateBtnSendAnswer={setActivateBtnSendAnswer}
          />

          <Button
            variant="primary"
            className="mt-5 font-weight-bold"
            block
            onClick={NextQuestion}
            disabled={!activateBtnSendAnswer}
          >
            Send Answer
          </Button>
        </Fragment>
      )}
    </Container>
  );
};

export default Body;
