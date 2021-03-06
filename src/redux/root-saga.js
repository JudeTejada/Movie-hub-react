import { all, call } from "redux-saga/effects";

import { moviesSaga } from "./movies/movies.saga";
import { searchSaga } from "./search/search.sagas";
import { movieSaga } from "./movie/movie.saga";
import { personSaga } from "./person/person.saga";
import { genreSaga } from "./genre/genre.saga";
import { discoverSaga } from "./discover/discover.saga";
import { filterSaga } from "./filter/filter.saga";

export default function* rootSaga() {
  yield all([
    call(moviesSaga),
    call(searchSaga),
    call(movieSaga),
    call(personSaga),
    call(genreSaga),
    call(discoverSaga),
    call(filterSaga),
  ]);
}
