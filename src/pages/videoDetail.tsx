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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm px-2">
  <div className="relative w-full max-w-4xl mx-auto bg-[#141414] rounded-xl overflow-hidden shadow-lg text-white 
                  landscape:max-h-[90vh] landscape:flex landscape:flex-row">

    {/* Çarpı butonu */}
    <button
      onClick={onClose}
      className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-black bg-opacity-50 rounded-xl p-2 hover:bg-opacity-75 transition text-white text-lg sm:text-xl"
    >
      <i className="bi bi-x-lg"></i>
    </button>

    {/* Görsel */}
    <div className="h-[200px] sm:h-[300px] w-full 
                    landscape:h-full landscape:w-1/2 landscape:flex-shrink-0">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />
    </div>

    {/* İçerik */}
    <div className="p-4 sm:p-6 space-y-4 
                    landscape:flex-1 landscape:overflow-y-auto landscape:space-y-3">
      <h2 className="text-xl sm:text-2xl font-bold 
                     landscape:text-lg landscape:mt-8">{title}</h2>
      <p className="text-sm sm:text-base text-gray-300 
                    landscape:text-sm landscape:leading-relaxed">{overview}</p>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 
                      landscape:flex-row landscape:gap-2">
        <button className="bg-white text-black px-4 py-2 rounded font-semibold hover:bg-gray-300 transition
                          landscape:px-3 landscape:py-1.5 landscape:text-sm">
          ▶️ Oynat
        </button>
        <button
          onClick={handleFavoriteToggle}
          className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 transition
                    landscape:px-3 landscape:py-1.5 landscape:text-sm"
        >
          Favorilere Ekle
        </button>
      </div>
    </div>
  </div>
</div>
  );
};

export default VideoDetailCard;
