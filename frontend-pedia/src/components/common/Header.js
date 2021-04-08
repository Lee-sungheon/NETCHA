import React from "react";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import netchapediaImg from "../../images/netchapedia.png";
import SearchInputContainer from "../../containers/movies/SearchInputContainer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    height: "62px",
    backgroundColor: "white",
    position: "fixed",
    zIndex: 50,
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
}));

const Header = ({ user, onLogin }) => {
  const classes = useStyles();

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
            <SearchInputContainer />
          </div>
          {user && (
            <Button style={{ margin: "0px 24px 0px 24px", color: "#6A6A6A", width: "180px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {user.username}님, 환영합니다!
            </Button>
          )}
          {user ? (
            <Link to={`/user/${user.userId}`}>
              <img
                src="/images/profileIcon.jpg"
                className="profileIconImg"
                alt="마이페이지"
                title="마이페이지"
                style={{
                  width: "28px",
                  borderRadius: "60%",
                  border: "1px solid #e6e6e6",
                }}
              />
            </Link>
          ) : (
            <img
              src="/images/profileIcon.jpg"
              className="profileIconImg"
              alt="검색"
              style={{
                width: "28px",
                borderRadius: "60%",
                border: "1px solid #e6e6e6",
              }}
            />
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
