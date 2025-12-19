import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import LoadingSpinner from "../Components/LoadingSpinner";
import NotFound from "../Pages/Error/NotFound";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import AllMovies from "../Pages/Movies/AllMovies";
import MyCollection from "../Pages/Movies/MyCollection";
import WatchList from "../Pages/Watchlist/Watchlist";
import PrivateRoute from "./PrivateRoute";
import MovieDetails from "../Pages/Movies/MovieDetails";
import UpdateMovie from "../Pages/Movies/UpdateMovie";
import AddMovie from "../Pages/Movies/AddMovie";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    hydrateFallbackElement: <LoadingSpinner />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/allMovies",
        Component: AllMovies,
      },
      {
        path: `/movie/:id`,
        Component: MovieDetails,
      },
      {
        path: "/myCollection",
        element: (
          <PrivateRoute>
            <MyCollection />
          </PrivateRoute>
        ),
      },
      {
        path: "/addMovie",
        element: (
          <PrivateRoute>
            <AddMovie />
          </PrivateRoute>
        ),
      },
      {
        path: `/updateMovie/:id`,
        element: (
          <PrivateRoute>
            <UpdateMovie />
          </PrivateRoute>
        ),
      },
      {
        path: "/watchList",
        element: (
          <PrivateRoute>
            <WatchList />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
