const CountryCard = ({ countryItem }) => {
  return (
    <div className="cards-container d-flex align-items-stretch justify-content-evenly">
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
              {countryItem.F2018 !== null ? `${countryItem.F2018} MMT` : "N/A"}
            </p>
            <p className="m-0">CO2 Emissions</p>
          </div>
          <div className="d-flex flex-column">
            <p className="data-highlight m-0">
              {countryItem.Temp_2018 !== null ? `${countryItem.Temp_2018} °C` : "No Registros"}
            </p>
            <p className="m-0">Temperature Change</p>
          </div>
          <div className="d-flex flex-column">
            <p className="data-highlight m-0">3.5 mm</p>
            <p className="m-0">Sea Level Rise</p>
          </div>
        </div>
      </div>
      <div className="d-flex h-100 align-items-center align-self-center">
        <i className="fas fa-chevron-right text-white cursor-pointer"> </i>
      </div>
    </div>
  );
};

export default CountryCard;