import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router";
import useAuth from "../../Hooks/useAuth";
import LoadingSpinner from "../../Components/LoadingSpinner";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import WatchedButton from "./WatchedButton";

const MovieDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const {
    refetch,
    isError,
    data: movie = [],
    isLoading,
  } = useQuery({
    queryKey: ["movie", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/movie/${id}`);
      return res.data;
    },
  });

  if (isError || !movie?._id) {
    navigate("/error");
  }

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
          navigate("/myCollection");
          toast("Movie deleted from your collection!");
        });
      }
    });
  };

  const isOwner = movie.addedBy === user?.email;

  return (
    <div className=" bg-[#161616] py-10 lg:py-20 px-5 lg:px-0 text-white flex justify-center">
      <div className="max-w-4xl w-full bg-[#1f1f1f] rounded-xl shadow-lg overflow-hidden flex flex-col ">
        {/* Poster */}
        <div className="h-[200px] md:h-[400px]">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="p-5 md:p-10 flex flex-col text-gray-300">
          <div className="flex flex-col-reverse md:flex-row justify-between md:items-center gap-5 ">
            <h2 className="text-3xl font-bold text-white">{movie.title}</h2>
            <WatchedButton movie={movie} />
          </div>
          <p className="mt-2">
            <strong>Genre:</strong> {movie.genre}
          </p>
          <p className="mt-2">
            <strong>Release Year:</strong> {movie.releaseYear}
          </p>
          <p className="mt-2">
            <strong>Language:</strong> {movie.language}
          </p>
          <p className="mt-2">
            <strong>Country:</strong> {movie.country}
          </p>
          <p className="mt-2">
            <strong>Rating:</strong> {movie.rating}/10
          </p>
          <p className="mt-2">
            <strong>Duration:</strong> {movie.duration}
            min
          </p>
          <p className="mt-2">
            <strong>Director:</strong> {movie.director}
          </p>
          <p className="mt-2">
            <strong>Cast:</strong> {movie.cast}
          </p>

          <p className="mt-4 text-gray-200">
            <strong>Plot Summary:</strong> {movie.plotSummary}
          </p>

          {/* Owner Actions */}
          {isOwner && (
            <div className="flex gap-3 pt-6">
              <Link
                to={`/updateMovie/${movie._id}`}
                className="btn bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
              >
                <FaEdit /> Edit
              </Link>

              <button
                onClick={() => handleDelete(movie._id)}
                className="btn bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
              >
                <FaTrash /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
