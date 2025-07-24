import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMovieContext } from "../context/movieContext";
import SearchPanel from "./searchPanel";
import DropdownPanel from "./dropdownPanel";
import Favorites from "../pages/favorites";

export default function Navbar() {
  const [activeDropDown, setActiveDropDown] = useState<"films" | "series" | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { setVideoFile, searchMovies } = useMovieContext();
  const [isSwapped, setIsSwapped] = useState(false);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);

  useEffect(() => {
      document.documentElement.classList.remove("dark");
      setIsSwapped(false);
  },[])


  useEffect(() => {
    document.body.style.overflow = activeDropDown || searchTerm || showFavoritesModal ? "hidden" : "auto";
  }, [activeDropDown, searchTerm, showFavoritesModal]);

  // Search panel kapanınca inputu temizle
  const handleCloseSearch = () => {
    setSearchTerm("");
  };

  // Arama inputu değişince
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    searchMovies(value);
  };

  // Favori modal aç/kapa
  const toggleFavoritesModal = () => setShowFavoritesModal(prev => !prev);

  return (
    <>
      <nav className="absolute top-0 left-0 w-full z-10 p-2 bg-transparent">
  <div className="flex flex-col md:flex-row justify-between items-center p-2 text-white font-bold gap-3 md:gap-0">
    <h1 className="font-bold text-lg cursor-pointer hover:text-red-500">
      BlueMovie
    </h1>

    <div className="relative w-full md:w-80">
      <input
        className="p-2 rounded-2xl border w-full focus:outline-none"
        placeholder="Film, Dizi Arayın"
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button>
        <i className="bi bi-search absolute right-3 bottom-2"></i>
      </button>
    </div>

    <div
      className="flex gap-2 text-lg p-1 cursor-pointer select-none"
      onClick={() => {
        setIsSwapped((prev) => {
          const newSwapped = !prev;

          if (newSwapped) {
            document.documentElement.classList.add("dark");
            setVideoFile("/videos/videosBreakingBad.mp4");
          } else {
            document.documentElement.classList.remove("dark");
            setVideoFile("/videos/videos.mp4");
          }

          return newSwapped;
        });
      }}
    >
      {isSwapped ? (
        <i className="bi bi-sun text-2xl"></i> // Güneş: Light mod aktif
      ) : (
        <i className="bi bi-moon text-2xl"></i> // Ay: Dark mod aktif
      )}
    </div>

    <ul className="flex flex-wrap gap-4 md:gap-6 font-bold p-1 justify-center md:justify-start w-full md:w-auto">
      <Link to={"/"}>
        <li className="relative py-1 cursor-pointer group whitespace-nowrap">
          Anasayfa
          <span className="absolute left-0 bottom-0 h-1 bg-white w-0 group-hover:w-full transition-all duration-500 ease-in-out rounded-full"></span>
        </li>
      </Link>

      <li
        onClick={() => setActiveDropDown("films")}
        className="relative py-1 cursor-pointer group whitespace-nowrap"
      >
        Filmler
        <span className="absolute left-0 bottom-0 h-1 bg-white w-0 group-hover:w-full transition-all duration-500 ease-in-out rounded-full"></span>
      </li>

      <li
        onClick={() => setActiveDropDown("series")}
        className="relative py-1 cursor-pointer group whitespace-nowrap"
      >
        Diziler
        <span className="absolute left-0 bottom-0 h-1 bg-white w-0 group-hover:w-full transition-all duration-500 ease-in-out rounded-full"></span>
      </li>

      <li
        onClick={toggleFavoritesModal}
        className="relative py-1 cursor-pointer group whitespace-nowrap"
      >
        Favoriler
        <span className="absolute left-0 bottom-0 h-1 bg-white w-0 group-hover:w-full transition-all duration-500 ease-in-out rounded-full"></span>
      </li>
    </ul>
  </div>

  {searchTerm && (
    <SearchPanel searchQuery={searchTerm} onClose={handleCloseSearch} />
  )}

  {activeDropDown && !searchTerm && (
    <DropdownPanel activeTab={activeDropDown} onClose={() => setActiveDropDown(null)} />
  )}

  {/* Favoriler modalı */}
  {showFavoritesModal && (
    <div
      onClick={toggleFavoritesModal}
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#141414]/30 rounded-xl shadow-lg max-w-full md:max-w-6xl w-full max-h-[80vh] overflow-y-auto p-6 relative"
      >
        <button
          onClick={toggleFavoritesModal}
          className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-red-500"
        >
          &times;
        </button>

        <Favorites />
      </div>
    </div>
  )}
</nav>

    </>
  );
}
