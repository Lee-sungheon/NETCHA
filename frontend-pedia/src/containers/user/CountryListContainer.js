import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import CountryAndGenreList from "../../components/user/CountryAndGenreList";
import { listCountries } from "../../modules/countries";

const CountryListContainer = () => {
  const dispatch = useDispatch();
  const { userId, countries, error, loading } = useSelector(({ user, countries, loading }) => ({
    userId: user.user.userId,
    countries: countries.countries,
    error: countries.error,
    loading: loading["countries/LIST_COUNTRIES"],
  }));
  useEffect(() => {
    dispatch(listCountries({ userId }));
  }, [dispatch, userId]);

  return (
    <CountryAndGenreList data={countries} error={error} loading={loading} />
  );
};

export default withRouter(CountryListContainer);
