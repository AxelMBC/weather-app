"use client";
import { useEffect, useState } from "react";
import CountryCard from "./components/CountryCard";
import Header from "./components/Header";
import axios from "axios";
import "./globals.css";

export default function Home() {
  const [response, setResponse] = useState([]);
  console.log("Response: ", response);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [co2Response, tempResponse] = await Promise.all([
          axios.get(
            `https://services9.arcgis.com/weJ1QsnbMYJlCHdG/arcgis/rest/services/Indicator_2_Carbon_Emission_per_unit_of_Output/FeatureServer/0/query?where=Unit%20%3D%20'MILLIONS%20OF%20METRIC%20TONS%20OF%20CO2'%20AND%20Industry%20%3D%20'ELECTRICITY,%20GAS,%20STEAM%20AND%20AIR%20CONDITIONING%20SUPPLY'&outFields=Country,Unit,Source,F2018,F2017,F2016,F2015,F2014,F2013,F2012,F2011,F2010,F2009,F2008,Industry&outSR=4326&f=json&resultRecordCount=100`
          ),
          axios.get(
            `https://services9.arcgis.com/weJ1QsnbMYJlCHdG/arcgis/rest/services/Indicator_3_1_Climate_Indicators_Annual_Mean_Global_Surface_Temperature/FeatureServer/0/query?where=1%3D1&outFields=Country,Unit,Source,F2008,F2009,F2010,F2011,F2012,F2013,F2014,F2015,F2016,F2017,F2018,F2019,F2020,F2021,F2022,F2023&outSR=4326&f=json&resultRecordCount=100`
          ),
        ]);

        const co2Data = co2Response.data.features.map((item) => item.attributes);
        const tempData = tempResponse.data.features.map((item) => item.attributes);

        // Combinar los datos solo para países que estén en ambas listas
        const combinedData = co2Data
          .map((co2Item) => {
            const tempItem = tempData.find(
              (temp) => temp.Country === co2Item.Country
            );
            if (tempItem) {
              return {
                ...co2Item,
                Temp_2018: tempItem.F2018, // Añadimos la temperatura de 2018
              };
            }
            return null; // Si no hay coincidencia, devolvemos null
          })
          .filter((item) => item !== null); // Filtramos los null para quedarnos solo con países que tienen ambos datos

        setResponse(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log("response: ", response);

  return (
    <div>
      <main>
        <Header />
        <div className="spacing-card d-flex flex-column align-items-center gap-4">
          {response.length > 0 &&
            response.map((item) => (
              <CountryCard key={item.Country} countryItem={item} />
            ))}
        </div>
      </main>
    </div>
  );
}