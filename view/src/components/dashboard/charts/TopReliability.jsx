import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Container } from "react-bootstrap";

const TopReliability = ({ labels, amplitudes }) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Score",
        data: amplitudes,
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
      // {
      //   label: "Reliability (3,4]",
      //   data: [2, 3, 20, 5, 1],
      //   labels: ["test 1", "test 2", "test 3", "test 4", "test 5"],
      //   backgroundColor: "rgba(54, 162, 235, 0.5)",
      //   borderColor: "rgba(54, 162, 235, 0.5)",
      //   borderWidth: 2,
      // },
      // {
      //   label: "Reliability (4,5]",
      //   labels: ["test 1", "test 2", "test 3", "test 4", "test 5"],
      //   data: [3, 10, 13, 15, 22],
      //   backgroundColor: "rgba(75, 192, 192, 0.5)",
      //   borderColor: "rgba(75, 192, 192, 0.5)",
      //   borderWidth: 2,
      // },
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
