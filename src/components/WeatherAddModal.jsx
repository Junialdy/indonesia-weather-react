import { useState } from "react";
import { BsXCircle } from "react-icons/bs";

const WeatherAddModal = ({ handleToggle, cities, getWeather }) => {
  const [addCity, setAddCity] = useState();
  const [err, setErr] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!addCity) {
      setErr("Please select the City!");
      return;
    }
    getWeather(addCity);
    handleToggle();
    setErr("");
  };

  return (
    <>
      <div
        className="bg-slate-950/50 w-full h-screen z-20 flex justify-center items-center fixed top-0"
        onClick={handleToggle}
      ></div>
      <div className="bg-white w-3/4 sm:w-2/5 h-1/4 p-4 rounded-3xl mb-20 fixed top-1/3 left-[30%] z-30">
        <div className="flex justify-end items-end">
          <BsXCircle
            className="font-extrabold text-3xl cursor-pointer"
            onClick={handleToggle}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <select
            name="city"
            className="form-input cursor-pointer"
            defaultValue={" "}
            onChange={(e) => setAddCity(e.target.value)}
          >
            <option value=" " disabled hidden>
              Select a city
            </option>
            {cities.map((city) => (
              <option value={city.name} key={city.geonameid}>
                {city.name}
              </option>
            ))}
          </select>
          {err && <p className="px-2 text-sm text-red-500">{err}</p>}
          <button
            className={`form-button ${err ? "mt-2" : "mt-4"}`}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default WeatherAddModal;
