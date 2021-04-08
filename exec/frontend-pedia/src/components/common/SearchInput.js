import React from "react";
import { InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    backgroundColor: "default",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "35ch",
    },
  },
  listbox: {
    width: 330,
    margin: 0,
    padding: 0,
    zIndex: 1,
    position: "absolute",
    listStyle: "none",
    backgroundColor: theme.palette.background.paper,
    color: "black",
    maxHeight: 200,
    border: "1px solid #e6e6e6",
    '& li[data-focus="true"]': {
      backgroundColor: "#e6e6e6",
      cursor: "pointer",
    },
    borderRadius: "4px",
    "& li:active": {
      backgroundColor: "#e6e6e6",
    },
    // overflow: "auto",
    overflow: "hidden", // UI를 위해 스크롤 금지 했지만 고민해보고 결정~~!!
  },
  searchIcon: {
    width: "20px",
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#e6e6e6",
  },
  movieli: {
    height: 40,
    lineHeight: "23px",
    fontSize: "14px",
    padding: "7px 0 0 10px",
    caretColor: "rgb(53, 53, 53)",
  },
}));

const SearchInput = ({ keyword, movies, onChange, onKeyPress,onBlur, error }) => {
  // console.log('movies_title: ' + movies);

  const classes = useStyles();

  return (
    <>
      <div>
        <div className={classes.searchIcon}>
          <SearchIcon color="action" />
        </div>
        <InputBase
          placeholder="작품의 제목, 배우, 감독을 검색해보세요."
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          value={keyword.keyword}
          inputProps={{ "aria-label": "search" }}
          onKeyPress={onKeyPress}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
      {!error && movies && movies.length > 0 ? (
        <ul className={classes.listbox}>
          {movies.map((movieTitle, index) => (
            <li className={classes.movieli} key={index}>
              {movieTitle}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};

export default SearchInput;
