"use client";
import { useEffect, useState } from "react";
import axios from "axios"
import { usePathname, useSearchParams } from "next/navigation";

export default function CountryId() {
  const pathname = usePathname().split("/");
    //   console.log(pathname[1]);
    const countryName = pathname[1].toUpperCase().replace("-", " ")
    const [response, setResponse] = useState([]);
  console.log("Response: ", response);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [co2Response, tempResponse] = await Promise.all([
          axios.get(
            `https://services9.arcgis.com/weJ1QsnbMYJlCHdG/arcgis/rest/services/Indicator_2_Carbon_Emission_per_unit_of_Output/FeatureServer/0/query?where=Unit%20%3D%20'MILLIONS%20OF%20METRIC%20TONS%20OF%20CO2'%20AND%20Industry%20%3D%20'ELECTRICITY,%20GAS,%20STEAM%20AND%20AIR%20CONDITIONING%20SUPPLY'%20AND%20Country%20%3D%20'${countryName}'&outFields=Country,Unit,Source,F2018,F2017,F2016,F2015,F2014,F2013,F2012,F2011,F2010,F2009,F2008,Industry&outSR=4326&f=json`
          ),
          axios.get(
            `https://services9.arcgis.com/weJ1QsnbMYJlCHdG/arcgis/rest/services/Indicator_3_1_Climate_Indicators_Annual_Mean_Global_Surface_Temperature/FeatureServer/0/query?where=Country%20%3D%20'${countryName}'&outFields=Country,Unit,Source,F2008,F2009,F2010,F2011,F2012,F2013,F2014,F2015,F2016,F2017,F2018,F2019,F2020,F2021,F2022,F2023&outSR=4326&f=json`
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
                Country: co2Item.Country,
                CO2: {
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
                Temperature: {
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
                Unit: co2Item.Unit, // De CO2
                Source: co2Item.Source, // De CO2
                Industry: co2Item.Industry, // De CO2
              };
            }
            return null; // Si no hay coincidencia, devolvemos null
          })
          .filter((item) => item !== null); // Filtramos los null

        setResponse(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return <div>Hola</div>;
}
