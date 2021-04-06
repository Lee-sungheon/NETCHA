import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Route } from "react-router-dom";
import AccountMain from "../component/AccountMain";
import ChangePassword from "../component/ChangePassword";
import ChangePhone from "../component/ChangePhone";
import ChangeNinkname from "../component/ChangeNickname";

const useStyles = makeStyles((theme) => ({
  account_page: {
    backgroundColor: "#f5f5f5",
    height: "100%",
    minHeight: "1000px",
  },
  account_box: {
    width: "90vw",
    maxWidth: "1024px",
    margin: "auto",
    paddingTop: "2vw",
  },
  account_div: {
    display: "flex",
    flexDirection: "row",
  },
  account_div_hd: {
    width: "25%",
  },
  account_div_section: {
    width: "75%",
  },
  account_div_section_div: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "1vw",
  },
  account_div_section_div2: {
    textAlign: "right",
    marginLeft: "auto",
  },
  divider: {
    marginTop: "1vw",
    marginBottom: "1vw",
  },
  membershipButton: {
    width: "60%",
    marginTop: "1vw",
    height: "40px",
  },
  profile_ul: {
    listStyle: "none",
    paddingLeft: "0",
  },
}));

export default function Account() {
  const classes = useStyles();
  window.scroll(0, 0);
  return (
    <div className={classes.account_page}>
      <div className={classes.account_box}>
        <Route exact path="/account">
          <AccountMain />
        </Route>
        <Route path="/account/changepassword">
          <ChangePassword />
        </Route>
        <Route path="/account/changephone">
          <ChangePhone />
        </Route>
        <Route path="/account/ChangeNinkname">
          <ChangeNinkname />
        </Route>
      </div>
    </div>
  );
}
