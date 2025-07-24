import { useMovieContext } from "../context/movieContext";

const DetailCard = () => {
  const { selectedMovie, setSelectedMovie,addFavorite, removeFavorite, isFavorite } = useMovieContext();

     const handleFavoriteToggle = () =>{
        if(!selectedMovie) return;
        if(isFavorite(selectedMovie.id)){
          removeFavorite(selectedMovie.id);
        }else{
          addFavorite(selectedMovie);
        }
    };
      if (!selectedMovie) return null;

      const imageUrl = `https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path || selectedMovie.poster_path}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm p-4">
  <div className="relative w-full max-w-4xl mx-auto bg-[#141414] rounded-xl overflow-hidden shadow-lg text-white
                  max-h-[90vh] overflow-y-auto">
    {/* Kapatma Butonu */}
    <button
      onClick={() => setSelectedMovie(null)}
      className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 rounded-xl p-2 hover:bg-opacity-75 transition text-white text-xl"
    >
      <i className="bi bi-x-lg"></i>
    </button>

    {/* Film Görseli */}
    <div className="h-[200px] sm:h-[300px] w-full">
      <img
        src={imageUrl}
        alt={selectedMovie.title}
        className="w-full h-full object-cover rounded-t-xl"
      />
    </div>

    {/* İçerik */}
    <div className="p-4 sm:p-6 space-y-4">
      <h2 className="text-xl sm:text-2xl font-bold">{selectedMovie.title}</h2>
      <p className="text-xs sm:text-sm text-gray-300">{selectedMovie.overview}</p>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition w-full sm:w-auto text-center">
          ▶️ Oynat
        </button>
        <button
          onClick={handleFavoriteToggle}
          className="bg-neutral-700 px-4 py-2 rounded hover:bg-neutral-600 transition w-full sm:w-auto text-center"
        >
          ❤️ Favorilere Ekle
        </button>
      </div>
    </div>
  </div>
</div>

  );
};

export default DetailCard;
