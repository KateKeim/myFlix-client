import PropTypes from "prop-types";
import { Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { MovieCard } from "../movie-card/movie-card";
import { useEffect, useState } from "react";

export const MovieView = ({ movies, user, token, updateUser }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);
  const similarMovies = movies.filter((movie) =>
    movie.Genre === movie.Genre ? true : false
  );

  const [isFavorite, setIsFavorite] = useState(
    user.FavoriteMovies.includes(movie._id)
  );

  useEffect(() => {
    setIsFavorite(user.FavoriteMovies.includes(movie._id));
  }, [movieId]);

  const addFavorite = () => {
    fetch(
      `https://myflixck.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed");
          return false;
        }
      })
      .then((user) => {
        if (user) {
          alert("Successfully added to favorites");
          setIsFavorite(true);
          updateUser(user);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  const removeFavorite = () => {
    fetch(
      `https://myflixck.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed");
          return false;
        }
      })
      .then((user) => {
        if (user) {
          alert("Successfully deleted from favorites");
          setIsFavorite(false);
          updateUser(user);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <>
        <div className="text-light">
          <img
            className="float-start me-3 mb-2"
            src={movie.ImagePath}
            alt="Movie Cover Image"
          />
          <h2>{movie.Title}</h2>
          <p>{movie.Description}</p>
          <h5>Genre: </h5>
          <p>{movie.Genre}</p>
          <h5>Director: </h5>
          <p>{movie.Director}</p>
          <Link to={"/"}>
            <Button variant="primary">Back</Button>
          </Link>
          {isFavorite ? (
            <Button variant="danger" className="ms-2" onClick={removeFavorite}>
              Remove from favorites
            </Button>
          ) : (
            <Button variant="success" className="ms-2" onClick={addFavorite}>
              Add to favorites
            </Button>
          )}
          <h3 className="mt-3 mb-3 text-light">Similar movies:</h3>
        </div>
      {similarMovies.map((movie) => (
        <Col className="mb-4" key={movie._id} xl={2} lg={3} md={4} xs={6}>
          <MovieCard movie={movie} />
        </Col>
      ))}
    </>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      director: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired
  ),
};
