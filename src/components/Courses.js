import React, { useState, useEffect } from 'react'

import CourseList from './CourseList'

import { makeStyles } from '@material-ui/core/styles';
import 'date-fns';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
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

