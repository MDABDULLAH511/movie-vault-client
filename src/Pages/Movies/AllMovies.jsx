import React from "react";
import allMovieBG from "../../assets/rabbit.webp";
import { FaChevronRight, FaHome } from "react-icons/fa";
import { Link } from "react-router";
import Container from "../../Components/Container";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import LoadingSpinner from "../../Components/LoadingSpinner";
import MovieCard from "./MovieCard";

const AllMovies = () => {
  const axiosInstance = useAxios();

  // Load All move from DB
  const { data: movies = [], isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/movie`);
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {/* Page Banner */}
      <div
        className="bg-cover bg-center relative flex items-center justify-center py-20 px-5 lg:py-10 lg-px-5 h-[200px] lg:h-[300px] "
        style={{
          backgroundImage: `url(${allMovieBG})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
        <div className="mb-8 text-center relative z-1">
          <h2 className="font-semibold  text-3xl lg:text-4xl text-white">
            All <span className="text-primary fJost">Movies</span>
          </h2>
          <div className="flex items-center justify-center gap-3 text-white font-medium mt-3">
            <Link to={"/"} className="flex items-center gap-2">
              <FaHome /> Home
            </Link>
            <span>
              <FaChevronRight />
            </span>
            <p className="text-primary">Movies</p>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="bg-base-200 py-10 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AllMovies;
