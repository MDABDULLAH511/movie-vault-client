import React from "react";
import MovieCard from "../Movies/MovieCard";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Container from "../../Components/Container";
import LoadingSpinner from "../../Components/LoadingSpinner";

const TopRatedMovies = () => {
  const axiosInstance = useAxios();

  // Load Top Rated move from DB
  const { data: movies = [], isLoading } = useQuery({
    queryKey: ["movies", "topRated"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/movie?sort=rating&order=desc&limit=4`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-base-200 py-10 lg:py-20">
      <Container>
        <div className="mb-6 pb-1.5 border-b-2 border-gray-700 animate-fadeIn">
          <h2 className="font-semibold  text-3xl lg:text-4xl text-white">
            Top Rated <span className="text-primary fJost">Movies</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default TopRatedMovies;
