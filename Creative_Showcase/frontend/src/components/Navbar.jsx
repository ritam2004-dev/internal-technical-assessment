import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate("/");
  };

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link
              to="/"
              className="text-2xl font-bold bg-linear-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent"
            >
              <img src="/logo.png" alt="Logo" className="h-10 inline mr-2" />
              Creative Showcase
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-6 items-center">
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-teal-600 font-medium transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-5 py-2 bg-linear-to-r from-blue-600 to-teal-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                  >
                    Join Free
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to={`/profile/${user.username}`}
                    className="text-gray-800 font-bold hover:text-teal-600 transition-colors border-b-2 border-transparent hover:border-teal-500"
                  >
                    @{user.username}
                  </Link>
                  <Link
                    to="/dashboard"
                    className="text-gray-800 hover:text-teal-600 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 hover:text-red-600 font-medium transition-colors cursor-pointer"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700 hover:text-teal-600 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3 border-t pt-4">
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-gray-700 hover:text-teal-600 font-medium py-2"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center px-5 py-2 bg-linear-to-r from-blue-600 to-teal-500 text-white rounded-lg font-medium"
                  >
                    Join Free
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to={`/profile/${user.username}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-gray-700 hover:text-teal-600 py-2"
                  >
                    @{user.username}
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-gray-700 hover:text-teal-600 py-2"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-red-500 hover:text-red-600 font-medium py-2 cursor-pointer"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
