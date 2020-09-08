import React, { useState, useEffect } from 'react'

import CourseList from './CourseList'

import { makeStyles } from '@material-ui/core/styles';
import 'date-fns';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

  const useStyles = makeStyles((theme) => ({
        loading: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: "100px",
            paddingBottom: "1000px"
        },
    }))

export default function Courses() {
  const classes = useStyles();

  const [courseName, setCourseName] = useState("")
  const [courseDate, setCourseDate] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [courseList, setCourseList] = useState([])

    useEffect(() => {
        fetch("https://api.mocki.io/v1/07bc5d06")
                .then(res => res.json())
                .then(data => setCourseList(data))
                .finally(() => setIsLoading(false))
    }, [])

  const handleDateChange = (date) => {
    setCourseDate(date);
  };

  return (
      <div>
          {
              isLoading 
              ?
              <Grid className={classes.loading}>
                 <CircularProgress />
              </Grid>
              :
              <div>
                <Grid container
                        direction="row"
                        justify="center"
                        alignItems="center"
                >
                    <Grid style={{marginRight:"21px"}} item xs={5} md={2}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                
                                variant="dialog"
                                format="dd/MM/yyyy"
                                id="date-picker-dialog"
                                label="Course Date"
                                value={courseDate}
                                onChange={handleDateChange}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={5} md={2}>
                        <TextField
                            id="courseName" 
                            label="Course Name"
                            type="text"
                            value={courseName}
                            onChange={e => setCourseName(e.target.value)}
                            name="courseName" 
                        />
                    </Grid>
                </Grid>
                <Grid container
                        direction="row"
                        justify="center"
                        alignItems="center">
                    <CourseList 
                        courseList={Array.from(courseList)}
                        filterCourseName={courseName}
                        filterCourseDate={courseDate}
                    />
                    
                </Grid>
            </div>
          }
     </div>     
  );
}

