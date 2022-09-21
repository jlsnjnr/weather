import { FormEvent, useState } from "react";
import axios from "axios";

import { FiSearch } from "react-icons/fi";
import { Title } from "./components/Title";
import { SearchResults } from "./components/SearchResults";

function App() {
  const [search, setSearch] = useState("");
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

    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${key}&q=${search}&aqi=no`
    );

    setResults(response.data);
    setHaveResults(true);
    setLoading(false);
    setSearch("");
  }

  return (
    <div className="center-content">
      <Title />

      <form className="relative" onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          placeholder="busque por uma cidade..."
          className={loading === false ? 'input-true' : 'input-false'}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className={loading === false ? 'absolute right-4 top-3' : 'hidden'}
          type="submit"
        >
          <FiSearch />
        </button>
      </form>

      {haveResults && (
        <SearchResults results={results} />
      )}
    </div >
  );
}

export default App;
