import bgImage from '../assets/game of thrones3.webp'
import bgImage2 from '../assets/breakingbad.webp'
import type { Movie } from "./movie";
export const videoData: Record<string, Movie> = {
      "/videos/videos.mp4": {
      id: "1",
      title: "Game of Thrones",
      description: "Krallık dediğin savaşsız olur mu? En güçlü krallığı kurup...",
      image: bgImage ,
    },
    "/videos/videosBreakingBad.mp4": {
      id: "2",  
      title: "Breaking Bad",
      description: "Kimya öğretmeninin uyuşturucu baronuna dönüşme hikayesi.",
      image: bgImage2,
    },
  };
  