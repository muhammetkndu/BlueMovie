import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Movie } from "../types/movie";

const apiKey = import.meta.env.VITE_API_KEY;

interface MovieContextType {
  movies: Movie[];
  latesMovies: Movie[];
  topRadetMovies: Movie[];
  selectedMovie: Movie | null;
  setSelectedMovie: (movie: Movie | null) => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [latesMovies, setLatesMovies] = useState<Movie[]>([]);
  const [topRadetMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
  const fetchMovies = async () => {
    try {
      const [popularRes, latestRes, topRatedRes] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=tr-TR&page=1`),
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=tr-TR&page=1`),
        fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=tr-TR&page=1`)
      ]);

      if (!popularRes.ok || !latestRes.ok || !topRatedRes.ok) throw new Error("Veri alınamadı");
        const popularData = await popularRes.json();
        const latestData = await latestRes.json();
        const topRatedData = await topRatedRes.json();

        setMovies(popularData.results);         // Popüler
        setLatesMovies(latestData.results);    // Son çıkanlar
        setTopRatedMovies(topRatedData.results); // Top Rated
    } catch (error) {
      console.error(error);
    }
  };
  fetchMovies();
},[]);

  
  return (
    <MovieContext.Provider value={{movies,selectedMovie, latesMovies,
      topRadetMovies,setSelectedMovie}}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) throw new Error("MovieContext kullanılabilmesi için Provider gerekli");
  return context;
};
