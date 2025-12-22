import Container from "../../Components/Container";
import GenreCardWithImage from "./GenreCardWithImage";

// Sample images (replace with real genre images)
const genreImages = {
  Action: "https://i.ibb.co/xS5X1NFh/14.jpg",
  Romance: "https://i.ibb.co/QjYqTCKp/15.jpg",
  Drama: "https://i.ibb.co/847bWCNt/23.jpg",
  "Sci-Fi": "https://i.ibb.co/ccGTBq78/21.jpg",
  Horror: "https://i.ibb.co/dwbdfwFW/20.jpg",
  Thriller: "https://i.ibb.co/Z6M0GvSZ/16.jpg",
  Crime: "https://i.ibb.co/chxc7fn0/13.jpg",
  Adventure: "https://i.ibb.co/KY7VnxW/12.jpg",
  Fantasy: "https://i.ibb.co/M5DmwGQp/17.jpg",
  Mystery: "https://i.ibb.co/rGFCjsdM/26.jpg",
};

const GenreListWithImage = () => {
  const genres = Object.keys(genreImages);

  return (
    <section className="py-10 lg:py-20 bg-[#1c1c1c]">
      <Container>
        <div className="animate-fadeIn">
          <div className="mb-6 pb-1.5 border-b-2 border-gray-700 text-center">
            <h2 className="font-semibold  text-3xl lg:text-4xl text-white">
              Browse by <span className="text-primary fJost">Genre</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-6">
            {genres.map((genre, index) => (
              <GenreCardWithImage
                key={index}
                genre={genre}
                imageUrl={genreImages[genre]}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default GenreListWithImage;
