import { useMovieContext } from "../context/movieContext";

interface VideoDetailCardProps {
  title: string;
  overview: string;
  image: string;
  onClose: () => void;
}


const VideoDetailCard = ({ title, overview, image, onClose }: VideoDetailCardProps) => {

  const { selectedMovie, addFavorite, removeFavorite, isFavorite } = useMovieContext();

  const handleFavoriteToggle = () =>{
    if(!selectedMovie) return;
    if(isFavorite(selectedMovie.id)){
  removeFavorite(selectedMovie.id);
    }else{
      addFavorite(selectedMovie);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl mx-auto bg-[#141414] rounded-xl overflow-hidden shadow-lg text-white">
        {/* Çarpı butonu */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 rounded-xl p-2 hover:bg-opacity-75 transition text-white text-xl"
        >
          <i className="bi bi-x-lg"></i>
        </button>

        {/* Görsel */}
        <div className='h-[300px] w-full'>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        </div>
        <div className='p-6 space-y-4'>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="mb-6">{overview}</p>
        <div className="flex space-x-4">
          <button className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-300 transition">
            ▶️ Oynat
          </button>
          <button
          onClick={handleFavoriteToggle}
          className="bg-gray-700 px-6 py-2 rounded hover:bg-gray-600 transition">
            Favorilere Ekle
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetailCard;
