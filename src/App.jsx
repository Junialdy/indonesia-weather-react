import { useState, useEffect } from "react";
import WeatherItem from "./components/WeatherItem";
import WeatherAddItem from "./components/WeatherAddItem";
import WeatherAddModal from "./components/WeatherAddModal";
import axios from "axios";

const App = () => {
  const [weathers, setWeathers] = useState([]);
  const [cities, setCities] = useState([]);
  const [toggleModal, setToggleModal] = useState(false);

  const today = new Date();
  const isDayTime = today.getHours() >= 6 && today.getHours() < 18;

  const controller = new AbortController();

  const getCity = () => {
    // if (weathers != 0 && cities != 0) {
    //   return;
    // }
    const config = {
      headers: {
        "X-Parse-Application-Id": import.meta.env.VITE_APPLICATION_ID,
        "X-Parse-REST-API-Key": import.meta.env.VITE_REST_API_KEY,
      },
    };

    axios
      .get(
        "https://parseapi.back4app.com/classes/Indonesiacities_Indonesia_Cities_Database?limit=10&order=-population",
        config
      )
      .then((res) => setCities(res.data.results))
      .catch((err) => console.error(err));
  };

  const getWeather = (cityAdd) => {
    const findCity = cities.find((city) => {
      return city.name === cityAdd;
    });

    if (!findCity) {
      return;
    }

    setCities((currentCities) => {
      return currentCities.filter((city) => city.name != findCity.name);
    });

    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=${
          import.meta.env.VITE_API_KEY
        }&q=${cityAdd}&aqi=no`,
        { signal: controller.signal }
      )
      .then((res) =>
        setWeathers((current) => {
          return [...current, res.data];
        })
      )
      .catch((err) => console.log(err.message));
  };

  const handleToggle = () => {
    setToggleModal(!toggleModal);
  };
  const handleDelete = (cityRemove) => {
    const itemCity = weathers.find((city) => {
      return city.location.name === cityRemove;
    });

    setCities((currentCities) => [
      {
        name: itemCity?.location?.name,
        geonameid: itemCity?.location?.localtime_epoch,
      },
      ...currentCities,
    ]);

    setWeathers((current) => {
      return current.filter(
        (city) => city.location.name !== itemCity.location.name
      );
    });
  };

  useEffect(() => {
    getCity();
  }, []);
  // from-cyan-500 to-blue-500 DayTime
  // from-indigo-950 to-blue-500 NightTime
  return (
    <div
      className={`bg-gradient-to-br ${
        isDayTime ? "from-cyan-500 to-blue-500" : "from-indigo-950 to-blue-500"
      }  min-h-screen py-10 md:py-20`}
    >
      {toggleModal && (
        <WeatherAddModal
          handleToggle={handleToggle}
          cities={cities}
          getWeather={getWeather}
        />
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-items-center items-center gap-10">
        {weathers.map((weather) => (
          <WeatherItem
            data={weather}
            key={weather.location.name}
            handleDelete={handleDelete}
          />
        ))}
        <div className={weathers.length == 0 ? "xl:col-start-2" : ""}>
          <WeatherAddItem handleToggle={handleToggle} isDayTime={isDayTime} />
        </div>
      </div>
      <h1 className="text-white font-poppins text-center mt-8 font-light ">
        Design by{" "}
        <a
          href="https://www.figma.com/community/file/1104550438912155366"
          className="font-medium"
          target="_blank "
        >
          Victor Alvarado👍
        </a>
      </h1>
    </div>
  );
};

export default App;
