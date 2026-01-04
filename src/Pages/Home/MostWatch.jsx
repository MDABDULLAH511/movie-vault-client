import React from "react";

import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Components/LoadingSpinner";
import Container from "../../Components/Container";
import { Link } from "react-router";
import { FaPlay } from "react-icons/fa6";

const MostWatch = () => {
  const axiosInstance = useAxios();
  // const [movie, setMovie] = useState();

  // Load Top Rated move from DB
  const { data: movie = [], isLoading } = useQuery({
    queryKey: ["mostWatched"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/most-watched`);
      // setMovie(res.data.data);
      return res.data[0];
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div
      className="h-[70vh] bg-cover bg-center relative"
      style={{ backgroundImage: `url(${movie.posterUrl})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 h-full w-full flex items-center max-w-7xl mx-auto">
        <Container>
          {/* Left */}
          <div className="space-y-6 animate-fadeIn text-center max-w-3xl mx-auto">
            <span className="text-red-500 uppercase tracking-widest mb-2">
              most watched
            </span>

            <h1 className="text-3xl md:text-5xl fJost font-bold text-white">
              {movie.title}
            </h1>

            <p className="text-gray-200 ">{movie.plotSummary}</p>

            <Link
              to={`/movie/${movie._id}`}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded text-white font-semibold"
            >
              <FaPlay /> View Details
            </Link>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default MostWatch;
