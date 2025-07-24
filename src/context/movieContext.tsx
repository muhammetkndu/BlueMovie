import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Movie } from "../types/movie";
import gotVideo from '../assets/videos.mp4'

const apiKey = import.meta.env.VITE_API_KEY;

interface MovieContextType {
  movies: Movie[];
  latesMovies: Movie[];
  topRadetMovies: Movie[];
  topMovies: Movie[];
  topSeries: Movie[];
  searchResults: Movie[];
  searchQuery?: string;
  searchMovies: (query: string) => void;
  videoFile: string;
  selectedMovie: Movie | null;
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: string) => void;
  isFavorite: (movieId: string) => boolean;
  setVideoFile: (file: string) => void;
  setSelectedMovie: (movie: Movie | null) => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [latesMovies, setLatesMovies] = useState<Movie[]>([]);
  const [topRadetMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [topMovies, setTopMovies] = useState<Movie[]>([]);
  const [topSeries, setTopSeries] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [videoFile, setVideoFile] = useState(gotVideo);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);


    const addFavorite = (movie: Movie) => {
      setFavorites((prew) => {
        if(prew.find((m) => m.id === movie.id)) return prew;
        return [...prew, movie];
      });
    };

    const removeFavorite = (movieId: string) => {
      setFavorites((prev) => prev.filter((m) => m.id !== movieId));
    };

    const isFavorite = (movieId: string) => {
      return favorites.some((m) => m.id === movieId);
    }


  const searchMovies = async (query: string) =>{
    setSearchQuery(query);

    if(!query){
      setSearchResults([]);
      return;
    }
    try{
    const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=tr-TR&query=${encodeURIComponent(query)}&page=1&include_adult=false`);

    if(!res.ok) throw new Error("Arama Başarısız");
    const data = await res.json();
    setSearchResults(data.results);
    }catch(error){
      console.error(error);
    }
  }

  useEffect(() => {
  const fetchMovies = async () => {
    try {
      const [popularRes, latestRes, topRatedRes,topMoviesRes,topSeriesRes] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=tr-TR&page=1`),
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=tr-TR&page=1`),
        fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=tr-TR&page=1`),
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`),
        fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`)
      ]);

      if (!popularRes.ok || !latestRes.ok || !topRatedRes.ok || !topMoviesRes || !topSeriesRes) throw new Error("Veri alınamadı");
        const popularData = await popularRes.json();
        const latestData = await latestRes.json();
        const topRatedData = await topRatedRes.json();
        const topMoviesData = await topMoviesRes.json();
        const topSeriesData = await topSeriesRes.json();

        setMovies(popularData.results);         // Popüler
        setLatesMovies(latestData.results);    // Son çıkanlar
        setTopRatedMovies(topRatedData.results); // Top Rated
        setTopMovies(topMoviesData.results); // filmer
        setTopSeries(topSeriesData.results); // diziler
    } catch (error) {
      console.error(error);
    }
  };
  fetchMovies();
},[]);

  
  return (
    <MovieContext.Provider value={{
      movies,
      selectedMovie,
      videoFile, 
      setVideoFile, 
      latesMovies,
      topRadetMovies, 
      topMovies, 
      topSeries, 
      setSelectedMovie,
      searchResults,
      searchQuery,
      searchMovies,
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite,
      }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) throw new Error("MovieContext kullanılabilmesi için Provider gerekli");
  return context;
};
