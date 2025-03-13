import { useRouter } from "next/navigation";
import { mainClimateChangeDataType } from "../../types/apiResponseType";

interface CountryCardProps {
  countryItem: mainClimateChangeDataType;
}

const CountryCard = ({ countryItem }: CountryCardProps) => {
  const router = useRouter();
  const link = countryItem.Country.toLowerCase().replace(" ", "-");

  // Select a random sea from the SeaLevel array
  const randomSea =
    countryItem.SeaLevel[Math.floor(Math.random() * countryItem.SeaLevel.length)];

  return (
    <div
      className="cards-container d-flex align-items-stretch justify-content-evenly cursor-pointer"
      onClick={() => router.push(`/${link}`)} // Fixed template literal syntax
    >
      <div className="container-content d-flex flex-column justify-content-between text-white pt-4">
        <div className="d-flex">
          <h1 style={{ paddingRight: "32px" }}>{countryItem.Country}</h1>
          <div className="d-flex align-items-center">
            <i className="fa-solid fa-people-group fa-2xl me-2"></i>
            <p className="m-0">1,425,179,569</p>
          </div>
        </div>
        <div
          className="d-flex w-100 justify-content-between"
          style={{ paddingBottom: "32px" }}
        >
          <div className="d-flex flex-column">
            <p className="data-highlight m-0">
              {countryItem.CO2.data.F2018 !== null
                ? `${countryItem.CO2.data.F2018} MMT`
                : "N/A"}
            </p>
            <p className="m-0">CO2 Emissions</p>
          </div>
          <div className="d-flex flex-column">
            <p className="data-highlight m-0">
              {countryItem.Temperature.data.F2018 !== null
                ? `${countryItem.Temperature.data.F2018} °C`
                : "N/A"}
            </p>
            <p className="m-0">Temperature Change</p>
          </div>
          <div className="d-flex flex-column">
            <p className="data-highlight m-0">
              {randomSea ? `${randomSea.Value} mm` : "N/A"}
            </p>
            <p className="m-0">{randomSea ? randomSea.Measure : "Sea Level Rise"}</p>
          </div>
        </div>
      </div>
      <div className="d-flex h-100 align-items-center align-self-center">
        <i className="fas fa-chevron-right text-white"></i>
      </div>
    </div>
  );
};

export default CountryCard;