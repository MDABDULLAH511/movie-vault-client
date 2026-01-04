import React from "react";
import { Link, Outlet } from "react-router";
import logo from "../assets/movieVaultLogo.png";
import { GoSidebarCollapse } from "react-icons/go";
import { IoHomeOutline } from "react-icons/io5";
import { LuSettings2 } from "react-icons/lu";
import { BiCameraMovie } from "react-icons/bi";
import { RiHeartAddFill } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineLocalMovies } from "react-icons/md";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open bg-[#1f1f1f]">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content ">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-white shadow-lg bg-base-200 ">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn border-0 shadow"
          >
            {/* Sidebar toggle icon */}
            <GoSidebarCollapse size={30} color="white" />
          </label>
          <div className="px-4">
            <p className="text-white text-[16px] md:text-[22px] font-extrabold fJost">
              Movie <span className="text-primary">Vault </span> Dashboard
            </p>
          </div>
        </nav>
        {/* Page content here */}
        <Outlet />
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow space-y-2">
            {/* List item */}
            {/* Dashboard drawer menu bar logo */}
            <li>
              <Link to="/">
                <img src={logo} alt="" className="w-10" />
              </Link>
            </li>

            {/* Dashboard Home */}
            <li>
              <Link
                to="/dashboard"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-white"
                data-tip="Home Page"
              >
                {/* Home icon */}
                <IoHomeOutline size={18} color="white" />
                <span className="is-drawer-close:hidden">Home Page</span>
              </Link>
            </li>

            {/* Dashboard Profile */}
            <li>
              <Link
                to="/dashboard/profile"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-white"
                data-tip="My Profile"
              >
                {/* Home icon */}
                <FaRegUserCircle size={18} color="white" />
                <span className="is-drawer-close:hidden">My Profile</span>
              </Link>
            </li>

            {/* Add Movie  */}
            <li>
              <Link
                to="/dashboard/add-movie"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-white"
                data-tip="Add Movie"
              >
                {/* Add Movie icon */}
                <BiCameraMovie size={18} color="white" />

                <span className="is-drawer-close:hidden">Add Movie</span>
              </Link>
            </li>

            {/* My Collection  */}
            <li>
              <Link
                to="/dashboard/my-collections"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-white"
                data-tip="My Collections"
              >
                {/* My myCollection icon */}
                <MdOutlineLocalMovies size={18} color="white" />

                <span className="is-drawer-close:hidden">My Collections</span>
              </Link>
            </li>

            {/* My watched  */}
            <li>
              <Link
                to="/dashboard/my-watched"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-white"
                data-tip="My Watched"
              >
                {/* My Lesson icon */}
                <RiHeartAddFill size={18} color="white" />

                <span className="is-drawer-close:hidden">My Watched</span>
              </Link>
            </li>

            {/* Settings */}
            <span className="h-0.5 w-full bg-gray-300"></span>
            <li>
              <Link
                to={"/dashboard/settings"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-white"
                data-tip="Settings"
              >
                {/* Settings icon */}
                <LuSettings2 size={18} color="white" />

                <span className="is-drawer-close:hidden">Settings</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
