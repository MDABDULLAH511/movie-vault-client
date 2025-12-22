import React from "react";
import logo from "/movieVault logo.png";
import googlePlay from "../assets/googlePlay.png";
import appStore from "../assets/appStore.png";
import { Link } from "react-router";
import Container from "./Container";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="pt-20 bg-base-200 text-white border-t border-gray-700">
      <Container>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
          {/* footer logo */}
          <div className="space-y-5 mr-10">
            <Link to="/" className="flex justify-start items-center gap-3">
              <img src={logo} alt="" className="w-10 md:w-[50px] lg:w-[50px]" />
              <p className="text-white fJost text-[18px] md:text-[22px] font-extrabold">
                Movie Vault
              </p>
            </Link>
            <p>
              MovieMaster Pro — your ultimate platform to explore, organize, and
              manage your favorite movies effortlessly.
            </p>
            <ul className="flex items-center gap-3">
              <li className="footerSocialIcon">
                <FaFacebookF />
              </li>
              <li className="footerSocialIcon">
                <FaXTwitter />
              </li>
              <li className="footerSocialIcon">
                <FaLinkedinIn />
              </li>
              <li className="footerSocialIcon">
                <FaInstagram />
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-5 flex flex-col items-start">
            <h2 className="text-[18px] font-bold border-b-3 border-primary">
              Quick Links
            </h2>
            <ul className="flex flex-col gap-3">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/allMovies">All Movies</Link>
              </li>
              <li>
                <Link to="/watchList">Watch List</Link>
              </li>
              <li>
                <Link to="/myCollection">My Collection</Link>
              </li>
            </ul>
          </div>

          {/* About company */}
          <div className="space-y-5 flex flex-col items-start">
            <h2 className="text-[18px] font-bold border-b-3 border-primary">
              About company
            </h2>
            <ul className="flex flex-col gap-3">
              <li>
                <Link to="/">About Us</Link>
              </li>
              <li>
                <Link to="/">Our Team</Link>
              </li>
              <li>
                <Link to="/">contact us</Link>
              </li>
              <li>
                <Link to="/">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* DownLoad Apps */}
          <div className="space-y-5 flex flex-col items-start ">
            <h2 className="text-[18px] font-bold border-b-3 border-primary">
              Downlaod App
            </h2>
            <p>
              Get the MovieMaster Pro app and enjoy seamless movie management
              anytime, anywhere.
            </p>
            <div className="flex w-full gap-5">
              <img
                src={googlePlay}
                alt="Google Play"
                className="w-[45%] object-contain"
              />
              <img
                src={appStore}
                alt="App Store"
                className="w-[45%] object-contain"
              />
            </div>
          </div>
        </div>
      </Container>
      {/* Copy Right */}
      <div className="text-center py-10 border-t border-[#ffffff2d]">
        <p>©2025 Movie Vault. All Rights Reserved. Developed by Abdullah</p>
      </div>
    </div>
  );
};

export default Footer;
