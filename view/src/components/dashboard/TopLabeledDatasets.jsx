import React from "react";
import { Bar } from "react-chartjs-2";
import { Container } from "react-bootstrap";

const TopLabeledDataset = () => {
  const data = {
    labels: ["Google Analytics", "", "Web", ""],
    tooltipText: [
      "Wild Quess",
      "Very Analytical",
      "Fine Prediction",
      "Bob's opinion",
    ],
    datasets: [
      {
        data: [250, 260, 270, 280],
        backgroundColor: [
          "rgb(182, 197, 211)",
          "rgba(113, 152, 214, 1.0)",
          "rgb(182, 197, 211)",
          "rgba(113, 152, 214, 1.0)",
        ],
      },
    ],
  };

  const options = {
    responsive: false,
    legend: { display: false },
    tooltips: {
      enabled: true,
      displayColors: false,
      yPadding: 10,
      xPadding: 30,
      caretSize: 10,
      backgroundColor: "rgba(240, 240, 240, 1)",
      titleFontColor: "rgb(50, 100, 50)",
      bodyFontColor: "rgb(50, 50, 50)",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 1,
      cornerRadius: 0,
      yAlign: "bottom",
      xAlign: "center",
      position: "custom",
    },
    scales: {
      yAxes: [
        {
          ticks: {
            type: "category",
            labelOffset: 35,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
            stepSize: 100,
          },
        },
      ],
    },
  };

  return (
    <Container>
      <h2>TopLabeledDataset</h2>
      <Bar data={data} options={options} height={300} />
    </Container>
  );
};

export default TopLabeledDataset;
