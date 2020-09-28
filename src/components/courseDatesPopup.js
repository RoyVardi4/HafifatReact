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

  const sortedDates = () => {
    return props.course.dates.sort((d1, d2) => {
      const [day1, month1, year1] = d1.split('.')
      const [day2, month2, year2] = d2.split('.')
      return new Date(year1, month1, day1) - new Date(year2, month2, day2) 
    })
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
              sortedDates().map((date) => {
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