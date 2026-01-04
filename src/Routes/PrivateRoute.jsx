import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/UseAuth";
import LoadingSpinner from "../Components/LoadingSpinner";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate state={location.pathname} to="/login"></Navigate>;
  }

  return children;
};

export default PrivateRoutes;
