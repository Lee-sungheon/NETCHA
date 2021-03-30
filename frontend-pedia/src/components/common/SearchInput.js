import React from "react";
import useAutocomplete from "@material-ui/lab/useAutocomplete";
// import { useSelector, useDispatch } from "react-redux";
// import { actions } from "./SearchMovie/state";
// import { actions as userActions } from "../../user/state";
// import { useHistory } from "react-router-dom";
import { InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from "react-router";

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
  input: {
    width: 300,
    height: 50,
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
    "& li:active": {
      backgroundColor: "#e6e6e6",
    },
    // overflow: "auto",
    overflow: "hidden", // UI를 위해 스크롤 금지 했지만 고민해보고 결정~~!!
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "action",
  },
  movieli: {
    height: 40,
    lineHeight: "23px",
    fontSize: "14px",
    padding: "7px 0 0",
    caretColor: "rgb(53, 53, 53)",
  },
}));

const SearchInput = ({ movies, keyword, onChange, onKeyPress }) => {
  const classes = useStyles();
  const history = useHistory();
  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    options: { movies }.movies,
    getOptionLabel: (option) => option,
  });

  const onSubmit = () => {
    // alert('유저 아이디 넣어보자');
    // set 뭐시기?  
    const searchKeyword = '안녕';
    history.push(`/searchMovie/${searchKeyword}`);
  };

  return (
    <>
      <div {...getRootProps()}>
        <div className={classes.searchIcon}>
          <SearchIcon color="action" />
        </div>
        <InputBase
          placeholder="작품의 제목, 배우, 감독을 검색해보세요."
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          {...getInputProps()}
          inputProps={{ "aria-label": "search" }}
          onKeyPress={onKeyPress}
          onChange={onChange}
        />
        {/* <input className={classes.input} {...getInputProps()} /> */}
      </div>
      {groupedOptions.length > 0 ? (
        <ul className={classes.listbox} {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li
              className={classes.movieli}
              {...getOptionProps({ option, index })}
            >
              {option}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};

export default SearchInput;
