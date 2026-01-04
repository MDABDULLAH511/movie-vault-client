import React from "react";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Container from "../../Components/Container";
import MovieCard from "../Movies/MovieCard";
import LoadingSpinner from "../../Components/LoadingSpinner";

const RecentlyAddedMovies = () => {
  const axiosInstance = useAxios();

  // Load Recently Added move from DB
  const { data: recentlyMovies = [], isLoading } = useQuery({
    queryKey: ["movies", "recentlyAdded"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/movie?sort=createdAt&order=desc&limit=4`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-base-200 py-10 pt-0 lg:pb-20">
      <Container>
        <div className="mb-6 pb-1.5 border-b-2 border-gray-700 animate-fadeIn">
          <h2 className="font-semibold  text-3xl lg:text-4xl text-white">
            Recently Added <span className="text-primary fJost">Movies</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recentlyMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default RecentlyAddedMovies;
