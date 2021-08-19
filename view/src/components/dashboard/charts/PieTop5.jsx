import React from "react";
import { Doughnut } from "react-chartjs-2";

const PieTop5 = ({ labels, votes }) => {
  const data = {
    labels,
    datasets: [
      {
        label: "# of Votes",
        data: votes,
        backgroundColor: [
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Doughnut data={data} height={1000} />;
};

export default PieTop5;
