"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation"; // Añadimos useRouter
import {
  cO2ResponseType,
  cO2DataType,
  tempChangeResponseType,
  tempChangeType,
  mainClimateChangeDataType,
} from "../types/apiResponseType";

// Importaciones de Chart.js y react-chartjs-2
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

// Registrar los elementos necesarios para Chart.js
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  BarElement,
  Tooltip,
  Legend
);

export default function CountryId() {
  const pathname = usePathname().split("/");
  const countryName = pathname[1].toUpperCase().replace("-", " ");
  const [response, setResponse] = useState<mainClimateChangeDataType[]>([]);
  const [seaLevels, setSeaLevels] = useState<any[]>([]);
  const router = useRouter(); // Hook para manejar la navegación

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [co2Response, tempResponse, seaLevelResponse] = await Promise.all(
          [
            axios.get(
              `https://services9.arcgis.com/weJ1QsnbMYJlCHdG/arcgis/rest/services/Indicator_2_Carbon_Emission_per_unit_of_Output/FeatureServer/0/query?where=Unit%20%3D%20'MILLIONS%20OF%20METRIC%20TONS%20OF%20CO2'%20AND%20Industry%20%3D%20'ELECTRICITY,%20GAS,%20STEAM%20AND%20AIR%20CONDITIONING%20SUPPLY'%20AND%20Country%20%3D%20'${countryName}'&outFields=Country,Unit,Source,F2018,F2017,F2016,F2015,F2014,F2013,F2012,F2011,F2010,F2009,F2008,Industry&outSR=4326&f=json`
            ),
            axios.get(
              `https://services9.arcgis.com/weJ1QsnbMYJlCHdG/arcgis/rest/services/Indicator_3_1_Climate_Indicators_Annual_Mean_Global_Surface_Temperature/FeatureServer/0/query?where=Country%20%3D%20'${countryName}'&outFields=Country,Unit,Source,F2008,F2009,F2010,F2011,F2012,F2013,F2014,F2015,F2016,F2017,F2018,F2019,F2020,F2021,F2022,F2023&outSR=4326&f=json`
            ),
            axios.get(
              `https://services9.arcgis.com/weJ1QsnbMYJlCHdG/arcgis/rest/services/Indicator_3_3_melted_new/FeatureServer/0/query?where=1%3D1&outFields=Country,Indicator,Unit,Source,Measure,Value,Date&outSR=4326&f=json&orderByFields=Date%20DESC&resultRecordCount=100`
            ),
          ]
        );
        setSeaLevels(seaLevelResponse.data.features);

        const co2Data = co2Response.data.features.map(
          (item: cO2ResponseType) => item.attributes
        );
        const tempData = tempResponse.data.features.map(
          (item: tempChangeResponseType) => item.attributes
        );

        const combinedData = co2Data
          .map((co2Item: cO2DataType) => {
            const tempItem = tempData.find(
              (temp: tempChangeType) => temp.Country === co2Item.Country
            );
            if (tempItem) {
              return {
                Country: co2Item.Country,
                CO2: {
                  Source: co2Item.Source,
                  Unit: co2Item.Unit,
                  Industry: co2Item.Industry,
                  data: {
                    F2008: co2Item.F2008,
                    F2009: co2Item.F2009,
                    F2010: co2Item.F2010,
                    F2011: co2Item.F2011,
                    F2012: co2Item.F2012,
                    F2013: co2Item.F2013,
                    F2014: co2Item.F2014,
                    F2015: co2Item.F2015,
                    F2016: co2Item.F2016,
                    F2017: co2Item.F2017,
                    F2018: co2Item.F2018,
                  },
                },
                Temperature: {
                  Source: tempItem.Source,
                  Unit: tempItem.Unit,
                  data: {
                    F2008: tempItem.F2008,
                    F2009: tempItem.F2009,
                    F2010: tempItem.F2010,
                    F2011: tempItem.F2011,
                    F2012: tempItem.F2012,
                    F2013: tempItem.F2013,
                    F2014: tempItem.F2014,
                    F2015: tempItem.F2015,
                    F2016: tempItem.F2016,
                    F2017: tempItem.F2017,
                    F2018: tempItem.F2018,
                    F2019: tempItem.F2019,
                    F2020: tempItem.F2020,
                    F2021: tempItem.F2021,
                    F2022: tempItem.F2022,
                    F2023: tempItem.F2023,
                  },
                },
              };
            }
            return null;
          })
          .filter((item: mainClimateChangeDataType) => item !== null);

        setResponse(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [countryName]);

  // Datos para el gráfico de líneas (CO2 emissions over time)
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
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const co2ChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw} MMT`,
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

  // Datos para el gráfico de líneas (Temperature change over time)
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
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw} °C`,
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

  // Filtrar datos de nivel del mar para la fecha más reciente
  const latestDate = seaLevels[0]?.attributes?.Date || "D12/31/2024";
  const latestSeaLevels = seaLevels.filter(
    (item) => item.attributes.Date === latestDate
  );

  // Datos para el gráfico de barras (Sea Level Change)
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
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw} mm`,
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
    <div
      className="d-flex flex-column align-items-center position-relative"
      style={{ paddingTop: "80px" }}
    >
      <div className="d-flex " style={{ width: "600px"}}>
        <button
          onClick={() => router.push("/")}
          className="btn btn-outline-primary"
          style={{ margin: "0 0 24px 0" }}
        >
          Back to Home
        </button>
      </div>

      <h1 style={{ paddingBottom: "24px" }}>{countryName}</h1>

      <div style={{ width: "600px", height: "400px", marginBottom: "40px" }}>
        <h2>CO2 Emissions Over Time</h2>
        <Line data={co2ChartData} options={co2ChartOptions} />
      </div>

      <div style={{ width: "600px", height: "400px", marginBottom: "40px" }}>
        <h2>Temperature Change Over Time</h2>
        <Line data={tempChartData} options={tempChartOptions} />
      </div>

      <div style={{ width: "600px", height: "400px" }}>
        <h2>Global Sea Level Change (Latest Data)</h2>
        {latestSeaLevels.length > 0 ? (
          <Bar data={seaLevelChartData} options={seaLevelChartOptions} />
        ) : (
          <p>No sea level data available for the latest date.</p>
        )}
      </div>
    </div>
  );
}
