"use client";

import { TooltipItem } from "chart.js";
import { Bar } from "react-chartjs-2";
import { seaLevelResponseType } from "../../../types/apiResponseType";
import Spinner from "../../utils/Spinner"


const SeaLevelChart = ({ response, loading }: { response:  seaLevelResponseType[], loading:boolean }) => {
  const latestDate = response[0]?.attributes?.Date || "D12/31/2024";
  const latestSeaLevels = response.filter(
    (item) => item.attributes.Date === latestDate
  );

  const seaLevelChartData = {
    labels: latestSeaLevels.map((item) => item.attributes.Measure),
    datasets: [
      {
        label: `Sea Level Change on ${latestDate.replace("D", "")}`,
        data: latestSeaLevels.map((item) => item.attributes.Value),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const seaLevelChartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"bar">) =>
            `${context.label}: ${context.raw} mm`,
        },
      },
    },
    scales: {
      x: { title: { display: true, text: "Region" } },
      y: {
        title: { display: true, text: "Change in Mean Sea Level (mm)" },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "600px", height: "400px" }}>
      <h2 className="fc-dark">Global Sea Level Change (Latest Data)</h2>
      {latestSeaLevels.length > 0 && !loading ? (
        <Bar data={seaLevelChartData} options={seaLevelChartOptions} />
      ) : (
       <Spinner />
      )}
    </div>
  );
};

export default SeaLevelChart;
