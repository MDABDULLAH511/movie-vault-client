import { Link } from "react-router";


const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#161616] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-8xl font-bold text-white mb-4">404</h1>
      <p className="text-xl text-gray-300 mb-6">
        Oops! The page you are looking for does not exist.
      </p>
      <Link to="/" className="btn bg-primary text-white hover:bg-primary/90">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;

