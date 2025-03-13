"use client";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  TooltipItem,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { mainClimateChangeDataType } from "../../../types/apiResponseType";

// Register ChartJS components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

interface TempChartProps {
  response: mainClimateChangeDataType[];
}

const TempChart = ({ response }: TempChartProps) => {
  const tempChartData = {
    labels: [
      "2008",
      "2009",
      "2010",
      "2011",
      "2012",
      "2013",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
      "2020",
      "2021",
      "2022",
      "2023",
    ],
    datasets: [
      {
        label: "Temperature Change (°C)",
        data: response[0]?.Temperature?.data
          ? [
              response[0].Temperature.data.F2008,
              response[0].Temperature.data.F2009,
              response[0].Temperature.data.F2010,
              response[0].Temperature.data.F2011,
              response[0].Temperature.data.F2012,
              response[0].Temperature.data.F2013,
              response[0].Temperature.data.F2014,
              response[0].Temperature.data.F2015,
              response[0].Temperature.data.F2016,
              response[0].Temperature.data.F2017,
              response[0].Temperature.data.F2018,
              response[0].Temperature.data.F2019,
              response[0].Temperature.data.F2020,
              response[0].Temperature.data.F2021,
              response[0].Temperature.data.F2022,
              response[0].Temperature.data.F2023,
            ]
          : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const tempChartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"line">) => `${context.dataset.label}: ${context.raw} °C`,
        },
      },
    },
    scales: {
      x: { title: { display: true, text: "Year" } },
      y: {
        title: { display: true, text: "Temperature Change (°C)" },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "600px", height: "400px", marginBottom: "40px" }}>
      <h2 className="fc-dark">Temperature Change Over Time</h2>
      <Line data={tempChartData} options={tempChartOptions} />
    </div>
  );
};

export default TempChart;