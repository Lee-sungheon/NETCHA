import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import useAutocomplete from '@material-ui/lab/useAutocomplete';
// import { useSelector, useDispatch } from "react-redux";
// import { actions } from "./SearchMovie/state";
// import { actions as userActions } from "../../user/state";
// import { useHistory } from "react-router-dom";
import { InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
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
  label: {
    display: "block",
  },
  input: {
    width: 200,
  },
  listbox: {
    width: 200,
    margin: 0,
    padding: 0,
    zIndex: 1,
    position: "absolute",
    listStyle: "none",
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
    maxHeight: 200,
    border: "1px solid rgba(0,0,0,.25)",
    '& li[data-focus="true"]': {
      backgroundColor: "#4a8df6",
      color: "white",
      cursor: "pointer",
    },
    "& li:active": {
      backgroundColor: "#2977f5",
      color: "white",
    },
  },
}));

export default function SearchInput() {
  const classes = useStyles();
  //   const keyword = useSelector((state) => state.searchMovie.keyword);
  //   const dispatch = useDispatch();
  //   function setKeyword(value) {
  //     if (value !== keyword) {
  //       dispatch(actions.setValue("keyword", value));
  //       dispatch(actions.fetchAutoComplete(value));
  //     }
  //   }

  //   //   const autoCompletes = useSelector((state) => state.search.autoCompletes);
  //   //   const history = useHistory();
  function goToUser(value) {
    // const user = autoCompletes.find((item) => item.name === value);
    // if (user) {
    //   dispatch(userActions.setValue("user", user));
    //   history.push(`/user/${user.name}`);
    // }
  }

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    options: movies,
    getOptionLabel: (option) => option,
  });

  return (
    <div style={{ width: 300 }}>
      {/* <form onSubmit="">
        <InputBase
          placeholder="작품의 제목, 배우, 감독을 검색해보세요."
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </form> */}

      {/* <Autocomplete
        // freeSolo
        // value={keyword}
        // onChange={setKeyword}
        onSelect={goToUser}
        style={{ width: "100%" }}
        options={movies.map((item) => item)}
        // options={autoCompletes.map((item) => (item.name)}
        autoFocus
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            prefix={<SearchIcon color="action" />}
            margin="normal"
            variant="outlined"
            InputProps={{ ...params.InputProps, type: "search" }}
          />
        )}
      /> */}

      <div>
        <div {...getRootProps()}>
        {/* <InputBase
          placeholder="작품의 제목, 배우, 감독을 검색해보세요."
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        /> */}
          <input className={classes.input} {...getInputProps()} />
        </div>
        {groupedOptions.length > 0 ? (
          <ul className={classes.listbox} {...getListboxProps()}>
            {groupedOptions.map((option, index) => (
              <li {...getOptionProps({ option, index })}>{option.title}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

const movies = [
  "고질라 VS. 콩",
  "극장판 귀멸의 칼날 무한열차편",
  "자산어보",
  "미나리",
  "최면",
  "파이터",
  "디 아더 사이드",
  "국카스텐 콘서트 실황 : 해프닝",
  "더 박스",
  "스파이의 아내",
];
