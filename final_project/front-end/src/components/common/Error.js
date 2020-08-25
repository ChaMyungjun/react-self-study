import React from "react";
import { makeStyles } from "@material-ui/core";
import {Alert, AlertTitle} from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Error = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        This is an error alert — <strong>check it out!</strong>
      </Alert>
    </div>
  );
};

export default Error;
