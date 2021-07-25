import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Container } from "react-bootstrap";

const TopReliability = () => {
  const dataExample = {
    A: {
      labels: [],
    },
  };

  const data = {
    labels: ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5"],
    datasets: [
      {
        label: "Reliability (2,3]",
        data: [12, 19, 3, 5, 2],
        labels: ["test 1", "test 2", "test 3", "test 4", "test 5"],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 0.5)",
        borderWidth: 2,
      },
      {
        label: "Reliability (3,4]",
        data: [2, 3, 20, 5, 1],
        labels: ["test 1", "test 2", "test 3", "test 4", "test 5"],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 0.5)",
        borderWidth: 2,
      },
      {
        label: "Reliability (4,5]",
        labels: ["test 1", "test 2", "test 3", "test 4", "test 5"],
        data: [3, 10, 13, 15, 22],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 0.5)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        displayColors: true,
        // callbacks: {
        //   title: function (item, everything) {
        //     return;
        //   },
        //   label: function (item) {
        //     console.log(item);
        //     return "test 3";
        //   },
        // },
      },
    },
    scales: {
      yAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          stacked: true,
        },
      ],
    },
  };

  return <Bar data={data} options={options} height={100} />;
};

export default TopReliability;
