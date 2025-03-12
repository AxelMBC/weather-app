const CountryCard = () => {
  return (
    <div className="w-100 d-flex flex-column text-white ps-4 pt-2">
      <div className="d-flex gap-4">
        <h1>China</h1>
        <div className="d-flex align-items-center ms-2">
          <i className="fa-solid fa-people-group fa-2xl me-2"></i>
          <p className="m-0">1,425,179,569</p>
        </div>
      </div>
      <div className="d-flex justify-content-evenly">
        <p>12,667,428,430 T</p>
        <p>12,667,428,430 T</p>
        <p>12,667,428,430 T</p>
      </div>
    </div>
  );
};

export default CountryCard;
