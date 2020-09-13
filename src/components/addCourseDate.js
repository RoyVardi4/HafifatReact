import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

export default function AddCourseDatePopup(props) {
  const [newDate, setNewDate] = useState(new Date())
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)

  const handleAddClick = () => {
    const [day, month, year] = [newDate.getDate(), newDate.getMonth() + 1, newDate.getFullYear()]
    const dateInFormat = `${day}.${month}.${year}`
    
    // Check if uniqe
    if(props.course.dates.find((date) => date === dateInFormat)) {
      setIsSnackbarOpen(true)
    } else {
      const close = props.handleClose(dateInFormat)
      close()
    }
  }

  return (
    <template>
      <Dialog
        fullWidth
        open={props.open}
        onClose={props.handleClose()}
      >
        <Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={() => setIsSnackbarOpen(false)}>
            <Alert onClose={() => setIsSnackbarOpen(false)} severity="error">
                You Entered date already exist
            </Alert>
        </Snackbar>

        <DialogTitle align="center">Add date for {props.course.name} course</DialogTitle>
        
        <Divider />
        
        <DialogContent>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                  variant="static"
                  format="dd/MM/yyyy"
                  id="date-picker-dialog"
                  label="Course Date"
                  value={newDate}
                  onChange={(date) => setNewDate(date)}
              />
          </MuiPickersUtilsProvider>
        </DialogContent>
        
        <DialogActions>
          <Button variant="contained" onClick={() => handleAddClick()} color="primary">
            Add
          </Button>
          <Button variant="outlined" onClick={props.handleClose()} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </template>
  );
}