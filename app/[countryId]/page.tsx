"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import {
  cO2ResponseType,
  cO2DataType,
  tempChangeResponseType,
  tempChangeType,
  mainClimateChangeDataType,
  seaLevelResponseType,
} from "../types/apiResponseType";
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
import CO2Chart from "../components/charts/CO2Chart";
import TempChart from "../components/charts/TempChart"; // Nueva importación
import SeaLevelChart from "../components/charts/SeaLevelChart";

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
  const [seaLevels, setSeaLevels] = useState<seaLevelResponseType[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [countryName]);

  return (
    <div
      className="d-flex flex-column align-items-center position-relative"
      style={{ paddingTop: "80px" }}
    >
      <div className="d-flex" style={{ width: "600px" }}>
        <button
          onClick={() => router.push("/")}
          className="btn btn-outline-dark"
          style={{ margin: "0 0 24px 0" }}
        >
          Back to Home
        </button>
      </div>
      <h1 className="fc-dark" style={{ paddingBottom: "24px" }}>
        {countryName}
      </h1>
      <CO2Chart response={response} loading={loading} />
      <TempChart response={response} loading={loading} />
      <SeaLevelChart response={seaLevels} loading={loading} />
    </div>
  );
}
