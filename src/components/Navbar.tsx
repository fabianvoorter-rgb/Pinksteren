import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          Pinksteren 2026
        </h1>
        <div className="space-x-6 font-medium">
          <Link to="/" className="hover:text-pink-400 transition">Home</Link>
          <Link to="/planning" className="hover:text-pink-400 transition">Highlights</Link>
          <Link to="/contact" className="hover:text-pink-400 transition">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
