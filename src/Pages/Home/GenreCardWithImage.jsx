const GenreCardWithImage = ({ genre, imageUrl }) => {
  return (
    <div className="relative h-32 rounded-lg overflow-hidden cursor-pointer group">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 scale-110 group-hover:scale-100 group-hover:opacity-90"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition duration-300"></div>

      {/* Genre Text */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <h3 className="text-white text-lg font-semibold">{genre}</h3>
      </div>
    </div>
  );
};

export default GenreCardWithImage;
