import axios from "axios";
import { FiSearch, FiTrash } from "react-icons/fi";
import { FormEvent, useState } from "react";

import wind from './../public/wind.png';
import drop from './../public/drop.png';

interface IResults {
  current: any;
  location: any;
}

function App() {
  const [search, setSearch] = useState('');
  // @ts-ignore
  const [results, setResults] = useState<IResults>({});
  const [loading, setLoading] = useState(false);
  const [haveResults, setHaveResults] = useState(false);

  async function handleSearch(event: FormEvent) {
    event.preventDefault();
    const key = "14661951c2024908ada212913222009";

    if (!search.trim()) {
      return;
    }

    setLoading(true);
    const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${search}&aqi=no`);
    setResults(response.data);
    console.log(response.data)
    setHaveResults(true);
    setLoading(false);
    setSearch('')
  }

  return (
    <div className="h-screen w-full flex items-center justify-center flex-col">
      <h2 className="py-5 text-2xl text-slate-400">Clima<b className="text-[#648BF2]">Tempo</b></h2>
      <form className="relative" onSubmit={handleSearch}>

        {loading === false ?
          <>
            <input
              type="text"
              value={search}
              className='bg-[#E4E9F566] w-80 h-10 rounded-lg px-3'
              onChange={e => setSearch(e.target.value)}
            />

            <button className="absolute right-4 top-3" type="submit">
              <FiSearch />
            </button>
          </>
          : <>
            <input
              disabled
              type="text"
              value={search}
              className='bg-[#e4e9f5af] w-80 h-10 rounded-lg px-3 cursor-not-allowed'
              onChange={e => setSearch(e.target.value)}
            />
          </>
        }

      </form>

      {haveResults && (
        <>
          <img className='w-10 my-4' src={results.current.condition.icon} alt="" />
          <h1 className='text-base font-bold text-[#717A92]'> {results.location.name}</h1>
          <h1 className='text-[#648BF2] font-bold text-6xl my-4'>{results.current.temp_c}</h1>

          <h1> {results.location.country}</h1>

          <h1> {results.location.localtime}</h1>

          <div className='flex gap-8'>
            <div className='flex flex-col text-center items-center'>
              <img className='w-[24px] my-4' src={wind} alt="" />
              <p>Vento</p>
              <h1> {results.current.wind_kph} km/h</h1>
            </div>

            <div className='flex flex-col text-center items-center'>
              <img className='w-[24px] my-4' src={drop} alt="" />
              <p>Umidade</p>
              <h1> {results.current.humidity}%</h1>
            </div>
          </div>


        </>
      )}


    </div>
  )
}

export default App
