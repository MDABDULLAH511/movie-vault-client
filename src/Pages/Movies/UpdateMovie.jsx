import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/UseAuth";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { toast } from "react-toastify";
import updatePageBg from "../../assets/panda.webp";
import { Link, useNavigate, useParams } from "react-router";
import { FaChevronRight } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import Container from "../../Components/Container";
import axios from "axios";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const UpdateMovie = () => {
  const { user, loading, setLoading } = useAuth();
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: movie = {}, isLoading } = useQuery({
    queryKey: ["movie", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/movie/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (movie?._id) {
      reset({
        title: movie.title,
        director: movie.director,
        cast: movie.cast,
        genre: movie.genre,
        language: movie.language,
        country: movie.country,
        plotSummary: movie.plotSummary,
        releaseYear: movie.releaseYear,
        duration: movie.duration,
        rating: movie.rating,
        posterUrl: movie.posterUrl,
      });
    }
  }, [movie, reset]);

  if (loading || isLoading) {
    return <LoadingSpinner />;
  }

  const onSubmit = async (data) => {
    setLoading(true);
    let posterUrl = movie.posterUrl;

    if (data.poster && data.poster.length > 0) {
      const formData = new FormData();
      formData.append("image", data.poster[0]);

      const imageAPI_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host_key
      }`;

      const imgRes = await axios.post(imageAPI_URL, formData);
      posterUrl = imgRes.data.data.url;
    }

    const updatedMovie = {
      title: data.title,
      director: data.director,
      cast: data.cast,
      genre: data.genre,
      language: data.language,
      country: data.country,
      plotSummary: data.plotSummary,
      releaseYear: parseInt(data.releaseYear),
      duration: parseInt(data.duration),
      rating: parseFloat(data.rating),
      posterUrl,
    };

    const res = await axiosInstance.patch(`/movie/${id}`, updatedMovie);

    if (res.data.modifiedCount) {
      toast.success("Movie Updated Successfully 🎉");
      navigate(`/movie/${movie?._id}`);
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Page Banner */}
      <div
        className="bg-cover bg-top-center relative flex items-center justify-center py-20 px-5 lg:py-10 lg-px-5 h-[200px] lg:h-[400px] "
        style={{
          backgroundImage: `url(${updatePageBg})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>

        <div className="mb-8 text-center relative z-1">
          <h2 className="font-semibold  text-3xl lg:text-4xl text-white">
            Update <span className="text-primary fJost">Movie </span>
          </h2>
          <div className="flex items-center justify-center gap-3 text-white font-medium mt-3">
            <Link to={"/"} className="flex items-center gap-2">
              <FaHome /> Home
            </Link>
            <span>
              <FaChevronRight />
            </span>
            <p className="text-primary">Update Movie</p>
          </div>
        </div>
      </div>

      <div className="bg-base-200 py-10 lg:py-20 text-white">
        <Container>
          <div className="w-full max-w-3xl mx-auto bg-[#1c1c1c] rounded-lg p-5 lg:p-10 shadow-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Title */}
              <div>
                <label className="label">Movie Title</label>
                <input
                  type="text"
                  className="movieInput"
                  {...register("title", { required: true })}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">Title is required</p>
                )}
              </div>

              {/* Genre */}
              <div>
                <label className="label">Genre</label>
                <input
                  type="text"
                  className="movieInput"
                  {...register("genre", { required: true })}
                />
              </div>

              {/* Release Year & Rating */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Release Year</label>
                  <input
                    type="number"
                    placeholder="Number only"
                    className="movieInput"
                    {...register("releaseYear", { required: true })}
                  />
                </div>

                <div>
                  <label className="label">Rating (0–10)</label>
                  <input
                    type="number"
                    placeholder="Number only"
                    step="0.1"
                    className="movieInput"
                    {...register("rating", { required: true })}
                  />
                </div>
              </div>

              {/* Director */}
              <div>
                <label className="label">Director</label>
                <input
                  type="text"
                  className="movieInput"
                  {...register("director", { required: true })}
                />
              </div>

              {/* Cast */}
              <div>
                <label className="label">Cast</label>
                <input
                  type="text"
                  className="movieInput"
                  {...register("cast", { required: true })}
                />
              </div>

              {/* Duration */}
              <div>
                <label className="label">Duration (minutes)</label>
                <input
                  type="number"
                  placeholder="Number only"
                  className="movieInput"
                  {...register("duration", { required: true })}
                />
              </div>

              {/* Language & Country */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Language"
                  className="movieInput"
                  {...register("language", { required: true })}
                />
                <input
                  type="text"
                  placeholder="Country"
                  className="movieInput"
                  {...register("country", { required: true })}
                />
              </div>

              {/* Poster URL */}
              <div>
                <label className="label">Poster URL</label>
                <input
                  type="file"
                  className=" border-none file-input w-full  bg-black/10 border border-primary/50 file:bg-primary  file:text-white"
                  {...register("poster")}
                />
              </div>

              {/* Plot Summary */}
              <div>
                <label className="label">Plot Summary</label>
                <textarea
                  rows="4"
                  className="textarea textarea-bordered w-full bg-[#161616]"
                  {...register("plotSummary", { required: true })}
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn w-full bg-red-600 hover:bg-red-700 text-white mt-6"
              >
                Update Movie
              </button>
            </form>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default UpdateMovie;
