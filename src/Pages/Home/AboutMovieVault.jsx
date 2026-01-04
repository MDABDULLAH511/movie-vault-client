import React from "react";
import Container from "../../Components/Container";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import { FaUserGroup } from "react-icons/fa6";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { MdLocalMovies } from "react-icons/md";
import { Link } from "react-router";

const AboutMovieVault = () => {
  const axiosInstance = useAxios();

  // Load All move from DB
  const { data: movies = [], isLoading } = useQuery({
    queryKey: ["movie"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/movie`);
      return res.data;
    },
  });

  // Load All Users from DB
  const { data: users = [], isLoading: userLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/user`);
      return res.data;
    },
  });

  return (
    <div className="py-10 lg:py-20 bg-[#1c1c1c]">
      <Container>
        {/* About Platform */}

        <div className="mb-8 text-center w-full xl:max-w-9/12 text-white mx-auto animate-fadeIn">
          <h2 className="font-semibold  text-3xl lg:text-4xl mb-3">
            About Movie <span className="text-primary fJost"> Vault</span>
          </h2>
          <p>
            Movie Vault is a modern movie discovery and management platform
            built for film lovers. It allows users to explore, organize, and
            manage their favorite movies in one secure and easy-to-use place.
            With Movie Vault, users can add movies, view detailed information,
            and keep track of their personal collection. The platform focuses on
            simplicity, speed, and a clean viewing experience, making it easy to
            browse movies by genre, year, or rating. Key features include a
            user-friendly interface, detailed movie pages, secure
            authentication, and personalized access where users can manage only
            the content they add. Movie Vault is designed to deliver a smooth
            and enjoyable experience for anyone who loves movies.
          </p>
          <div className="mt-10 mb-10">
            <Link
              to={`/aboutUs`}
              className=" bg-red-600 hover:bg-red-700 px-6 py-3 rounded text-white font-semibold"
            >
              Read More
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 gap-4 my-6 w-8/12 md:w-1/2 lg:max-w-4/12 mx-auto text-white">
          {/* All Movie */}
          {userLoading && <LoadingSpinner />}
          <div className="stat border-none bg-base-200 shadow rounded-xl p-5">
            <div className="stat-figure text-primary">
              <FaUserGroup size={35} />
            </div>
            <div className="stat-title text-white font-semibold">
              Total Users
            </div>
            <div className="stat-value fJost my-2">{users.length}</div>
          </div>

          {/* Total movie */}
          {isLoading && <LoadingSpinner />}
          <div className="stat bg-base-200 shadow rounded-xl p-4">
            <div className="stat-figure text-primary">
              <MdLocalMovies size={35} />
            </div>
            <div className="stat-title text-white font-semibold">
              Total Movies
            </div>
            <div className="stat-value fJost my-2">{movies.length}</div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutMovieVault;
