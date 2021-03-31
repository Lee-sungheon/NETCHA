import CountryAndGenreList from "../../components/user/CountryAndGenreList";

export default function CountryListContainer() {
  return (
    <CountryAndGenreList data={country} />
  );
}

const country = [
    {
      id: 1,
      name: '한국',
      count: 27
    },
    {
      id: 2,
      name: '미국',
      count: 9
    },
    {
      id: 3,
      name: '영국',
      count: 13
    },
  ];