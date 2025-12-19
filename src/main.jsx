import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import router from "./Routes/Routes";
import AuthProvider from "./Context/AuthProvider";
import { Slide, ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}> </RouterProvider>
      <ToastContainer autoClose={3000} transition={Slide} />
    </AuthProvider>
  </StrictMode>
);
