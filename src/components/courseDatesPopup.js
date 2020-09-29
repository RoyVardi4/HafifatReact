import React from 'react';
import { useMyCartUpdate } from '../Context/myCartContext'
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

export default function CourseDatesPopup(props) {

  const updateMyShoppingCart = useMyCartUpdate()

  const closeDialog = props.handleClose()

  const addCourseToCart = (event, date) => {
    event.stopPropagation()
    const course = {
      name: props.course.name,
      selectedDate: date
    }

    // Update global context
    updateMyShoppingCart(course)    

    // Close with "check" flag
    closeDialog(true)
    
  }
  
  const cancelAndExit = (event) => {
    // Close with "check" flag
    closeDialog(false)
    event.stopPropagation()
  }

  return (
    <div>
      <Dialog
        fullWidth
        open={props.open}
        onClose={cancelAndExit}
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
              props.sortedDates.map((date) => {
                return <ListItem key={date} button onClick={(event) => addCourseToCart(event, date)}>
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
          <Button variant="outlined" onClick={cancelAndExit} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}