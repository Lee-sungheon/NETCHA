import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import InputBase from "@material-ui/core/InputBase";
import { actions } from "../../state";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import './Search.scss'

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "rgba(0, 0, 0, 0)",
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 0, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    color: "white",
    width: "0ch",
    cursor: "pointer",
    "&:focus": {
      cursor: "text",
      border: "white 1px solid",
      zIndex: -1,
      width: "25ch",
      backgroundColor: 'black',
    },
  },
  inputInputValue: {
    padding: theme.spacing(1, 0, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    color: "white",
    cursor: "text",
    border: "white 1px solid",
    width: "25ch",
    zIndex: -1,
    backgroundColor: 'black',
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

export default function Search({activeValue, setActiveValue}) {
  const history = useHistory();
  const classes = useStyles();
  const text = useSelector(state => state.search.text);
  
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState(text);
  useEffect(() =>{
    if (activeValue !== 'search') {
      setSearchText('')
      dispatch(actions.trySetText(''));
    }
  }, [activeValue, dispatch])
  useEffect(()=> {
    if (text === '') {
      setSearchText('')
    }
  }, [text])
  function onChangeText(e) {
    const text = e.target.value;
    dispatch(actions.trySetText(text));
    setSearchText(text);
    history.push(`/search?q=${text}`);
    setActiveValue('search')
  }
  return(
    <>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon className="search-icon"/>
        </div>
        <InputBase
          placeholder="제목, 사람, 장르"
          value={searchText}
          classes={
            !!searchText
              ? {
                  root: classes.inputRoot,
                  input: classes.inputInputValue,
                }
              : {
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }
          }
          inputProps={{ "aria-label": "search" }}
          onChange={onChangeText}
        />
      </div>
    </>
  )
}