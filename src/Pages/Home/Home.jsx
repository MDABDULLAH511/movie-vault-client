import AboutMovieVault from "./AboutMovieVault";
import FAQ from "./FAQ";
import GenreListWithImage from "./GenreListWithImage";
import HeroCarousel from "./HeroCarousel";
import MostWatch from "./MostWatch";
import Newsletter from "./NewsLetter";
import RecentlyAddedMovies from "./RecentlyAddedMovies";
import TopRatedMovies from "./TopRatedMovies";
import TopRatedOne from "./TopRatedOne";

const Home = () => {
  return (
    <div>
      <HeroCarousel />
      <TopRatedMovies />
      <RecentlyAddedMovies />
      <TopRatedOne />
      <AboutMovieVault />
      <MostWatch />
      <GenreListWithImage />
      <FAQ />
      <Newsletter />
    </div>
  );
};

export default Home;
