import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router";
import Container from "../../Components/Container";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Components/LoadingSpinner";

const HeroSlider = () => {
  const axiosInstance = useAxios();

  const { data: featuredMovie = [], isLoading } = useQuery({
    queryKey: ["featured-movie"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/featured-movie`);
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // ✅ Prevent Swiper from rendering with empty data
  if (featuredMovie.length === 0) return null;

  return (
    <section className="relative">
      <Swiper
        key={featuredMovie.length}
        modules={[Navigation, Autoplay, EffectFade]}
        navigation
        effect="fade"
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        className="h-[80vh]"
      >
        {featuredMovie.map((movie) => (
          <SwiperSlide key={movie._id}>
            <div
              className="h-[80vh] bg-cover bg-center relative"
              style={{ backgroundImage: `url(${movie.posterUrl})` }}
            >
              <div className="absolute inset-0 bg-black/60"></div>

              <div className="relative z-10 h-full w-full flex items-center max-w-7xl mx-auto">
                <Container>
                  <div className="grid md:grid-cols-2 gap-10 items-center w-full">
                    {/* Left */}
                    <div className="space-y-4 animate-fadeIn">
                      <span className="text-red-500 uppercase tracking-widest mb-2">
                        Most Viewed
                      </span>

                      <h1 className="text-3xl md:text-5xl fJost font-bold text-white">
                        {movie.title}
                      </h1>

                      <p className="text-gray-200 ">{movie.plotSummary}</p>

                      <Link
                        to={`/movie/${movie._id}`}
                        className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded text-white font-semibold"
                      >
                        <FaPlay /> View Details
                      </Link>
                    </div>

                    {/* Right */}
                    <div className="hidden md:flex justify-end">
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="w-[500px] rounded-lg shadow-2xl"
                      />
                    </div>
                  </div>
                </Container>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;
