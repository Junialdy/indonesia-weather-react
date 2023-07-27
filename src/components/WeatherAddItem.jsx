import { BsPlusLg } from "react-icons/bs";

const WeatherAddItem = ({ handleToggle }) => {
  return (
    <div className="weatherItem flex flex-col gap-7 justify-center items-center">
      <button
        className="bg-white/25 rounded-full h-32 w-32 flex justify-center items-center"
        onClick={handleToggle}
      >
        <BsPlusLg className="text-7xl text-center" />
      </button>
      <h3 className="font-semibold text-2xl">Add new location</h3>
    </div>
  );
};

export default WeatherAddItem;
