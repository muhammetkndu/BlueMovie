import { useMovieContext } from "../context/movieContext";
import type { Movie } from "../types/movie";

interface DropdownPanelProps {
  activeTab?: "films" | "series";
  searchQuery?: string;
  onClose: () => void;
}

export default function SearchPanel({ onClose, searchQuery }: DropdownPanelProps) {
  const { searchResults, setSelectedMovie } = useMovieContext();

  const isSearchMode = !!searchQuery;

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    onClose();
  };

  return (
    <div className="fixed top-16 left-0 w-full h-[80vh] bg-black/30 text-white overflow-y-auto z-[9999] p-4">
  {searchResults.length === 0 && isSearchMode && searchQuery && searchQuery.length > 0 ? (
    <p>Sonuç bulunamadı.</p>
  ) : (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {searchResults.map((movie: Movie) => (
        <div
          key={movie.id}
          className="relative cursor-pointer rounded overflow-hidden group"
          onClick={() => handleSelect(movie)}
        >
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path || movie.backdrop_path}`}
            alt={movie.title || movie.name}
            className="w-full h-48 object-cover rounded"
          />
          {/* Overlay title on hover */}
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b">
            <p className="text-sm font-semibold truncate px-2">
              {movie.title || movie.name}
            </p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

  );
}
