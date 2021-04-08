import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import StarIcon from "@material-ui/icons/Star";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PropTypes from "prop-types";
import {
  callApiRequestEvaluation,
  callApiDeleteEvaluation,
  callApiRequestZzim,
  callApiDeleteZzim,
} from "../../common/api";
import { useSelector } from "react-redux";

MovieItem.propTypes = {
  tile: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "& > * + *": {
      marginTop: theme.spacing(1),
    },
  },
  itemBox: {
    position: "relative",
    height: "inherit",
    boxSizing: "border-box",
    "&:hover": {
      border: "white 1px solid",
    },
  },
  customOverlay: {
    width: "100%",
    height: "auto",
    position: "absolute",
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
  },
  title: {
    padding: theme.spacing(2, 0, 1, 1),
    flexGrow: 1,
    display: "flex",
    alignItems: "start",
    justifyContent: "center",
    color: "white",
  },
  rating: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
  },
  likeBox: {
    borderTop: "0.5px solid gray",
    paddingTop: theme.spacing(2),
    margin: theme.spacing(2, 2),
    display: "flex",
    justifyContent: "center",
    color: "white",
    cursor: "pointer",
  },
}));

let tmpScore = 7;
export default function MovieItem({ tile, pickNum, setPickNum, idx }) {
  const customClasses = useStyles();
  const user = useSelector((state) => state.user.userData.member);
  const [isFinish, setIsFinish] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [score, setScore] = useState(null);
  const [isZzim, setIsZzim] = useState(tile.userDidZzim);
  function setHover() {
    if (isFinish) {
      setIsHover(true);
    } else {
      setIsHover(false);
      setScore(0);
    }
  }
  function onChange(e, v) {
    if (v > 0) {
      tmpScore = v;
    }
  }
  function onClick(e) {
    if (e.target.name !== `size-large-${idx}`) {
      if (tmpScore === score && isFinish) {
        callApiDeleteEvaluation(user.seq, tile.no);
        setPickNum(pickNum - 1);
        setIsFinish(false);
        return;
      }
      if (!isFinish) {
        setIsFinish(true);
        setPickNum(pickNum + 1);
      }
      setScore(tmpScore);
      callApiRequestEvaluation(user.seq, tile.no, tmpScore);
    }
  }
  function toggleZzim() {
    if (!isZzim) {
      callApiRequestZzim(user.seq, tile.no);
      setIsZzim(!isZzim);
    } else {
      callApiDeleteZzim(user.seq, tile.no);
      setIsZzim(!isZzim);
    }
  }
  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={setHover}
      className={customClasses.itemBox}
    >
      <img
        src={tile.posterUrl}
        alt={tile.title}
        style={{ width: "100%", height: "inherit", maxHeight: "50vh" }}
      />
      <div
        className={customClasses.customOverlay}
        style={isHover ? { visibility: "visible" } : { visibility: "hidden" }}
      >
        <Typography variant="subtitle1" className={customClasses.title}>
          {tile.title}
        </Typography>
        <div className={customClasses.rating} onClick={onClick}>
          <Rating
            name={`size-large-${idx}`}
            size="large"
            precision={0.5}
            onChangeActive={onChange}
            value={score}
            emptyIcon={
              <StarIcon
                fontSize="large"
                style={{ color: "rgba(255, 255, 255, 0.2)" }}
              />
            }
            icon={<StarIcon fontSize="large" />}
          />
        </div>
        {isZzim ? (
          <div className={customClasses.likeBox} onClick={toggleZzim}>
            <FavoriteIcon
              style={{
                margin: "0 2px 4px 2px",
                color: "red",
                cursor: "pointer",
              }}
            />
            <Typography variant="subtitle2">찜한 영화</Typography>
          </div>
        ) : (
          <div className={customClasses.likeBox} onClick={toggleZzim}>
            <FavoriteBorderIcon
              style={{ margin: "0 2px 4px 2px", color: "red" }}
            />
            <Typography variant="subtitle2">찜하기</Typography>
          </div>
        )}
      </div>
    </div>
  );
}
