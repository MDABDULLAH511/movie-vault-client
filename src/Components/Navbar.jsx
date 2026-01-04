import React from "react";
import MyNavLink from "./MyNavLink";
import { Link } from "react-router";
import Container from "./Container";
import logo from "/movieVault logo.png";
import userIcon from "../assets/user.png";
import { MdClose, MdLogout } from "react-icons/md";
import { CgMenuRightAlt } from "react-icons/cg";
import LoadingSpinner from "./LoadingSpinner";
import toast from "daisyui/components/toast";
import useAuth from "../Hooks/useAuth";

const Navbar = () => {
  const { user, loading, signOutUser } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  const handleSignOut = () => {
    signOutUser().then(() => {
      toast.success("Log out successfully!");
    });
  };

  // Nav Links
  const links = (
    <>
      <li>
        <MyNavLink to="/">Home</MyNavLink>
      </li>
      <li>
        <MyNavLink to="/aboutUs">About Us</MyNavLink>
      </li>
      <li>
        <MyNavLink to="/allMovies">All Movies</MyNavLink>
      </li>

      {user && (
        <>
          <li>
            <MyNavLink to="/addMovie">Add Movie</MyNavLink>
          </li>
          <li>
            <MyNavLink to="/dashboard">Dashboard</MyNavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <>
      <div className="sticky top-0 z-50 shadow-sm md:py-0 bg-base-200 border-b border-gray-700 ">
        <Container>
          <div className="flex justify-between   relative  items-center py-2.5 px-0 ">
            {/* Nav Logo */}
            <div className="">
              <Link to="/" className="flex justify-start items-center gap-3">
                <img
                  src={logo}
                  alt=""
                  className="w-10 md:w-[50px] lg:w-[50px]"
                />
                <p className="text-white fJost text-[18px] md:text-[22px] font-extrabold">
                  Movie Vault
                </p>
              </Link>
            </div>

            {/* Nav Link for Desktop Device */}
            <div className="hidden lg:flex justify-end items-center">
              <ul className="menu menu-horizontal px-1 space-x-5">{links} </ul>
            </div>

            <div className=" gap-2 ">
              {/* Login / Register Button / User Image / Log*/}
              {user ? (
                <div className="hidden lg:flex items-center gap-4 ">
                  <div className="dropdown dropdown-end ">
                    <img
                      tabIndex={0}
                      src={user.photoURL ? user.photoURL : userIcon}
                      alt=""
                      className="w-10 h-10  rounded-full bg-primary cursor-pointer"
                    />
                    {/* Dropdown Profile Div */}
                    <div
                      tabIndex="-1"
                      className="menu dropdown-content bg-base-200 rounded-[5px] border-b-2 border-primary z-99999 mt-10 w-60 p-5 shadow-sm text-white space-y-4"
                    >
                      {/* User Image and Name */}
                      <div className="flex gap-3 items-center mb-5">
                        <img
                          src={user.photoURL ? user.photoURL : userIcon}
                          alt=""
                          className="w-11 h-11  rounded-[5px] bg-primary cursor-pointer"
                        />
                        <p className="max-w-[200px] truncate">
                          {user.displayName ? user.displayName : "Unknown"}
                        </p>
                      </div>

                      {/* Dropdown links */}
                      <div>
                        <li>
                          <MyNavLink to="/dashboard/profile">Profile</MyNavLink>
                        </li>
                        <li>
                          <MyNavLink to="/dashboard">Dashboard</MyNavLink>
                        </li>
                      </div>

                      {/* LogOut Button */}
                      <button
                        onClick={handleSignOut}
                        className="btn bg-primary border-primary text-white hover:bg-transparent duration-300 fJost"
                      >
                        <MdLogout size={20} /> Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="hidden lg:flex gap-4 ">
                  <Link
                    to="/login"
                    className="btn btn-outline text-white border-primary hover:bg-primary duration-300"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="btn bg-primary border-primary text-white hover:bg-transparent duration-300 fJost"
                  >
                    Register
                  </Link>
                </div>
              )}

              {/* Mobile devise Nav bar */}
              <div className="lg:hidden drawer drawer-end w-3/12 flex justify-end">
                <input
                  id="my-drawer-5"
                  type="checkbox"
                  className="drawer-toggle"
                />

                {/* Navbar Menu  */}
                <div className="drawer-content">
                  <label htmlFor="my-drawer-5" className="drawer-button ">
                    <CgMenuRightAlt size={32} color="#ffffff" />
                  </label>
                </div>

                {/* Drawer Sidebar Page Content*/}
                <div className="drawer-side">
                  <label
                    htmlFor="my-drawer-5"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                  ></label>

                  <ul className="menu bg-base-200 min-h-full w-70 p-4 border-l-5 border-primary relative">
                    {/* Close button */}
                    <label
                      htmlFor="my-drawer-5"
                      className="btn btn-sm btn-circle absolute left-2 top-2"
                    >
                      <MdClose color="#ffffff" size={25} />
                    </label>

                    <div className="mt-12">
                      {/* Push menu items below close button */}
                      <ul className="menu menu-vertical px-1 space-y-5 mb-5">
                        {links}
                      </ul>
                      {/* User Dropdown */}
                      <div>
                        {user ? (
                          <div className="dropdown dropdown-start ">
                            <img
                              tabIndex={0}
                              src={user.photoURL ? user.photoURL : userIcon}
                              alt=""
                              className={`w-11 h-11 rounded-full bg-primary cursor-pointer ${
                                user.photoURL ? "p-0.5" : "p-2"
                              }`}
                            />
                            <div
                              tabIndex="-1"
                              className="menu dropdown-content bg-base-200 rounded-[5px] border-b-3 border-primary z-99999 mt-5 w-60 p-5 shadow-sm text-white space-y-4"
                            >
                              {/* User Image and Name */}
                              <div className="flex gap-3 items-center mb-5">
                                <img
                                  src={user.photoURL ? user.photoURL : userIcon}
                                  alt=""
                                  className="w-11 h-11  rounded-[5px] bg-primary cursor-pointer p-1"
                                />

                                <p className="max-w-[200px] truncate">
                                  {user.displayName
                                    ? user.displayName
                                    : "Unknown"}
                                </p>
                              </div>
                              {/* Dropdown links */}
                              <div>
                                <li>
                                  <MyNavLink to="/dashboard/profile">
                                    Profile
                                  </MyNavLink>
                                </li>
                                <li>
                                  <MyNavLink to="/dashboard">
                                    Dashboard
                                  </MyNavLink>
                                </li>
                              </div>
                              {/* Logout Button */}
                              <button
                                onClick={handleSignOut}
                                className="btn bg-primary border-primary text-white hover:bg-transparent duration-300 fJost"
                              >
                                <MdLogout size={20} /> Logout
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex gap-4 ">
                            <Link
                              to="/login"
                              className="btn btn-outline text-primary border-primary hover:bg-primary hover:text-white duration-300 shadow-none"
                            >
                              Login
                            </Link>

                            <Link
                              to="/register"
                              className="btn bg-primary border-primary text-white hover:bg-transparent hover:text-primary duration-300 shadow-none"
                            >
                              Register
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Navbar;
