import React, { useEffect, useState } from "react";

import { fetchSingleMovie, fetchCast } from "../api/tmbdb";
import {
  MovieWrapper,
  MovieImage,
  MovieDetails,
  MovieTitle,
  MovieSubTitle,
  MovieRating,
  Text,
  Button,
} from "../styles/Movie";

export default function Movie(props) {
  const { id } = props.match.params;
  const [movie, setMovie] = useState("");
  const [cast, setCast] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      const movieData = await fetchSingleMovie(id);
      const castData = await fetchCast(id);

      setMovie(movieData);
      setCast(castData);
      setLoading(false);
    };

    fetchMovie();
  }, [id]);
  if (loading) {
    return <h1>Loading</h1>;
  }
  const {
    release_date,
    poster_path,
    title,
    genres,
    backdrop_path,
    vote_average,
    overview,
    homepage,
    runtime,
    budget,
  } = movie;

  const genresSplit = genres.map((genre) => (
    <li key={genre.id}>{genre.name}</li>
  ));

  return (
    <MovieWrapper>
      <MovieImage
        imageSrc={`https://image.tmdb.org/t/p/w300/${poster_path}`}
        imageTitle={title}
      />
      <MovieDetails>
        <MovieTitle>{title}</MovieTitle>
        <MovieRating>{vote_average} Rating</MovieRating>
        <MovieSubTitle>The Synopsis</MovieSubTitle>
        <Text>{overview}</Text>
        <div>
          <Button primary>Watch Trailer</Button>
          <Button>Website</Button>
        </div>
      </MovieDetails>
    </MovieWrapper>
  );
}
