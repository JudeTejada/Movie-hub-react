import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as lodash from "lodash";
import { Helmet } from "react-helmet";
import {
  fetchDiscoverStart,
  loadMoreMoviesStart,
} from "../redux/discover/discover.actions";

import { capitalizeFirstLetter } from "../util/util";

import Loader from "../components/loader/Loader";
import MovieList from "../components/movieList/movieList";
import CustomButton from "../components/button/button";
import { HeadingOne } from "../util/global.styles";

function DiscoverPage({
  match,
  fetchDiscoverStart,
  loadMoreMoviesStart,
  isFetching,
  discoverMovies,
  errorMessage,
  hasMore,
}) {
  const route = `/movie/${match.params.discoverType}`;
  const [page, setPage] = useState(1);

  const query = capitalizeFirstLetter(
    match.params.discoverType.replace(/_/g, " ")
  );

  useEffect(() => {
    fetchDiscoverStart(route);
  }, [match.params.discoverType, fetchDiscoverStart, route]);

  const loadMore = () => {
    console.log("click");
    setPage((p) => p + 1);
    loadMoreMoviesStart(route, page);
  };

  if (errorMessage) return <h1>Sorry Something Went wrong with the Page</h1>;
  if (lodash.isEmpty(discoverMovies) && isFetching) return <Loader />;
  return (
    <div>
      <Helmet>
        <title>{`${query} Movies`}</title>
      </Helmet>
      <HeadingOne>{query} Movies</HeadingOne>
      <MovieList movies={discoverMovies} />
      {hasMore && (
        <CustomButton onClick={loadMore} loadMorebutton>
          {!isFetching ? "Load More Movies" : "Loading..."}
        </CustomButton>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  isFetching: state.discover.isFetching,
  discoverMovies: state.discover.discoverMovies,
  errorMessage: state.discover.errorMessage,
  hasMore: state.discover.hasMore,
});

const mapDispatchToProps = (dispatch) => ({
  fetchDiscoverStart: (discover) => dispatch(fetchDiscoverStart(discover)),
  loadMoreMoviesStart: (query, page) =>
    dispatch(loadMoreMoviesStart(query, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverPage);
