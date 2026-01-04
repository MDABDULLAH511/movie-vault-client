import React from "react";
import aboutUsBG from "../../assets/25.jpg";
import { Link } from "react-router";
import { FaHome } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import Container from "../../Components/Container";
import { FaFilm, FaLock, FaHeart, FaFilter, FaMobileAlt } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div>
      {/* Page Banner */}
      <div
        className="bg-cover bg-top-center relative flex items-center justify-center py-20 px-5 lg:py-10 lg-px-5 h-[200px] lg:h-[400px] "
        style={{
          backgroundImage: `url(${aboutUsBG})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
        <div className="mb-8 text-center relative z-1">
          <h2 className="font-semibold  text-3xl lg:text-4xl text-white">
            About <span className="text-primary fJost">Movie Vault</span>
          </h2>
          <div className="flex items-center justify-center gap-3 text-white font-medium mt-3">
            <Link to={"/"} className="flex items-center gap-2">
              <FaHome /> Home
            </Link>
            <span>
              <FaChevronRight />
            </span>
            <p className="text-primary">About Us</p>
          </div>
        </div>
      </div>

      {/* Content */}

      <div className="bg-base-200 py-10 lg:py-20">
        <Container>
          <div className=" space-y-5 text-gray-300 ">
            <p>
              <span className="font-semibold text-white">Movie Vault</span> is a
              modern web application built for movie enthusiasts who want a
              simple and secure way to manage their personal movie collections.
              The platform allows users to browse, organize, and save their
              favorite movies in one centralized digital space.
            </p>

            <p>
              Designed with user experience in mind, Movie Vault offers a clean,
              responsive interface with powerful features such as personalized
              watchlists, advanced filtering, and real-time feedback. Users can
              easily discover top-rated and newly added movies while enjoying a
              smooth and engaging browsing experience.
            </p>

            <p>
              The application is built using modern frontend technologies
              including
              <span className="text-white font-medium">
                React, Firebase, and MongoDB
              </span>
              , demonstrating real-world implementation of authentication, CRUD
              operations, routing, and responsive UI design.
            </p>

            <p>
              Movie Vault started as an academic assignment and was later
              refined into a portfolio-ready project to showcase practical
              skills in modern web development, clean code structure, and
              scalable application design.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10">
            <div className="p-6 bg-[#1f1f1f] rounded-xl">
              <FaFilm className="text-primary text-3xl mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Smart Movie Discovery
              </h3>
              <p className="text-gray-400">
                Explore top-rated and recently added movies with rich details
                and smooth navigation.
              </p>
            </div>

            <div className="p-6 bg-[#1f1f1f] rounded-xl">
              <FaHeart className="text-primary text-3xl mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Personal Watchlist
              </h3>
              <p className="text-gray-400">
                Save your favorite movies and manage your watchlist with ease,
                tailored just for you.
              </p>
            </div>

            <div className="p-6 bg-[#1f1f1f] rounded-xl">
              <FaFilter className="text-primary text-3xl mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Advanced Filtering
              </h3>
              <p className="text-gray-400">
                Find exactly what you’re looking for using genre-based and
                rating filters.
              </p>
            </div>

            <div className="p-6 bg-[#1f1f1f] rounded-xl">
              <FaLock className="text-primary text-3xl mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Secure Authentication
              </h3>
              <p className="text-gray-400">
                Login safely with email or Google using Firebase authentication.
              </p>
            </div>

            <div className="p-6 bg-[#1f1f1f] rounded-xl">
              <FaMobileAlt className="text-primary text-3xl mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Fully Responsive
              </h3>
              <p className="text-gray-400">
                Enjoy a seamless experience on mobile, tablet, and desktop
                devices.
              </p>
            </div>

            <div className="p-6 bg-[#1f1f1f] rounded-xl">
              <FaFilm className="text-primary text-3xl mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Built with Modern Tech
              </h3>
              <p className="text-gray-400">
                Developed using React, Firebase, MongoDB, and modern UI
                libraries to ensure performance and scalability.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AboutUs;
