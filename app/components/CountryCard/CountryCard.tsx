const CountryCard = () => {
  return (
    <div className="w-100 h-100  d-flex justify-content-evenly">
      <div className="container-content h-100  d-flex flex-column text-white pt-4">
        <div className="d-flex mb-auto">
          <h1 style={{ paddingRight: "32px" }}>China</h1>
          <div className="d-flex align-items-center">
            <i className="fa-solid fa-people-group fa-2xl me-2"></i>
            <p className="m-0">1,425,179,569</p>
          </div>
        </div>
        <div className="d-flex w-100 align-self-baseline justify-content-between" style={{marginBottom:"32px"}}>
          <div className="d-flex flex-column">
            <p className="data-highlight m-0">12,667,428,430 T</p>
            <p className="m-0">CO2 Emissions</p>
          </div>
          <div className="d-flex flex-column">
            <p className="data-highlight m-0">-1.04 °C</p>
            <p className="m-0">Temperature Change</p>
          </div>

          <div className="d-flex flex-column">
            <p className="data-highlight m-0">3.5 mm</p>
            <p className="m-0">Sea Level Rise </p>
          </div>
        </div>
      </div>
      <div className="d-flex h-100 align-items-center">
        <i className="fas fa-chevron-right text-white cursor-pointer"> </i>
      </div>
    </div>
  );
};

export default CountryCard;
