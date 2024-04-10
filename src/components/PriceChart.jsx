import React from "react";
import { Line } from "react-chartjs-2";

const PriceChart = ({ priceHistory }) => {
  const data = {
    labels: Array.from({ length: priceHistory.length }, (_, i) => i + 1),
    datasets: [
      {
        label: "Price",
        data: priceHistory,
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Price ($)",
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default PriceChart;
