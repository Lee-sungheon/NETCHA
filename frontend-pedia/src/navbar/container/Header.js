import React from "react";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import netchapediaImg from "../../images/netchapedia.png";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    height: "62px",
    backgroundColor: "#ffffff",
  },
  title: {
    flexGrow: 5,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade("#9e9e9e", 0.15),
    "&:hover": {
      backgroundColor: fade("#9e9e9e", 0.25),
    },
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
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
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
}));

export default function Header() {
  function goToUser(e) {
    e.preventDefault();
    const id = 1;
    history.push(`/user/${id}`);
  }

  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar
        className={classes.root}
        style={{ boxShadow: "rgb(0 0 0 / 8%) 0px 1px 0px 0px" }}
        position="static"
      >
        <Toolbar>
          <Link to={"/"}>
            <img
              src={netchapediaImg}
              style={{
                height: "52px",
                marginRight: "10px",
                marginLeft: "60px",
              }}
              alt="netchapedia"
              // onClick={() => setActiveValue("홈")}
            />
          </Link>
          <div className={classes.title}></div>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon color="action" />
            </div>
            <InputBase
              placeholder="작품의 제목, 배우, 감독을 검색해보세요."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <Button
            color="action"
            style={{ margin: "0px 24px 0px 24px", color: "grey" }}
          >
            평가하기
          </Button>
          <a href="#" onClick={goToUser}>
            <img
              src="/images/profileIcon.jpg"
              className="profileIconImg"
              style={{
                width: "28px",
                borderRadius: "60%",
                border: "1px solid #e6e6e6",
              }}
            />
          </a>
        </Toolbar>
      </AppBar>
    </div>
  );
}
