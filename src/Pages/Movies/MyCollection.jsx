import React from "react";
import {
  FaEdit,
  FaTrash,
  FaStar,
  FaHome,
  FaChevronRight,
} from "react-icons/fa";
import { Link } from "react-router";
import useAuth from "../../Hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import { toast } from "react-toastify";
import LoadingSpinner from "../../Components/LoadingSpinner";
import Swal from "sweetalert2";
import myCollectionBG from "../../assets/rabbit.webp";

const MyCollection = () => {
  const { user, loading } = useAuth();
  const axiosInstance = useAxios();
  const email = user?.email;

  const {
    refetch,
    data: myMovies = [],
    isLoading,
  } = useQuery({
    queryKey: ["movie", email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/movie-user?email=${email}`);
      return res.data;
    },
  });

  if (loading || isLoading) {
    return <LoadingSpinner />;
  }

  //handle delete movie
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance.delete(`/movie/${id}`).then((res) => {
          refetch();
          toast("Movie deleted from your collection!");
        });
      }
    });
  };

  return (
    <div>
      <div
        className="bg-cover bg-top-center relative flex items-center justify-center py-20 px-5 lg:py-10 lg-px-5 h-[200px] lg:h-[400px] "
        style={{
          backgroundImage: `url(${myCollectionBG})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
        <div className="mb-8 text-center relative z-1">
          <h2 className="font-semibold  text-3xl lg:text-4xl text-white">
            My <span className="text-primary fJost">Movies </span>Collection
          </h2>
          <div className="flex items-center justify-center gap-3 text-white font-medium mt-3">
            <Link to={"/"} className="flex items-center gap-2">
              <FaHome /> Home
            </Link>
            <span>
              <FaChevronRight />
            </span>
            <p className="text-primary">My Collection</p>
          </div>
        </div>
      </div>
      <div className="min-h-screen bg-[#161616] text-white px-6 py-10">
        <div className="max-w-6xl mx-auto">
          {/* Empty State */}
          {myMovies.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg">You haven’t added any movies yet 🎬</p>
              <Link
                to="/movies/add"
                className="btn mt-4 bg-red-600 hover:bg-red-700 text-white"
              >
                Add Your First Movie
              </Link>
            </div>
          )}

          {/* Movie Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {myMovies.map((movie) => (
              <div
                key={movie._id}
                className="bg-[#1c1c1c] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
              >
                {/* Poster */}
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="h-64 w-full object-cover"
                />

                {/* Card Content */}
                <div className="p-4 space-y-2">
                  <h2 className="text-xl font-semibold truncate">
                    {movie.title}
                  </h2>

                  <p className="text-sm text-gray-400">
                    {movie.genre} • {movie.releaseYear}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 text-sm">
                    <FaStar className="text-yellow-400" />
                    <span>{movie.rating}/10</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center pt-4">
                    <Link
                      to={`/movies/update/${movie._id}`}
                      className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1"
                    >
                      <FaEdit /> Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(movie._id)}
                      className="btn btn-sm bg-red-600 hover:bg-red-700 text-white flex items-center gap-1"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCollection;
