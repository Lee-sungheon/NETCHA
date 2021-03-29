import CountryAndGenreList from "../../components/user/CountryAndGenreList";

export default function GenreListContainer() {
  return (
    <CountryAndGenreList data={genre} />
  );
}

const genre = [
  {
    name: '드라마',
    count: 25
  },
  {
    name: '액션',
    count: 9
  },
  {
    name: '코미디',
    count: 13
  },
];

