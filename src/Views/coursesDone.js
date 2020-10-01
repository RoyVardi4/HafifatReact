import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Devider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'

// Context 
import {useMyProfile} from '../Context/myProfileContext'

// Components
import PleaseLogin from '../components/pleaseLogin'

const useStyles = makeStyles((theme) => ({
    list: {
      width: '100%',
      minWidth: 500,
      backgroundColor: theme.palette.background.paper,
    },
  }));

export default function CoursesDone() {
    const classes = useStyles()
    const profile = useMyProfile()

    const checkCourseDatePassed = (courseDate) => {
        const now = new Date()
        const [day, month, year] = [now.getDate(), now.getMonth() + 1, now.getFullYear()]
        const [courseDay, courseMonth, courseYear] = courseDate.split('.') 

        return (year > courseYear) ||
               (year == courseYear && month > courseMonth) || 
               (year == courseYear && month == courseMonth && day > courseDay)
    }
    
    return (
        <div>
            { 
                typeof profile === 'undefined'
                ?
                <PleaseLogin />
                :
                <div>
                    <h2 align="center" style={{paddingBottom:"50px"}}>Courses Done by {profile.name}</h2>
                    {
                        profile.courses.length === 0 ?
                        <h3 align="center" style={{paddingBottom:"120px"}}>You haven't done any course yet</h3> :
                        <Grid container
                              direction="row"
                              alignItems='center'
                              justify="center">
                            <Grid item >
                                <Paper style={{ maxHeight: 350, 
                                                backgroundColor:"#F5F5F5",
                                                overflow: 'auto'}}
                                >
                                {profile.courses.map((course, index) => {
                                    return <List key={course.name} className={classes.list}>
                                                <ListItem>
                                                    <ListItemText primary={course.name}
                                                                  secondary={course.selectedDate}
                                                    />
                                                    <ListItemSecondaryAction edge="end">
                                                        {
                                                            checkCourseDatePassed(course.selectedDate)
                                                            ?
                                                            <CheckBoxIcon/>
                                                            :
                                                            <CheckBoxOutlineBlankIcon/>
                                                        }
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                                {index !== profile.courses.length - 1 && <Devider/>}  
                                            </List>
                                })}
                                </Paper>
                            </Grid>
                        </Grid>
                    }
                </div>
            }
        </div>
    );
}