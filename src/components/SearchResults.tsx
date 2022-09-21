interface SearchResultsProps {
  results: {
    current: any;
    location: any;
  }
}

import wind from "./../../public/wind.png";
import drop from "./../../public/drop.png";

export function SearchResults({ results }: SearchResultsProps) {
  return (
    <>
      <img
        className="w-10 my-4"
        src={results.current.condition.icon}
        alt="icone do tempo atual"
      />

      <h1 className="text-base font-bold text-[#717A92]">
        {results.location.name} -  {results.location.country}
      </h1>

      <h1 className="text-[#648BF2] font-bold text-6xl my-6">
        {results.current.temp_c}
      </h1>

      <div className="flex gap-8">
        <div className="flex flex-col text-center items-center gap-3">
          <img className="w-[24px]" src={wind} alt="icone ventp" />
          <p className="text-[#9AA2B6]">Vento</p>
          <h1 className="text-[#717A92] text-lg font-bold"> {results.current.wind_kph} km/h</h1>
        </div>

        <div className="flex flex-col text-center items-center gap-3">
          <img className="w-[24px]" src={drop} alt="icone umidade" />
          <p className="text-[#9AA2B6]">Umidade</p>
          <h1 className="text-[#717A92] text-lg font-bold"> {results.current.humidity}%</h1>
        </div>
      </div>
    </>
  )
}