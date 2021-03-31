import CountryAndGenreList from "../../components/user/CountryAndGenreList";

export default function GenreListContainer() {
  return (
    <CountryAndGenreList data={genre} />
  );
}

const genre = [
  {
    id: 1,
    name: '드라마',
    count: 25
  },
  {
    id: 2,
    name: '액션',
    count: 9
  },
  {
    id: 3,
    name: '코미디',
    count: 13
  },
];

