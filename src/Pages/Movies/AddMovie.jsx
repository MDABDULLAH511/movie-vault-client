import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/UseAuth";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { toast } from "react-toastify";
import addnovieBg from "../../assets/add movieBg.jpg";
import { Link, useNavigate } from "react-router";
import { FaChevronRight } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import Container from "../../Components/Container";
import axios from "axios";
import useAxios from "../../Hooks/useAxios";

const AddMovie = () => {
  const { user, loading, setLoading } = useAuth();
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const posterPhoto = data.poster && data.poster[0];

    //store the image and get the Photo url
    const formData = new FormData();
    formData.append("image", posterPhoto);
    const imageAPI_URL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_host_key
    }`;

    axios.post(imageAPI_URL, formData).then((res) => {
      const posterUrl = res.data.data.url;

      const movieData = {
        ...data,
        rating: parseFloat(data.rating),
        duration: parseInt(data.duration),
        releaseYear: parseInt(data.releaseYear),
        posterUrl: posterUrl,
        addedBy: user?.email,
        createdAt: new Date(),
      };
      
      axiosInstance.post("/movie", movieData).then((res) => {
        if (res.data.insertedId) {
          toast.success("Movie Added Successfully 🎉");
          navigate("/myCollection");
          setLoading(false);
        }
      });
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {/* Page Banner */}
      <div
        className="bg-cover bg-top-center relative flex items-center justify-center py-20 px-5 lg:py-10 lg-px-5 h-[200px] lg:h-[400px] "
        style={{
          backgroundImage: `url(${addnovieBg})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>

        <div className="mb-8 text-center relative z-1">
          <h2 className="font-semibold  text-3xl lg:text-4xl text-white">
            Add New <span className="text-primary fJost">Movies </span>
          </h2>
          <div className="flex items-center justify-center gap-3 text-white font-medium mt-3">
            <Link to={"/"} className="flex items-center gap-2">
              <FaHome /> Home
            </Link>
            <span>
              <FaChevronRight />
            </span>
            <p className="text-primary">Add Movie</p>
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
                {errors.genre && (
                  <p className="text-red-500 text-sm">Genre is required</p>
                )}
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
                  {errors.releaseYear && (
                    <p className="text-red-500 text-sm">
                      Release Year is required
                    </p>
                  )}
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
                  {errors.rating && (
                    <p className="text-red-500 text-sm">Rating is required</p>
                  )}
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
                {errors.director && (
                  <p className="text-red-500 text-sm">Director is required</p>
                )}
              </div>

              {/* Cast */}
              <div>
                <label className="label">Cast</label>
                <input
                  type="text"
                  className="movieInput"
                  {...register("cast", { required: true })}
                />
                {errors.cast && (
                  <p className="text-red-500 text-sm">Cast is required</p>
                )}
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
                {errors.duration && (
                  <p className="text-red-500 text-sm">Duration is required</p>
                )}
              </div>

              {/* Language & Country */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Language"
                    className="movieInput"
                    {...register("language", { required: true })}
                  />
                  {errors.language && (
                    <p className="text-red-500 text-sm">Language is required</p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Country"
                    className="movieInput"
                    {...register("country", { required: true })}
                  />
                  {errors.country && (
                    <p className="text-red-500 text-sm">Country is required</p>
                  )}
                </div>
              </div>

              {/* Poster URL */}
              <div>
                <label className="label">Poster URL</label>
                <input
                  type="file"
                  className=" border-none file-input w-full  bg-black/10 border border-primary/50 file:bg-primary  file:text-white"
                  {...register("poster", { required: true })}
                />
                {errors.poster && (
                  <p className="text-red-500 text-sm">
                    Poster Image is required
                  </p>
                )}
              </div>

              {/* Plot Summary */}
              <div>
                <label className="label">Plot Summary</label>
                <textarea
                  rows="4"
                  className="textarea textarea-bordered w-full bg-[#161616]"
                  {...register("plotSummary", { required: true })}
                ></textarea>
                {errors.plotSummary && (
                  <p className="text-red-500 text-sm">
                    Plot Summary is required
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn w-full bg-red-600 hover:bg-red-700 text-white mt-6"
              >
                Add Movie
              </button>
            </form>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AddMovie;
