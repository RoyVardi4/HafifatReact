import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import EventIconDate from '@material-ui/icons/Event';

export default function AddCourseDatePopup(props) {
  return (
    <div>
      <Dialog
        fullWidth
        open={props.open}
        onClose={props.handleClose()}
      >
        <DialogTitle align="center">Add date for {props.course.name} course</DialogTitle>
        
        <Divider />
        
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