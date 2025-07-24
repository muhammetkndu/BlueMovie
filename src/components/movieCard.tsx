import { useEffect, useRef } from "react";
import type { Movie } from "../types/movie";
import { useMovieContext } from "../context/movieContext";

export default function MovieRow({
  title,
  films,
}: {
  title: string;
  films: Movie[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const {setSelectedMovie} = useMovieContext();
  const scrollAmount = 300;


  

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    if (direction === "left") {
      if (el.scrollLeft === 0) {
        el.scrollLeft = el.scrollWidth;
      } else {
        el.scrollLeft -= scrollAmount;
      }
    } else {
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth) {
        el.scrollLeft = 0;
      } else {
        el.scrollLeft += scrollAmount;
      }
    }
  };

  useEffect(() => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const interval = setInterval(() => {
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth) {
        el.scrollLeft = 0;
      } else {
        el.scrollLeft += scrollAmount;
      }
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full  md:my-10">
  <h2 className="text-xl font-bold px-4 mb-2 dark:text-white">{title}</h2>

  <button
    onClick={() => handleScroll("left")}
    className="absolute left-2 md:left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full hover:bg-black/70"
  >
    <i className="bi bi-chevron-left text-2xl text-white"></i>
  </button>

  <button
    onClick={() => handleScroll("right")}
    className="absolute right-2 md:right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full hover:bg-black/70"
  >
    <i className="bi bi-chevron-right text-2xl text-white"></i>
  </button>

  <div
    ref={scrollRef}
    className="overflow-x-scroll no-scrollbar scroll-smooth p-4 flex gap-3 md:gap-4"
  >
    {films.map((film) => (
      <div
        onClick={() => setSelectedMovie(film)}
        key={film.id}
        className="w-40 md:w-60 h-64 md:h-80 flex-shrink-0 relative rounded-xl overflow-hidden bg-gray-800 group cursor-pointer"
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
          alt={film.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 w-full bg-black/60 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h2 className="text-sm font-bold">{film.title}</h2>
          <div className="flex justify-between items-center mt-1">
            <p className="text-xs text-blue-400">Aksiyon</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  );
}
