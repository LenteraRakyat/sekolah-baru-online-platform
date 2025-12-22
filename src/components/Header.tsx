
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, GraduationCap } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PPDB 2024
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                isActive("/") ? "text-blue-600" : "text-gray-700"
              }`}
            >
              Beranda
            </Link>
            <Link
              to="/select-level"
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                isActive("/select-level") ? "text-blue-600" : "text-gray-700"
              }`}
            >
              Daftar
            </Link>
            <Link
              to="/student"
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                isActive("/student") ? "text-blue-600" : "text-gray-700"
              }`}
            >
              Panel Siswa
            </Link>
            <Link
              to="/admin"
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                isActive("/admin") ? "text-blue-600" : "text-gray-700"
              }`}
            >
              Panel Admin
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  isActive("/") ? "text-blue-600" : "text-gray-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Beranda
              </Link>
              <Link
                to="/select-level"
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  isActive("/select-level") ? "text-blue-600" : "text-gray-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Daftar
              </Link>
              <Link
                to="/student"
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  isActive("/student") ? "text-blue-600" : "text-gray-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Panel Siswa
              </Link>
              <Link
                to="/admin"
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  isActive("/admin") ? "text-blue-600" : "text-gray-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Panel Admin
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
