import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router";

const MovieCard = ({ movie }) => {
  const { _id, title, genre, releaseYear, rating, posterUrl } = movie;

  return (
    <div className="bg-[#1f1f1f] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 flex flex-col">
      {/* Poster */}
      <div className="h-[250px] overflow-hidden">
        <img
          src={posterUrl}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col grow">
        <h3 className="text-lg font-semibold text-white truncate">{title}</h3>

        <p className="text-sm text-gray-400 mt-1">
          {genre} • {releaseYear}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <FaStar className="text-yellow-400" />
          <span className="text-white font-medium">{rating}</span>
          <span className="text-gray-400 text-sm">/10</span>
        </div>

        {/* Button */}
        <div className="mt-auto pt-4">
          <Link to={`/movie/${_id}`}>
            <button className="btn btn-sm w-full bg-primary text-white border-none hover:bg-red-800">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
