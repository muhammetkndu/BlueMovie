import { useMovieContext } from "../context/movieContext";
import Video from "../components/video";
import MovieRow from "../components/movieCard";
import Footer from "./footer";

export default function Home() {
  const { movies, latesMovies, topRadetMovies } = useMovieContext();

  return (
    <>
      <div className=" w-full overflow-hidden ">
        <Video />
      </div>
      <br />
      <div>
        <MovieRow title="Öne Çıkanlar" films={movies} />
        <MovieRow title="Son Eklenenler" films={latesMovies} />
        <MovieRow title="En Çok Oy Alanlar" films={topRadetMovies} />
      </div>
      
      <Footer />
    </>
  );
}
