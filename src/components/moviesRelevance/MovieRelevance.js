import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchMoviesStart } from "../../redux/movies/movies.actions";

import MovieList from "../movieList/movieList";
import Loader from "../loader/Loader";
import CustomButton from "../button/button";

function MovieRelevance({
  initMovies,
  fetchMoviesStart,
  isFetching,
  movieRelevance,
  filterBy,
}) {
  const queryDiscover = "/discover/movie?";
  useEffect(() => {
    const { query } = filterBy;
    console.log(filterBy);
    fetchMoviesStart(`${queryDiscover}${query}`);
  }, [movieRelevance, fetchMoviesStart, filterBy.query, filterBy]);

  const loadMore = () => {};

  return !initMovies ? (
    <Loader />
  ) : (
    <>
      <MovieList movies={initMovies} />
      <CustomButton onClick={loadMore} loadMorebutton>
        {!isFetching ? "Load More Movies" : "Loading..."}
      </CustomButton>
    </>
  );
}

const mapStateToProps = (state) => ({
  initMovies: state.movies.initMovies,
  isFetching: state.movies.isFetching,
  movieRelevance: state.movies.movieRelevance,
  filterBy: state.filter,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMoviesStart: (option) => dispatch(fetchMoviesStart(option)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieRelevance);
