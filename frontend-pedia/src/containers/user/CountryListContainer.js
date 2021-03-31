import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import CountryAndGenreList from "../../components/user/CountryAndGenreList";
import { listCountries } from "../../modules/countries";

const CountryListContainer = () => {
  const userId = 99999;
  const dispatch = useDispatch();
  const { countries, error, loading } = useSelector(({ countries, loading }) => ({
    countries: countries.countries,
    error: countries.error,
    loading: loading["countries/LIST_COUNTRIES"],
  }));
  useEffect(() => {
    dispatch(listCountries({ userId }));
  }, [dispatch]);

  return (
    <CountryAndGenreList data={countries} error={error} loading={loading} />
  );
};

export default withRouter(CountryListContainer);
