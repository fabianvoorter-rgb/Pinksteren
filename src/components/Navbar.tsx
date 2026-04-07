import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-yellow-50 text-yellow-400 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <div className="w-full md:w-auto flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-extrabold poster-title">
            Pinksteren 2026
          </h1>
          <button
            aria-label="Toggle menu"
            className="text-yellow-400 md:hidden"
            onClick={() => setOpen((s) => !s)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        <div className={`w-full md:w-auto mt-4 md:mt-0 ${open ? "block" : "hidden"} md:block`}>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-2 md:space-y-0 font-medium">
            <Link to="/" onClick={() => setOpen((s) => !s)} className="hover:text-pink-400 transition">Home</Link>
            <Link to="/planning" onClick={() => setOpen((s) => !s)} className="hover:text-pink-400 transition">Evenementen</Link>
            <Link to="/contact" onClick={() => setOpen((s) => !s)} className="hover:text-pink-400 transition">Aanmelden</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
