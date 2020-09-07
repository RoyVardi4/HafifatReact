import React, { useState } from 'react'

import CourseList from './CourseList'

import 'date-fns';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

export default function Courses() {

  const [courseName, setCourseName] = useState("")
  const [courseDate, setCourseDate] = useState(new Date())

  const handleDateChange = (date) => {
    setCourseDate(date);
  };

  return (
      <div>
          <Grid container
                direction="row"
                justify="center"
                alignItems="center"
          >

                <Grid item xs={12} md={3}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        id="date-picker-inline"
                        label="Course Date"
                        value={courseDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField
                         id="courseName" 
                         label="Course Name"
                         type="text"
                         value={courseName}
                         onChange={e => setCourseName(e.target.value)}
                         name="courseName" 
                    />
                </Grid>
                <Grid item xs={12} md={1}>
                    <Button 
                        style={{marginLeft: "16px"}}
                        variant="contained"
                        color="primary"
                        size="large"
                        endIcon={<AddIcon />}
                    >
                        Add
                    </Button>
                </Grid>
          </Grid>
          <br/>
          <Grid container
                direction="row"
                justify="center"
                alignItems="center">
            <CourseList filterCourseName={courseName} courseDate={courseDate}/>
          </Grid>
     </div>     
  );
}

