import AboutMovieVault from "./AboutMovieVault";
import GenreListWithImage from "./GenreListWithImage";
import HeroCarousel from "./HeroCarousel";
import RecentlyAddedMovies from "./RecentlyAddedMovies";
import TopRatedMovies from "./TopRatedMovies";

const Home = () => {
  return (
    <div>
      <HeroCarousel />
      <AboutMovieVault />
      <TopRatedMovies />
      <RecentlyAddedMovies />
      <GenreListWithImage />
    </div>
  );
};

export default Home;
