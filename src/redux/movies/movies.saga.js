import { takeLatest, call, put, all, delay } from "redux-saga/effects";

import {
  fetchMoviesSuccess,
  fetchMoviesFailure,
  loadMoreMovieFinish,
  loadMoreMovieFailure,
  hasMoreMovies,
} from "./movies.actions";

import moviesActionTypes from "./movies.types";

import { fetchRequest } from "../../api/tmbdb";

export function* fetchMoviesAsync({ payload }) {
  try {
    const mainMovies = yield call(fetchRequest, `${payload}`, 1);

    yield delay(1200);

    yield put(fetchMoviesSuccess(mainMovies.results));
  } catch (error) {
    yield put(fetchMoviesFailure(error));
  }
}

export function* loadMoreMovies({ payload }) {
  const { query, page } = payload;
  try {
    const movies = yield call(fetchRequest, query, page);
    if (page === movies.total_pages) yield put(hasMoreMovies(false));
    yield put(loadMoreMovieFinish(movies.results));
  } catch (err) {
    yield put(loadMoreMovieFailure(err));
  }
}

export function* fetchMoviesStart() {
  yield takeLatest(moviesActionTypes.FETCH_MOVIES_START, fetchMoviesAsync);
}

export function* onLoadMoreMovies() {
  yield takeLatest(moviesActionTypes.LOAD_MORE_MOVIES_START, loadMoreMovies);
}

export function* moviesSaga() {
  yield all([call(fetchMoviesStart), call(onLoadMoreMovies)]);
}
