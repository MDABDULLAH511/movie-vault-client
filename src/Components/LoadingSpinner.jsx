import React from "react";
import loadingAnimation from "../assets/movie vault.json";
import Lottie from "lottie-react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="z-50 w-64 h-64">
        <Lottie animationData={loadingAnimation} loop={true} size={200} />
      </div>
    </div>
  );
};

export default LoadingSpinner;
