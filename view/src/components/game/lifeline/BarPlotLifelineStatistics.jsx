import React from "react";
import { Bar } from "react-chartjs-2";

const BarPlotLifelineStatistics = ({ labels, votes }) => {
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

export default BarPlotLifelineStatistics;
