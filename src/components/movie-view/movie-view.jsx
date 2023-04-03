import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img className="w-100" src={movie.image} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director}</span>
      </div>
      <button className="back-button" onClick={onBackClick}>
        Back
      </button>
    </div>
  );
};
