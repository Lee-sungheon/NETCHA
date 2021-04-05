import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  button: {
    fontSize: '16px',
    fontWeight: 700,
    float: 'right',
    marginTop: 8,
  },
}));

const SeeMoreButton = ({ link }) => {
  const classes = useStyles();

  return (
    <>
      <Link to={link}>
        <Button color="secondary" className={classes.button}>
          더보기
        </Button>
      </Link>
    </>
  );
};

export default SeeMoreButton;
