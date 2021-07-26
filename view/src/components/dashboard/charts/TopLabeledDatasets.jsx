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
    plugins: {
      tooltip: {},
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
      <Bar data={data} options={options} height={600} />
    </Container>
  );
};

export default TopLabeledDataset;
