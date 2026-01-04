import React from "react";
import comingSoonAnimation from "../../../assets/coming soon.json";
import Lottie from "lottie-react";

const UserDashboardHome = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <h2 className="text-white text-xl font-bold">Dashboard Home</h2>
      <div className="z-50 w-100 h-auto">
        <Lottie animationData={comingSoonAnimation} loop={true} size={200} />
      </div>
    </div>
  );
};

export default UserDashboardHome;
