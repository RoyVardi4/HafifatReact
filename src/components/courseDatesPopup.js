import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EventIconDate from '@material-ui/icons/Event';

export default function AlertDialog(props) {
  return (
    <div>
      <Dialog
        fullWidth
        open={props.open}
        onClose={props.handleClose()}
      >
        <DialogTitle align="center">Choose date for {props.course.name} course</DialogTitle>
        <Divider />
        <DialogContent>
          <List
            component="nav"
            subheader={
              <ListSubheader component="div" >
                 All available dates:
              </ListSubheader>
            }
          >
            {
              props.course.dates.map((date) => {
                return <ListItem button onClick={props.handleClose()}>
                          <ListItemIcon>
                            <EventIconDate />
                          </ListItemIcon>
                          <ListItemText primary={date}/>
                        </ListItem>
              })
            }
          </List>
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