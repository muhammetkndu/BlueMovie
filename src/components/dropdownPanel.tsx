import { useState, useEffect } from "react";
import { useMovieContext } from "../context/movieContext";
import DetailCard from "../pages/movieDetail";
import type { Movie } from "../types/movie";

interface Props {
  activeTab: "films" | "series";
  onClose: () => void;
}

const apiKey = import.meta.env.VITE_API_KEY;

export default function DropdownPanel({ activeTab, onClose }: Props) {
  const [page, setPage] = useState(1);
  const [dataToShow, setDataToShow] = useState<Movie[]>([]);

  const { setSelectedMovie } = useMovieContext();

  useEffect(() => {
    const fetchData = async () => {
      const url =
        activeTab === "films"
          ? `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=tr-TR&page=${page}`
          : `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=tr-TR&page=${page}`;

      try {
        const res = await fetch(url);
        const json = await res.json();
        setDataToShow(json.results);
      } catch (err) {
        console.error("Veri alınamadı:", err);
      }
    };

    fetchData();
  }, [activeTab, page]);

  return (
    <div className="fixed top-16 left-0 w-full h-[80vh] bg-black text-white overflow-y-auto z-[9999] p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          {activeTab === "films" ? "Filmler" : "Diziler"}
        </h2>
        <button onClick={onClose} className="text-red-400 text-xl">
          Kapat ✖
        </button>
      </div>

      {/* Kartlar */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
        {dataToShow.map((item: Movie) => (
          <div
            key={item.id}
            className="relative group bg-gray-800 rounded overflow-hidden cursor-pointer"
            onClick={() => setSelectedMovie(item)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
              alt={item.title || item.name}
              className="w-full h-48 object-cover rounded"
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col items-center justify-center gap-2">
              <button
                onClick={() => setSelectedMovie(item)}
                className="bg-white text-black px-3 py-1 rounded text-sm hover:bg-gray-200"
              >
                ▶ Oynat
              </button>
              <button
                onClick={() => console.log("Favorilere eklendi:", item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
              >
                ❤️ Favori
              </button>
            </div>

            <p className="mt-2 text-sm text-center p-1">
              {item.title || item.name}
            </p>
          </div>
        ))}
      </div>

      {/* Sayfa kontrol */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
        >
          ← Geri
        </button>
        <span className="px-4 py-2">{page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-700 rounded"
        >
          İleri →
        </button>
      </div>
      <DetailCard />
    </div>
  );
}
