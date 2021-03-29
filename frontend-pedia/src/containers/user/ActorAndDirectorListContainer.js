import ActorAndDirectorList from "../../components/user/ActorAndDirectorList";

export default function ActorAndDirectorListContainer() {
  return (
    <ActorAndDirectorList data={actors} />
  );
}

const actors = [
  {
    id: 1,
    name: '임시완',
  },
  {
    id: 2,
    name: '박규영',
  },
  {
    id: 3,
    name: '이도현',
  },
  {
    id: 4,
    name: '한예리',
  },
  {
    id: 5,
    name: '신세경',
  },
  {
    id: 6,
    name: '수지',
  },
  {
    id: 7,
    name: '송강',
  },
  {
    id: 8,
    name: '천우희',
  },
  {
    id: 8,
    name: '레이첼 맥아담스',
  },
];
