import { useMovieContext } from "../context/movieContext";


const DetailCard = () => {
  const { selectedMovie, setSelectedMovie } = useMovieContext();

  if (!selectedMovie) return null;

  const imageUrl = `https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path || selectedMovie.poster_path}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl mx-auto bg-[#141414] rounded-xl overflow-hidden shadow-lg text-white">

        {/* Kapatma Butonu */}
        <button
            onClick={() => setSelectedMovie(null)}
            className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 rounded-xl p-2 hover:bg-opacity-75 transition text-white text-xl"
            >
                <i className="bi bi-x-lg"></i>
        </button>

        {/* Film Görseli */}
        <div className="h-[300px] w-full">
          <img
            src={imageUrl}
            alt={selectedMovie.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* İçerik */}
        <div className="p-6 space-y-4">
          <h2 className="text-2xl font-bold">{selectedMovie.title}</h2>
          <p className="text-sm text-gray-300">{selectedMovie.overview}</p>

          <div className="flex gap-4">
            <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition">
              ▶️ Oynat
            </button>
            <button className="bg-neutral-700 px-4 py-2 rounded hover:bg-neutral-600 transition">
              ❤️ Favorilere Ekle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCard;
