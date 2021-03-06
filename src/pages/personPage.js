import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { fetchPersonStart } from "../redux/person/person.actions";

import PersonBiography from "../components/personBiography/PersonBiography";
import PersonCasting from "../components/personCasting/PersonCasting";
import Loader from "../components/loader/Loader";
function PersonPage({ match, fetchPersonStart, person, casting, isFetching }) {
  useEffect(() => {
    const { personId } = match.params;
    fetchPersonStart({ category: "person", id: personId });
  }, [match.params.personId, fetchPersonStart, match.params]);
  return !isFetching ? (
    <div>
      {person && (
        <Helmet>
          <title>{`${person.name} - Movie Hub`}</title>
        </Helmet>
      )}
      <PersonBiography actor={person} />
      <PersonCasting actor={person} casting={casting} />
    </div>
  ) : (
    <Loader />
  );
}
const mapStateToProps = (state) => ({
  person: state.person.person,
  casting: state.person.casting,
  isFetching: state.person.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPersonStart: (data) => dispatch(fetchPersonStart(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonPage);
