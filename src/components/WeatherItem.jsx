import {
  BsThreeDotsVertical,
  BsSunFill,
  BsMoonStarsFill,
  BsWind,
  BsWater,
  BsThermometerHalf,
  BsEye,
  BsTrash3,
} from "react-icons/bs";
import { useState } from "react";

const WeatherItem = ({ data, handleDelete, isDayTime }) => {
  const [toggleDelete, setToggleDelete] = useState(false);

  const today = new Date();

  return (
    <div className="weatherItem">
      <div className="flex justify-end relative cursor-pointer">
        <BsThreeDotsVertical
          className="text-2xl"
          onClick={() => setToggleDelete(!toggleDelete)}
        />

        {toggleDelete && (
          <>
            <div
              className="bg-white rounded-lg absolute top-7 right-4 px-4 py-2 cursor-pointer flex gap-2 items-center text-slate-700 hover:text-red-500 z-20"
              onClick={() => handleDelete(data.location.name)}
            >
              <BsTrash3 className=" text-inherit" />
              <p className="text-inherit font-medium">Delete</p>
            </div>
            <div
              className="bg-transparent h-full w-full fixed top-0 right-0 cursor-default"
              onClick={() => setToggleDelete(!toggleDelete)}
            ></div>
          </>
        )}
      </div>
      <div className="flex gap-6 items-center">
        {isDayTime ? (
          <BsSunFill className="text-yellow-300 text-8xl" />
        ) : (
          <BsMoonStarsFill className="text-yellow-300 text-8xl" />
        )}

        <div>
          <h3 className="text-2xl font-semibold">
            {data.location.name}, {data.location.country}
          </h3>
          <p className="text-lg">
            {today.toLocaleDateString("en-GB", { weekday: "long" })}{" "}
            {today.toLocaleDateString("en-GB")}
          </p>
        </div>
      </div>
      <div className="flex justify-center items-start my-8">
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-[9rem] leading-none font-light">
            {parseInt(data.current.temp_c)}
          </h3>
          <p className="text-lg font-light">{data.current.condition.text}</p>
        </div>
        <p className="font-light text-2xl mt-2">°C</p>
      </div>
      <div className="py-12">
        <table className="m-auto">
          <tbody>
            <tr>
              <td>
                <BsEye />
              </td>
              <td className="p-3 ">Visibility</td>
              <td>{data.current.vis_km} KM</td>
              <td className="px-7">|</td>
              <td>
                <BsThermometerHalf />
              </td>
              <td className="p-3 ">Feels like</td>
              <td>{data.current.feelslike_c}°C</td>
            </tr>
            <tr>
              <td>
                <BsWater />
              </td>
              <td className="p-3">Humidity</td>
              <td>{data.current.humidity}%</td>
              <td className="px-7">|</td>
              <td>
                <BsWind />
              </td>
              <td className="p-3">Wind</td>
              <td>{data.current.wind_kph} Km/h</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeatherItem;
