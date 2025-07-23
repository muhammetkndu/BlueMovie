import { useMovieContext } from "../context/movieContext";

export default function Favorites() {
  const { favorites, removeFavorite } = useMovieContext();

  if (favorites.length === 0) 
    return (
      <div className="flex items-center justify-center h-96 text-gray-300 text-lg">
        Favori listen boş 😞
      </div>
    );

  return (
    <div className="p-6 bg-black/30 backdrop-blur-md rounded-lg mx-4 my-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Favorilerim</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {favorites.map((movie) => (
          <div
            key={movie.id}
            className="relative rounded-lg overflow-hidden shadow-lg bg-gray-900 bg-opacity-80 hover:scale-105 transform transition duration-300 cursor-pointer"
          >
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title || movie.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-3 bg-gradient-to-t from-black to-transparent absolute bottom-0 left-0 right-0">
              <p className="text-white font-semibold truncate">{movie.title || movie.name}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeFavorite(movie.id);
              }}
              className="absolute top-2 right-2 bg-red-600 bg-opacity-80 hover:bg-opacity-100 text-white rounded-full p-1.5"
              aria-label="Favorilerden Kaldır"
            >
              <i className="bi bi-trash-fill"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
