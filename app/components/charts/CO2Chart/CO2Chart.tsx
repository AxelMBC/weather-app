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
import Spinner from "../../utils/Spinner";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

interface CO2ChartProps {
  response: mainClimateChangeDataType[];
  loading: boolean;
}

const CO2Chart = ({ response, loading }: CO2ChartProps) => {
  console.log("response: ", response);
  const co2ChartData = {
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
    ],
    datasets: [
      {
        label: "CO2 Emissions (Millions of Metric Tons)",
        data: response[0]?.CO2?.data
          ? [
              response[0].CO2.data.F2008,
              response[0].CO2.data.F2009,
              response[0].CO2.data.F2010,
              response[0].CO2.data.F2011,
              response[0].CO2.data.F2012,
              response[0].CO2.data.F2013,
              response[0].CO2.data.F2014,
              response[0].CO2.data.F2015,
              response[0].CO2.data.F2016,
              response[0].CO2.data.F2017,
              response[0].CO2.data.F2018,
            ]
          : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const co2ChartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"line">) =>
            `${context.dataset.label}: ${context.raw} MMT`,
        },
      },
    },
    scales: {
      x: { title: { display: true, text: "Year" } },
      y: {
        title: {
          display: true,
          text: "CO2 Emissions (Millions of Metric Tons)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "600px", height: "400px", marginBottom: "40px" }}>
      <div className="d-flex align-items-center justify-content-between">
        <h2 className="fc-dark">CO2 Emissions Over Time</h2>
        {response && (
          <button
            type="button"
            className="btn btn-src"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title={response[0]?.CO2.Source}
          >
            Src
          </button>
        )}
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <Line data={co2ChartData} options={co2ChartOptions} />
      )}
    </div>
  );
};

export default CO2Chart;
