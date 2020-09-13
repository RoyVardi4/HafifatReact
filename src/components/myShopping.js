import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({

}));

export default function ShoppingCart(props) {
  const classes = useStyles();

  return (
    <div >
        <Dialog
        fullWidth
        open={props.open}
        onClose={props.handleClose()}
      >
        <DialogTitle align="center">My Shopping list</DialogTitle>

        <DialogContent>
          
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
