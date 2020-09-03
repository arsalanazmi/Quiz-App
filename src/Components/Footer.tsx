import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-evenly",
    padding: "5% 1% 1% 1%",
    position: 'fixed',
    width: '100%',
    bottom: '0',
    [theme.breakpoints.between(0, 650)]: {
      flexDirection: 'column',
      textAlign: 'center',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '2%',
    },
  },
  heading: {
    [theme.breakpoints.between(0, 768)]: {
      fontSize: '16px',
    },
  },
  follow: {
    [theme.breakpoints.between(650,768)]: {
      position: 'relative',
      bottom: '20%',
    },
  },
  anchorTag: {
    color: 'black',
    textDecoration: "none",
    "&:hover": {
      color: "white",
    },
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.heading}>
        Copyright &copy; 2020
      </Typography>
      <Typography variant="h6" className={classes.heading}>
        <span className={classes.follow}>
          Follow on: {" "}
          <a
            className={classes.anchorTag}
            href="https://github.com/arsalanazmi/Quiz-App.git"
            >
            Github {" "}
            <GitHubIcon />
          </a>
        </span>
      </Typography>
      <Typography variant="h6" className={classes.heading}>
        Powered By: Arsalan Raza Azmi
      </Typography>
    </div>
  );
};

export default Footer;