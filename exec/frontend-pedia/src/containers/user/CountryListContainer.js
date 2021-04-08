import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import CountryList from '../../components/user/CountryList';
import { listCountries } from '../../modules/countries';
import Loader from '../../components/common/Loader';

const CountryListContainer = ({ userId }) => {
  const dispatch = useDispatch();
  const { countries, error, loading } = useSelector(
    ({ countries, loading }) => ({
      countries: countries.countries,
      error: countries.error,
      loading: loading['countries/LIST_COUNTRIES'],
    })
  );
  useEffect(() => {
    dispatch(listCountries({ userId }));
  }, [dispatch, userId]);

  if (loading)
    return <Loader type="spin" color="#ff0073" message="LOADING..." />;

  return <CountryList data={countries} error={error} loading={loading} />;
};

export default withRouter(CountryListContainer);
