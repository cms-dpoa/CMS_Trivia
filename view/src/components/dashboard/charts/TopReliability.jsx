import React from "react";
import { Bar } from "react-chartjs-2";

const TopReliability = ({ labels, votes, scores }) => {
  const data = {
    labels,
    datasets: [
      {
        label: "# of Votes",
        data: votes,
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
      {
        label: "Score",
        data: scores,
        backgroundColor: ["rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return <Bar data={data} options={options} height={120} />;
};

export default TopReliability;
