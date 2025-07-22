import { useRef, useState } from "react";
import VideoDetailCard from "../pages/videoDetail";

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [showDetail ,setShowDetail] = useState(false);


  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const movie = {
    id: "1",
    title: "Game Of Thrones",
    overview: "Kuzey unutmaz. Tüm Westeros'u etkileyecek bir savaş başlıyor...",
  };

  return (
    <div className="relative w-full md:h-[690px] overflow-hidden text-white">
      <video
        ref={videoRef}
        src="/videos/videos.mp4"
        autoPlay
        muted={isMuted}
        loop
        playsInline
        className="w-full h-full object-cover"
      ></video>

    <div className="absolute top-70 left-10 max-w-xl space-y-6 z-10 bg-gray-400/7 px-5 py-20 rounded-3xl">
        <h1 className="text-6xl font-bold">{movie.title}</h1>
        <p className="max-w-md text-2xl">{movie.overview}</p>
        <div className="flex space-x-4">
          <button className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-300 transition">
            ▶️ Oynat
          </button>
          <button
            onClick={() => setShowDetail(true)}
            className="bg-gray-700 bg-opacity-70 px-6 py-2 rounded hover:bg-gray-600 transition"
          >
            Detaylar
          </button>
        </div>
      </div>
      {showDetail && (
        <VideoDetailCard
          title="Game Of Thrones"
          overview="Kuzey unutmaz. Tüm Westeros'u etkileyecek bir savaş başlıyor..."
          onClose={() => setShowDetail(false)}
        />
      )}

      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition z-10"
      >
        {isMuted ? "🔇" : "🔊"}
      </button>
    </div>
  );
};

export default VideoPlayer;
