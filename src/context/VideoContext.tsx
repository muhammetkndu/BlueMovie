import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

import gotVideo from "../assets/videos.mp4";
import breakingBadVideo from "../assets/videosBreakingBad.mp4";

interface VideoContextType {
  video: string;
  toggleVideo: () => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider = ({ children }: { children: ReactNode }) => {
  const [video, setVideo] = useState(gotVideo);

  const toggleVideo = () => {
    setVideo((prev) => (prev === gotVideo ? breakingBadVideo : gotVideo));
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
