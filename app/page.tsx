"use client";
import { useEffect, useState } from "react";
import CountryCard from "./components/CountryCard";
import Header from "./components/Header";
import axios from "axios";
import "./globals.css";

export default function Home() {
  const [response, setResponse] = useState();
  console.log("response: ", response);
  useEffect(() => {
    const handleAPI = async () => {
      const { data } = await axios.post(
        `https://services9.arcgis.com/weJ1QsnbMYJlCHdG/arcgis/rest/services/Indicator_2_Carbon_Emission_per_unit_of_Output/FeatureServer/0/query?where=Unit%20%3D%20'MILLIONS%20OF%20METRIC%20TONS%20OF%20CO2'%20AND%20Industry%20%3D%20'ELECTRICITY,%20GAS,%20STEAM%20AND%20AIR%20CONDITIONING%20SUPPLY'&outFields=Country,Unit,Source,F2018,F2017,F2016,F2015,F2014,F2013,F2012,F2011,F2010,F2009,F2008,Industry&outSR=4326&f=json`
      );
      setResponse(data.features);
    };
    handleAPI();
  }, []);
  return (
    <div>
      <main>
        <Header />
        <div className="spacing-card d-flex flex-column align-items-center gap-4">
          {response && response.map((item)=><CountryCard key={item.attributes.Country} countryItem={item.attributes}/>)}
          {/* <CountryCard /> */}
        </div>
      </main>
    </div>
  );
}
