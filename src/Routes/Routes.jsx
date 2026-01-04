import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import LoadingSpinner from "../Components/LoadingSpinner";
import NotFound from "../Pages/Error/NotFound";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import AllMovies from "../Pages/Movies/AllMovies";
import MyCollection from "../Pages/Movies/MyCollection";
import PrivateRoute from "./PrivateRoute";
import MovieDetails from "../Pages/Movies/MovieDetails";
import UpdateMovie from "../Pages/Movies/UpdateMovie";
import AddMovie from "../Pages/Movies/AddMovie";
import WatchList from "../Pages/WatchedList/WatchList";
import AboutUs from "../Pages/About Us/AboutUs";
import DashboardLayout from "../Layouts/DashboardLayout";
import UserDashboardHome from "../Pages/Dashboard/UserDashboardHome/UserDashboardHome";
import DashboardProfile from "../Pages/Dashboard/DashboardProfile/DashboardProfile";
import Settings from "../Pages/Settings/Settings";

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
        path: "/aboutUs",
        Component: AboutUs,
      },
    ],
  },

  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    hydrateFallbackElement: <LoadingSpinner />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        Component: UserDashboardHome,
      },
      {
        path: "profile",
        Component: DashboardProfile,
      },

      {
        path: "add-movie",
        Component: AddMovie,
      },

      {
        path: "my-collections",
        Component: MyCollection,
      },
      {
        path: "my-watched",
        Component: WatchList,
      },
      {
        path: "settings",
        Component: Settings,
      },
    ],
  },

  { path: "*", Component: NotFound },
  {
    path: "error",
    Component: NotFound,
  },
]);

export default router;
