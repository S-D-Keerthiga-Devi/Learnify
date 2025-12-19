import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GraduationCap, User, Menu, X } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../../context/AppContent";

function Navbar() {
  const location = useLocation();
  const isCourseListPage = location.pathname.includes("/course-list");
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isEducator } = useContext(AppContext)
  const navigate = useNavigate()

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav
      className={`sticky top-0 z-50 flex items-center justify-between px-6 sm:px-10 md:px-16 lg:px-20 xl:px-32 py-4 border-b backdrop-blur-sm transition-all duration-300
        ${isCourseListPage
          ? "bg-white/95 border-gray-200 shadow-sm"
          : "bg-white/90 border-gray-100"
        }`}
    >
      {/* Logo Section */}
      <Link
        to="/"
        className="flex items-center gap-2.5 hover:opacity-80 transition-opacity duration-200 group"
      >
        <div className="p-1.5 bg-blue-600 rounded-lg group-hover:bg-blue-700 transition-colors duration-200">
          <GraduationCap size={28} className="text-white" strokeWidth={2} />
        </div>
        <span className="text-xl font-bold text-gray-900 tracking-tight">
          Learnify
        </span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8">
        {user && (
          <>

            <Link
              to="/my-enrollments"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              My Enrollments
            </Link>
          </>
        )}

        <div className="flex items-center gap-3 ml-2">
          {user ? (
            <UserButton />
          ) : (
            <button
              onClick={() => openSignIn()}
              className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-5 py-2.5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center gap-2">
        <button
          onClick={toggleMenu}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-[72px] left-0 w-full bg-white/95 border-t border-gray-200 shadow-md md:hidden z-40 animate-fadeIn">
          <div className="flex flex-col items-center py-4 space-y-4 text-gray-700 font-medium">
            {user && (
              <>

                <Link
                  to="/my-enrollments"
                  className="hover:text-blue-600 transition-colors duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  My Enrollments
                </Link>
              </>
            )}

            {user ? (
              <UserButton />
            ) : (
              <button
                onClick={() => {
                  openSignIn();
                  setMenuOpen(false);
                }}
                className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-5 py-2.5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
