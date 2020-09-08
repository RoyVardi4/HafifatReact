import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import {TextField} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    textField: {
        margin: theme.spacing(1)
    },
    form: {
        align: "center"
    }
}));

export default function AlertDialog(props) {
  const classes = useStyles()

  return (
    <div>
      <Dialog
        
        open={props.open}
        onClose={props.handleClose()}
      >
        <DialogTitle align="center">
            <h4>Create a new Course</h4>
        </DialogTitle>

        <DialogContent>
        <FormControl className={classes.form}>
            <TextField className={classes.textField} required label="Course Name" variant="outlined" />
            <TextField className={classes.textField} required label="Gmush Hours" variant="outlined" />
            <TextField className={classes.textField} required label="Dates" variant="outlined" />
        </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={props.handleClose()} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}