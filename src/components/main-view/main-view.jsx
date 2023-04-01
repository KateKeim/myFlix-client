import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
    return;
  }

    setLoading(true);
    fetch("https://openlibrary.org/search.json?q=the+lord+of+the+rings", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {

        setLoading(false);
        console.log('data', data);
        const MoviesFromAPI = data.map((movie) => {
          return {
            id: doc.key,
            title: doc.title,
            image: `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`,
            author: doc.author_name?.[0]
          };
        });
        setMovies(MoviesFromAPI);
      });
  }, [token]);


  if (!user) {
    return (
      <>
      <LoginView
        onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }}
      />
      or
      <SignupView />
      </>
    );
  }

  if (selectedMovie) {
    return (
      <>
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear();
      }}
      > Logout
      </button>
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
      </>
    );
  }

  if (movies.length === 0) {
    return (
      <>
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear();
      }}
      > Logout
      </button>
      <div>The list is empty!</div>
    </>
    );
  }

  return (
    loading ? (
      <p>Loading...</p>
    ) : !movies || !movies.length ? (
      <p>No movies found</p>
    ) : (
    <div>
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear();
      }}
    > Logout
    </button>
    
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  ));
}