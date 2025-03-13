"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
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
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2"; // Cambiamos Doughnut por Line

// Registrar los elementos necesarios para Chart.js
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

export default function CountryId() {
  const pathname = usePathname().split("/");
  const countryName = pathname[1].toUpperCase().replace("-", " ");
  const [response, setResponse] = useState<mainClimateChangeDataType[]>([]);
  const [seaLevels, setSeaLevels] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [co2Response, tempResponse, seaLevelResponse] = await Promise.all([
          axios.get(
            `https://services9.arcgis.com/weJ1QsnbMYJlCHdG/arcgis/rest/services/Indicator_2_Carbon_Emission_per_unit_of_Output/FeatureServer/0/query?where=Unit%20%3D%20'MILLIONS%20OF%20METRIC%20TONS%20OF%20CO2'%20AND%20Industry%20%3D%20'ELECTRICITY,%20GAS,%20STEAM%20AND%20AIR%20CONDITIONING%20SUPPLY'%20AND%20Country%20%3D%20'${countryName}'&outFields=Country,Unit,Source,F2018,F2017,F2016,F2015,F2014,F2013,F2012,F2011,F2010,F2009,F2008,Industry&outSR=4326&f=json`
          ),
          axios.get(
            `https://services9.arcgis.com/weJ1QsnbMYJlCHdG/arcgis/rest/services/Indicator_3_1_Climate_Indicators_Annual_Mean_Global_Surface_Temperature/FeatureServer/0/query?where=Country%20%3D%20'${countryName}'&outFields=Country,Unit,Source,F2008,F2009,F2010,F2011,F2012,F2013,F2014,F2015,F2016,F2017,F2018,F2019,F2020,F2021,F2022,F2023&outSR=4326&f=json`
          ),
          axios.get(
            `https://services9.arcgis.com/weJ1QsnbMYJlCHdG/arcgis/rest/services/Indicator_3_3_melted_new/FeatureServer/0/query?where=1%3D1&outFields=Country,Indicator,Unit,Source,Measure,Value,Date&outSR=4326&f=json&orderByFields=Date%20DESC&resultRecordCount=100`
          ),
        ]);
        setSeaLevels(seaLevelResponse.data.features);
        console.log("seaLevelResponse: ", seaLevelResponse);

        const co2Data = co2Response.data.features.map(
          (item: cO2ResponseType) => item.attributes
        );
        const tempData = tempResponse.data.features.map(
          (item: tempChangeResponseType) => item.attributes
        );

        // Combinar los datos solo para países que estén en ambas listas
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
          : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Valores por defecto si no hay datos
        borderColor: "rgba(255, 99, 132, 1)", // Rojo para la línea
        backgroundColor: "rgba(255, 99, 132, 0.2)", // Fondo bajo la línea
        fill: true, // Rellenar el área bajo la línea
        tension: 0.4, // Suavizar la línea
      },
    ],
  };

  // Opciones del gráfico de líneas
  const co2ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || "";
            const value = context.raw || 0;
            return `${label}: ${value} MMT`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Year",
        },
      },
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
    <div
      className="d-flex flex-column align-items-center"
      style={{ paddingTop: "80px" }}
    >
      <h1>{countryName}</h1>
      <div style={{ width: "600px", height: "400px" }}>
        <Line data={co2ChartData} options={co2ChartOptions} />
      </div>
    </div>
  );
}