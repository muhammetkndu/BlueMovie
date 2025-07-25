import { useEffect, useRef, useState } from "react";
import VideoDetailCard from "../pages/videoDetail";
import { useMovieContext } from "../context/movieContext";
import { videoData } from "../types/videoData";

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [showDetail ,setShowDetail] = useState(false);

    const {videoFile} = useMovieContext();
    const currentVideoData = videoData[videoFile || ""] || null
    const [shouldShowText, setShouldShowText] = useState(true);

    useEffect(() => {
      const handlerResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        console.log("Genişlik:", width, "Yükseklik:", height); // DEBUG
        
        // PC'de her zaman göster (768px ve üzeri)
        if (width >= 768) {
          console.log("PC modunda - göster"); // DEBUG
          setShouldShowText(true);
        } 
        // Mobilde sadece yatay modda göster (genişlik > yükseklik)
        else {
          const isLandscape = width > height;
          console.log("Mobil mod - Yatay mı?", isLandscape); // DEBUG
          setShouldShowText(isLandscape);
        }
      }
      
      handlerResize();
      window.addEventListener('resize', handlerResize);

      return () => window.removeEventListener('resize', handlerResize);
    },[]);

    // DEBUG için
    console.log("shouldShowText:", shouldShowText);
    console.log("currentVideoData:", currentVideoData);
    console.log("videoFile:", videoFile);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  
  return (
    <div className="relative w-full md:h-[100vh] h-[270px]  overflow-hidden text-white"
    >
      <video
        ref={videoRef}
        src={videoFile}
        autoPlay
        muted={isMuted}
        loop
        playsInline
        className="w-full h-full  object-cover"
      ></video>

      {currentVideoData && shouldShowText && (
        <div className="absolute top-[55%] md:top-1/3 left-4 sm:left-10 max-w-xs sm:max-w-xl space-y-4 sm:space-y-4 z-0 bg-gray-400/10 px-4 sm:px-2 py-10 sm:py-4 rounded-2xl sm:rounded-3xl">
        <h1 className="text-2xl sm:text-6xl font-bold">{currentVideoData.title}</h1>
        <p className="text-sm sm:text-2xl max-w-xs sm:max-w-md">{currentVideoData.description}</p>
    
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
      <button className="bg-white text-black px-4 sm:px-6 py-2 rounded font-semibold hover:bg-gray-300 transition">
        ▶️ Oynat
      </button>
      <button
        onClick={() => setShowDetail(true)}
        className="bg-gray-700 bg-opacity-70 px-4 sm:px-6 py-2 rounded hover:bg-gray-600 transition"
      >
        Detaylar
      </button>
    </div>
  </div>
  
      )}
      {showDetail && currentVideoData &&(
        <VideoDetailCard
          title={currentVideoData.title}
          overview={currentVideoData.description}
          image={currentVideoData.image}
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