import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Search from "../component/search/Search";
import "./Header.scss";
import axios from "axios";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  Brightness4Icon: {
    cursor: "pointer",
    padding: theme.spacing(0, 1),
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

const StyledMenu = withStyles({
  paper: {
    backgroundColor: "black",
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    backgroundColor: "black",
    color: "white",
    height: "30px",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}))(MenuItem);

export default function Header({ toggleButton, setToggleButton }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeValue, setActiveValue] = useState("홈");
  const history = useHistory();
  const isHeader_ = useSelector((state) => state.search.isHeader);
  const { nickname, token } = useSelector((state) => ({
    nickname: state.user.userData.member.nickname,
    token: state.user.userData.token,
  }));
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClick = () => {
    setToggleButton(!toggleButton);
  };

  function handleChange(event) {
    setActiveValue(event.target.innerText);
  }

  useEffect(() => {
    const header = document.getElementById("header");
    function myFunction() {
      if (header){
        if (window.pageYOffset > 0) {
          if (!toggleButton) {
            header.style.backgroundColor = "black";
          } else {
            header.style.backgroundColor = "white";
          }
        } else {
          if (toggleButton) {
            header.style.backgroundColor = "rgba(255, 255, 255, 1)";
          } else {
            header.style.backgroundColor = "rgba(255, 255, 255, 0)";
          }
        }
      }
    }
    myFunction();
    window.onscroll = function () {
      myFunction();
    };
    const nowUrl = window.location.href.split("/");
    const nowLocation = nowUrl[nowUrl.length - 1];
    if (nowLocation === "eval") {
      setActiveValue("평가하기");
    } else if (nowLocation === "mylike" || nowLocation === "myLike") {
      setActiveValue("내가 찜한 콘텐츠");
    } else if (nowLocation === "home") {
      setActiveValue("홈");
    } else {
      setActiveValue("");
    }
  }, [toggleButton, isHeader_]);

  const logout = () => {
    window.sessionStorage.removeItem("persist:root");
    window.sessionStorage.removeItem("userId");
    window.sessionStorage.removeItem("token");
    axios.get("netcha/user/logout").then((res) => {
      window.location.href = "/login";
    });
  };
  const goAccount = () => {
    setAnchorEl(null);
    history.push({
      pathname: "/account",
    });
  };

  return (
    <>
      {isHeader_ && (
        <div className="root">
          <AppBar
            position="fixed"
            className="root"
            id="header"
            style={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
          >
            <Toolbar>
              <Link to={"/home"}>
                <img
                  src={"../images/netcha.png"}
                  style={{ height: "52px", marginRight: "10px" }}
                  alt="netcha"
                  onClick={() => setActiveValue("홈")}
                />
              </Link>
              <div>
                <Link to={"/home"}>
                  <Typography
                    className="menu"
                    variant="subtitle2"
                    noWrap
                    style={activeValue === "홈" ? { fontWeight: "bold" } : {}}
                    onClick={handleChange}
                  >
                    홈
                  </Typography>
                </Link>
              </div>
              <div>
                <Link to={"/mylike"}>
                  <Typography
                    className="menu"
                    variant="subtitle2"
                    noWrap
                    style={
                      activeValue === "내가 찜한 콘텐츠"
                        ? { fontWeight: "bold" }
                        : {}
                    }
                    onClick={handleChange}
                  >
                    내가 찜한 콘텐츠
                  </Typography>
                </Link>
              </div>
              <div>
                <Link to={"/eval"}>
                  <Typography
                    className="menu"
                    variant="subtitle2"
                    noWrap
                    style={
                      activeValue === "평가하기" ? { fontWeight: "bold" } : {}
                    }
                    onClick={handleChange}
                  >
                    평가하기
                  </Typography>
                </Link>
              </div>

              <Typography
                className="title"
                variant="subtitle2"
                noWrap
              ></Typography>
              <a
                href={`https://netcha-pedia.netlify.app/${token}`}
                target="blank"
              >
                <img
                  src={
                    toggleButton
                      ? "../images/netchapediaTrans.png"
                      : "../images/netchapediaTrans_2.png"
                  }
                  style={{ height: "35px", marginLeft: "20px" }}
                  alt="netcha"
                  onClick={() => setActiveValue("홈")}
                />
              </a>
              <Search
                activeValue={activeValue}
                setActiveValue={setActiveValue}
              />

              <div className={classes.Brightness4Icon}>
                <Brightness4Icon className="ld-button" onClick={onClick} />
              </div>
              <div className={classes.Brightness4Icon}>
                <Avatar
                  alt="Travis Howard"
                  className={classes.small}
                  src="https://occ-0-4807-395.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABZAl_RHxQaFudkiao5vPLVFhEyGG1QqTCFxjdy4hEOrxzY9GGUa2IoZyznfP4TitB2zLMNPgY_RK74GZJufj7ek.png?r=a41"
                />
                {window.sessionStorage.token ? (
                  <Typography className="title" variant="subtitle2" noWrap>
                    {nickname} 님
                  </Typography>
                ) : null}
                <IconButton
                  aria-controls="customized-menu"
                  aria-haspopup="true"
                  variant="contained"
                  color="inherit"
                  onClick={handleClick}
                  style={{ paddingLeft: "0px" }}
                >
                  <ArrowDropDownIcon className="arrow-icon" />
                </IconButton>
                <StyledMenu
                  id="customized-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <StyledMenuItem>
                    <span
                      style={{
                        color: "white",
                      }}
                      onClick={goAccount}
                    >
                      <ListItemText primary="계정" />
                    </span>
                  </StyledMenuItem>
                  <StyledMenuItem>
                    <span
                      style={{
                        color: "white",
                      }}
                      onClick={logout}
                    >
                      <ListItemText primary="로그아웃" />
                    </span>
                  </StyledMenuItem>
                </StyledMenu>
              </div>
            </Toolbar>
          </AppBar>
        </div>
      )}
    </>
  );
}
