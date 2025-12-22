import axios from "axios";
import React from "react";

const axiosInstance = axios.create({
  baseURL: `https://movie-vault-server-kappa.vercel.app`,
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
