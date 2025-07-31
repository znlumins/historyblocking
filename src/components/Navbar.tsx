// File: src/components/Navbar.jsx (Versi Final Tanpa Logo di Menu Mobile)

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import UserDropdown from "./UserDropdown";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="w-full h-16 md:h-20 lg:h-[110px] bg-historic-brown dark:bg-gray-800 border-b-2 md:border-b-4 border-historic-brown-dark dark:border-gray-700 shadow-lg px-4 md:px-8 lg:px-20 relative z-40">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&family=Merriweather:wght@400;700&family=Georgia:wght@400&display=swap"
        />

        <div className="flex items-center justify-between w-full h-full">
          {/* Left side - Logo */}
          <div className="flex items-center lg:w-64">
            <Link to="/" onClick={closeMobileMenu}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/507170e63ed72fa0abf94c821deabb0a1109b706?placeholderIfAbsent=true"
                alt="HISTORIC BLOCK"
                className="w-[50px] h-[50px] md:w-[62px] md:h-[62px] hover:scale-105 transition-transform"
              />
            </Link>
          </div>

          {/* Center - Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 justify-center flex-1">
            <Link
              to="/"
              className={`font-quicksand text-base transition-colors ${
                isActive("/")
                  ? "text-historic-yellow-light font-bold"
                  : "text-white dark:text-gray-200 hover:text-historic-yellow-light"
              }`}
            >
              Beranda
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/kuis"
                  className={`font-quicksand text-base transition-colors ${
                    isActive("/kuis")
                      ? "text-historic-yellow-light font-bold"
                      : "text-white dark:text-gray-200 hover:text-historic-yellow-light"
                  }`}
                >
                  Kuis
                </Link>
                <Link
                  to="/leaderboard"
                  className={`font-quicksand text-base transition-colors ${
                    isActive("/leaderboard")
                      ? "text-historic-yellow-light font-bold"
                      : "text-white dark:text-gray-200 hover:text-historic-yellow-light"
                  }`}
                >
                  Leaderboard
                </Link>
                <Link
                  to="/tutorial"
                  className={`font-quicksand text-base transition-colors ${
                    isActive("/tutorial")
                      ? "text-historic-yellow-light font-bold"
                      : "text-white dark:text-gray-200 hover:text-historic-yellow-light"
                  }`}
                >
                  Tutorial Gameplay
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/tutorial"
                  className={`font-quicksand text-base transition-colors ${
                    isActive("/tutorial")
                      ? "text-historic-yellow-light font-bold"
                      : "text-white dark:text-gray-200 hover:text-historic-yellow-light"
                  }`}
                >
                  Tutorial Gameplay
                </Link>
                <Link
                  to="/leaderboard"
                  className={`font-quicksand text-base transition-colors ${
                    isActive("/leaderboard")
                      ? "text-historic-yellow-light font-bold"
                      : "text-white dark:text-gray-200 hover:text-historic-yellow-light"
                  }`}
                >
                  Leaderboard
                </Link>
              </>
            )}
          </nav>

          {/* Right side - Auth Actions and Mobile Menu Button */}
          <div className="flex items-center gap-4 lg:w-64 justify-end">
            <div className="hidden lg:flex items-center">
              {isAuthenticated && user ? (
                <UserDropdown userName={user.name} userLevel={user.level} />
              ) : (
                <div className="flex items-center gap-4">
                  <Link
                    to="/login"
                    className="font-quicksand text-white dark:text-gray-200 hover:text-historic-yellow-light transition-colors"
                  >
                    Masuk
                  </Link>
                  <Link
                    to="/register"
                    className="bg-gradient-to-r from-historic-yellow to-historic-orange hover:from-historic-orange hover:to-historic-yellow text-white font-quicksand px-6 py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Daftar
                  </Link>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white dark:text-gray-200 hover:text-historic-yellow-light transition-colors p-2"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
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
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={closeMobileMenu}
        >
          <div
            className="relative bg-white dark:bg-gray-800 w-full max-w-sm h-full shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out animate-in slide-in-from-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-historic-brown dark:bg-gray-700 p-4 border-b border-historic-brown-dark dark:border-gray-600">
              {/* === PERUBAHAN DI SINI === */}
              <div className="flex items-center justify-end mb-4">
                {/* Logo dihapus dari sini */}
                <button
                  onClick={closeMobileMenu}
                  className="text-white dark:text-gray-200 hover:text-historic-yellow-light transition-colors p-2"
                  aria-label="Tutup menu"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              {/* === AKHIR PERUBAHAN === */}

              {isAuthenticated && user && (
                <div className="flex items-center gap-3 bg-historic-brown-dark dark:bg-gray-600 rounded-lg p-3">
                  <div className="w-12 h-12 bg-historic-yellow rounded-full flex items-center justify-center">
                    <span className="font-quicksand font-bold text-historic-brown-dark text-lg">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-quicksand font-bold text-white dark:text-gray-100 text-sm">
                      {user.name}
                    </p>
                    <p className="font-quicksand text-historic-yellow-light dark:text-yellow-300 text-xs">
                      {user.level}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              <Link
                to="/"
                onClick={closeMobileMenu}
                className={`block font-quicksand text-lg py-3 px-4 rounded-lg transition-colors ${
                  isActive("/")
                    ? "bg-historic-yellow text-historic-brown-dark font-bold"
                    : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                🏠 Beranda
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/kuis"
                    onClick={closeMobileMenu}
                    className={`block font-quicksand text-lg py-3 px-4 rounded-lg transition-colors ${
                      isActive("/kuis")
                        ? "bg-historic-yellow text-historic-brown-dark font-bold"
                        : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    🎯 Kuis
                  </Link>
                  <Link
                    to="/leaderboard"
                    onClick={closeMobileMenu}
                    className={`block font-quicksand text-lg py-3 px-4 rounded-lg transition-colors ${
                      isActive("/leaderboard")
                        ? "bg-historic-yellow text-historic-brown-dark font-bold"
                        : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    🏆 Leaderboard
                  </Link>
                  <Link
                    to="/tutorial"
                    onClick={closeMobileMenu}
                    className={`block font-quicksand text-lg py-3 px-4 rounded-lg transition-colors ${
                      isActive("/tutorial")
                        ? "bg-historic-yellow text-historic-brown-dark font-bold"
                        : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    📖 Tutorial Gameplay
                  </Link>

                  <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

                  <Link
                    to="/profile"
                    onClick={closeMobileMenu}
                    className="block font-quicksand text-lg py-3 px-4 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    👤 Profil Saya
                  </Link>
                  <Link
                    to="/stats"
                    onClick={closeMobileMenu}
                    className="block font-quicksand text-lg py-3 px-4 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    📊 Statistik
                  </Link>
                  <Link
                    to="/achievements"
                    onClick={closeMobileMenu}
                    className="block font-quicksand text-lg py-3 px-4 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    🏆 Achievement
                  </Link>
                  <Link
                    to="/settings"
                    onClick={closeMobileMenu}
                    className="block font-quicksand text-lg py-3 px-4 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    ⚙️ Pengaturan
                  </Link>

                  {user?.role === "admin" && (
                    <>
                      <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                      <Link
                        to="/admin"
                        onClick={closeMobileMenu}
                        className="block font-quicksand text-lg py-3 px-4 rounded-lg bg-historic-cream dark:bg-gray-600 text-historic-brown-dark dark:text-historic-yellow hover:bg-historic-yellow dark:hover:bg-gray-500 transition-colors font-semibold"
                      >
                        🛠️ Admin Dashboard
                      </Link>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Link
                    to="/tutorial"
                    onClick={closeMobileMenu}
                    className={`block font-quicksand text-lg py-3 px-4 rounded-lg transition-colors ${
                      isActive("/tutorial")
                        ? "bg-historic-yellow text-historic-brown-dark font-bold"
                        : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    📖 Tutorial Gameplay
                  </Link>
                  <Link
                    to="/leaderboard"
                    onClick={closeMobileMenu}
                    className={`block font-quicksand text-lg py-3 px-4 rounded-lg transition-colors ${
                      isActive("/leaderboard")
                        ? "bg-historic-yellow text-historic-brown-dark font-bold"
                        : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    🏆 Leaderboard
                  </Link>

                  <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="block font-quicksand text-lg py-3 px-4 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    🚪 Masuk
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMobileMenu}
                    className="block w-full text-center font-quicksand text-lg py-3 px-4 rounded-lg bg-gradient-to-r from-historic-yellow to-historic-orange text-white hover:from-historic-orange hover:to-historic-yellow transition-all duration-200 shadow-lg"
                  >
                    ✨ Daftar
                  </Link>
                </>
              )}
            </nav>

            {isAuthenticated && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  className="w-full flex items-center justify-center gap-2 font-quicksand text-lg py-3 px-4 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                  </svg>
                  Keluar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;