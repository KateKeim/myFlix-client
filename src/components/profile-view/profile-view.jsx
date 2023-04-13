import { useState } from "react";
import { Card, Col, Form, Button } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({
  user,
  token,
  movies,
  onLoggedOut,
  updateUser,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  let favoriteMovies = movies.filter((movies) =>
    user.FavoriteMovies.includes(movies._id)
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username,
      password,
      email,
      birthday,
      favoriteMovies,
    };

    fetch(`https://myflixck.herokuapp.com/users/${user.username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Changing userdata failed");
          return false;
        }
      })
      .then((user) => {
        if (user) {
          alert("Successfully changed userdata");
          updateUser(user);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  const deleteAccount = () => {
    console.log("doin");
    fetch(`https://myflixck.herokuapp.com/users/${user.username}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.ok) {
          alert("Your account has been deleted. Good Bye!");
          onLoggedOut();
        } else {
          alert("Could not delete account");
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <>
      <Col md={6}>
        <Card className="mt-2 mb-3">
          <Card.Body>
            <Card.Title>Your info</Card.Title>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>My Movie List: {user.favoriteMovies}</p>
          </Card.Body>
        </Card>
        <Button
          variant="danger"
          onClick={() => {
            if (confirm("Are you sure?")) {
              deleteAccount();
            }
          }}
        >
          Delete user account
        </Button>
      </Col>
      <Col md={6}>
        <Card className="mt-2 mb-3">
          <Card.Body>
            <Card.Title>Update your info</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength="5"
                  className="bg-light"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength="8"
                  className="bg-light"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-light"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  required
                  className="bg-light"
                />
              </Form.Group>
              <Button className="mt-3" variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Col md={12}>
        <h3 className="mt-3 mb-3 text-light">Your favorite movies:</h3>
      </Col>
      {favoriteMovies.map((movies) => (
        <Col className="mb-4" key={movies._id} x1={2} lg={3} md={4} xs={6}>
          <MovieCard movie={movies} />
        </Col>
      ))}
    </>
  );
};
