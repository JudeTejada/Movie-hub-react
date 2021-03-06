import { takeLatest, call, put, all, delay } from "redux-saga/effects";

import searchActionTypes from "./search.types";

import { fetchMovie } from "../../api/tmbdb";

import {
  queryMovieFinish,
  queryMovieFailure,
  loadMoreMovieFinish,
  loadMoreMovieFailure,
  hasMoreMovies,
} from "./search.action";

export function* searchStart({ payload }) {
  try {
    const data = yield call(fetchMovie, payload);

    yield put(queryMovieFinish(data.results));
  } catch (err) {
    yield put(queryMovieFailure(err));
  }
}

export function* loadMoreMovies({ payload }) {
  const { query, page } = payload;
  try {
    const data = yield call(fetchMovie, query, page);

    if (page === data.total_pages) yield put(hasMoreMovies(false));
    yield delay(1000);
    yield put(loadMoreMovieFinish(data.results));
  } catch (err) {
    loadMoreMovieFailure(err);
  }
}

export function* onSearchStart() {
  yield takeLatest(searchActionTypes.QUERY_MOVIE_START, searchStart);
}

export function* onLoadMoreMovies() {
  yield takeLatest(searchActionTypes.LOAD_MORE_MOVIES_START, loadMoreMovies);
}

export function* searchSaga() {
  yield all([call(onSearchStart), call(onLoadMoreMovies)]);
}
