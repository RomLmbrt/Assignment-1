import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Population density"
    }
  }
};

const labels = ["5 km", "10 km", "30 km", "100 km"];

const data = {
  labels,
  datasets: [
    {
      data: [5, 10, 30, 100],
      backgroundColor: "rgba(53, 162, 235, 0.5)"
    }
  ]
};

export function Chart() {
  return <Bar options={options} data={data} />;
}
