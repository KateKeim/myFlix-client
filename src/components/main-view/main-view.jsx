import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Be With Me",
      image:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.7ZWCBNG5LlJzjbu1thb6VQHaKe%26pid%3DApi&f=1&ipt=b1c0bd3765207bfd9f610a061f3ffd3ab07a579380fbafdff6db5f4876a86136&ipo=images",
      director: "Eric Khoo"
    },
    {
      id: 2,
      title: "Shutter",
      image:
        "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.fanboynewsnetwork.com%2Fwp-content%2Fuploads%2F2013%2F10%2Fshutter2d.jpg&f=1&nofb=1&ipt=4edd735a5862e8f67ca4b1ad1ec35dae54bf543eab06b936cc812b1e8bc1a6de&ipo=images",
      director: "Banjong Pisanthanakun"
    },
    {
      id: 3,
      title: "Inception",
      image:
        "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F1.bp.blogspot.com%2F_o31CLSHm6KA%2FS-UResGfUxI%2FAAAAAAAAADs%2FyqUC5Tt0Hz0%2Fs1600%2FInception-Movie.jpg&f=1&nofb=1&ipt=f3816757a96bb57465ac8f3e2be515fb789ce344f404ae6e86ebe5a5b463c663&ipo=images",
      director: "Christopher Nolan"
    },
    {
      id: 4,
      title: "Mad Max: Fury Road",
      image:
        "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.dvdsreleasedates.com%2Fposters%2F800%2FM%2FMad-Max-Fury-Road-2015-movie-poster.jpg&f=1&nofb=1&ipt=fbe3bb6382eca2071c0edf3e5d4fe05d0f90be97abcc8baf570edfc73a3fac62&ipo=images",
      director: "George Miller"
    },
    {
      id: 5,
      title: "Interstellar",
      image:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpics.filmaffinity.com%2FInterstellar-366875261-large.jpg&f=1&nofb=1&ipt=f1d41a247d8da874b4c44be2118a92756315346cfeaa06403cb6e8035ab488b9&ipo=images",
      director: "Christopher Nolan"
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
