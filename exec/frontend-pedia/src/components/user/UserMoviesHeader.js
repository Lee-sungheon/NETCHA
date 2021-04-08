import SeeMoreButton from "../common/SeeMoreButton";

const UserRatingMoviesHeader = ({ count, title, link }) => {
  return (
    <>
      <h3 style={{ display: "inline-block" }}>{title}</h3>&nbsp;&nbsp;{count}
      <SeeMoreButton link={link} />
    </>
  );
};

export default UserRatingMoviesHeader;