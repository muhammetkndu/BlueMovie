import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface VideoContextType {
  video: string;
  toggleVideo: () => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider = ({ children }: { children: ReactNode }) => {
  const [video, setVideo] = useState("videos/videos.mp4"); // Game of Thrones

  const toggleVideo = () => {
    setVideo((prev) =>
      prev === "videos/videos.mp4"
        ? "videos/videosBreakingbad.mp4"
        : "videos/videos.mp4"
    );
  };

  return (
    <VideoContext.Provider value={{ video, toggleVideo }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (!context) throw new Error("VideoContext kullanılabilmesi için Provider gerekli");
  return context;
};
