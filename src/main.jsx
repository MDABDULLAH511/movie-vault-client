import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import router from "./Routes/Routes";
import AuthProvider from "./Context/AuthProvider";
import { Slide, ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClients = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClients}>
      <AuthProvider>
        <RouterProvider router={router}> </RouterProvider>
        <ToastContainer autoClose={3000} transition={Slide} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
