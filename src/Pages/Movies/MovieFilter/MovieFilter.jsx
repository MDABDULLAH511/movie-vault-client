import { useState } from "react";
import useAxios from "../../../Hooks/useAxios";
import { FiRefreshCw } from "react-icons/fi";

const MovieFilter = ({ setMovies, movies }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [minRating, setMinRating] = useState("");
  const [maxRating, setMaxRating] = useState("");
  const axiosInstance = useAxios();

  const genres = [
    "Action",
    "Romance",
    "Drama",
    "Sci-Fi",
    "Horror",
    "Thriller",
    "Crime",
    "Adventure",
    "Fantasy",
    "Mystery",
  ];

  const handleGenreChange = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleFilter = async () => {
    const query = new URLSearchParams({
      genres: selectedGenres.join(","),
      minRating,
      maxRating,
    });

    const res = await axiosInstance.get(`/movie?${query}`);
    setMovies(res.data);
  };
  const handleReset = async () => {
    setSelectedGenres([]);
    setMinRating("");
    setMaxRating("");

    // Load All move from DB
    const res = await axiosInstance.get(`/movie`);
    setMovies(res.data);
  };

  return (
    <div className="bg-[#1f1f1f] p-4 rounded-lg mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* LEFT */}
        <h3 className="text-white text-lg font-semibold">
          All Movies <span className="text-gray-400">({movies.length})</span>
        </h3>

        {/* RIGHT */}
        <div className="flex flex-wrap sm:flex-row items-end gap-3 w-full md:w-auto">
          {/* Genre Dropdown */}
          <div className="dropdown">
            <label tabIndex={0} className="btn border border-white text-white">
              Genre
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-[#1f1f1f] rounded-box w-40 z-10 text-white"
            >
              {genres.map((genre) => (
                <li key={genre}>
                  <label className="flex gap-2 cursor-pointer ">
                    <input
                      type="checkbox"
                      checked={selectedGenres.includes(genre)}
                      onChange={() => handleGenreChange(genre)}
                    />
                    {genre}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Min Rating */}
          <input
            type="number"
            placeholder="Min Rating"
            className="input input-bordered w-24"
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
          />

          {/* Max Rating */}
          <input
            type="number"
            placeholder="Max Rating"
            className="input input-bordered w-24"
            value={maxRating}
            onChange={(e) => setMaxRating(e.target.value)}
          />

          {/* Filter Button */}
          <button onClick={handleFilter} className="btn btn-primary">
            Filter
          </button>

          {/* Refresh Button */}
          <button
            onClick={handleReset}
            className="btn border border-white text-white"
            title="Reset Filters"
          >
            <FiRefreshCw className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieFilter;
