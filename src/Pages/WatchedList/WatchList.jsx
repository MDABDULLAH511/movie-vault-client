import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";
import LoadingSpinner from "../../Components/LoadingSpinner";
import allMovieBG from "../../assets/add movieBg.jpg";
import { Link } from "react-router";
import { FaChevronRight } from "react-icons/fa6";
import Container from "../../Components/Container";
import { FaHome } from "react-icons/fa";
import WatchListMovieCard from "./WatchListMovieCard";

const WatchList = () => {
  const { user, loading } = useAuth();
  const axiosInstance = useAxios();

  // Load watched data
  const {
    refetch,
    data: watched = [],
    isLoading,
  } = useQuery({
    queryKey: ["watched", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/watched?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading || loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {/* Page Banner */}
      <div
        className="bg-cover bg-center relative flex items-center justify-center py-20 px-5 lg:py-10 lg-px-5 h-[200px] lg:h-[400px] "
        style={{
          backgroundImage: `url(${allMovieBG})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
        <div className="mb-8 text-center relative z-1">
          <h2 className="font-semibold  text-3xl lg:text-4xl text-white">
            My <span className="text-primary fJost">Watchlist</span>
          </h2>
          <div className="flex items-center justify-center gap-3 text-white font-medium mt-3">
            <Link to={"/"} className="flex items-center gap-2">
              <FaHome /> Home
            </Link>
            <span>
              <FaChevronRight />
            </span>
            <p className="text-primary">Watchlist</p>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="bg-base-200 py-10 lg:py-20">
        <Container>
          {watched.length === 0 ? (
            <div className="text-center text-gray-400 py-16">
              <h3 className="text-xl font-semibold mb-2">
                Your watchlist is empty 😔
              </h3>
              <p>Add some movies to start building your collection!</p>
              <Link
                to={`/allMovies`}
                className="mt-5 inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded text-white font-semibold"
              >
                View All Movies
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {watched.map((item) => (
                <WatchListMovieCard
                  key={item._id}
                  item={item}
                  refetch={refetch}
                />
              ))}
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default WatchList;
