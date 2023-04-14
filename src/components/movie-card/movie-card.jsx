//import the PropTypes library
import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <Card className="h-100" style={{ border: "none" }}>
      <Card.Img variant="top" src={movie.image} />
      <Card.Body className="h-100 d-flex flex-column">
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director}</Card.Text>
        <Link
          to={`/movies/${encodeURIComponent(movie._id)}`}
          className="mt-auto"
        >
          <Button variant="primary">Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    author: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
