import React, { useState, useEffect } from 'react'

import {useMyProfile} from '../Context/myProfileContext'

import CourseList from './CourseList'
import ShopingCart from './shopingCart'
import PleaseLogin from './pleaseLogin'

import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
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

  const profile = useMyProfile()
  const [courseName, setCourseName] = useState("")
  const [courseDate, setCourseDate] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [courseList, setCourseList] = useState([])
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)

    useEffect(() => {
        if(typeof profile !== 'undefined') {
            fetch("http://localhost:5000/courses/")
                    .then(res => res.json())
                    .then(data => setCourseList(data))
                    .finally(() => setIsLoading(false))
        }
        // fetch("https://api.mocki.io/v1/07bc5d06")
        //         .then(res => res.json())
        //         .then(data => setCourseList(data))
        //         .finally(() => setIsLoading(false))
    }, [profile])

  const addCourse = (newCourse) => {
    // Clear filters
    setCourseName("")
    setCourseDate(null)
    
    // Add to list
    setCourseList(
        [
            ...courseList,
            newCourse
        ]
    )
    setIsSnackbarOpen(true)
  }

  const handleDateChange = (date) => {
    setCourseDate(date);
  };

  return (
      <div>
        {
            typeof profile === 'undefined'
            ?
            <PleaseLogin />
            :

            <div style={{marginTop:"3%"}}>
                {
                    isLoading 
                    ?
                    <Grid className={classes.loading}>
                        <CircularProgress />
                    </Grid>
                    :
                    <div>
                        <ShopingCart/>
                        
                        <Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={() => setIsSnackbarOpen(false)}>
                            <Alert onClose={() => setIsSnackbarOpen(false)} severity="success">
                                Your new course was added successfully!
                            </Alert>
                        </Snackbar>

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
                                addCourse={addCourse}
                                courseList={Array.from(courseList)}
                                filterCourseName={courseName}
                                filterCourseDate={courseDate}
                            />
                            
                        </Grid>
                    </div>
                }
            </div>    
        } 
      </div>
  );
}

