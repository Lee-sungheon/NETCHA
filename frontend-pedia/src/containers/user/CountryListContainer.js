import CountryAndGenreList from "../../components/user/CountryAndGenreList";

export default function CountryListContainer() {
  return (
    <CountryAndGenreList data={country} />
  );
}

const country = [
    {
      name: '한국',
      count: 27
    },
    {
      name: '미국',
      count: 9
    },
    {
      name: '영국',
      count: 13
    },
  ];