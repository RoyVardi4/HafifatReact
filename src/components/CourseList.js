import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CourseItem from './courseItem';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AddCoursePopup from './addCoursePopup'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '75%',
    marginBottom: theme.spacing(7),
    marginTop: theme.spacing(3),
  },
  gridHeading: {
    fontSize: theme.typography.pxToRem(15),
    fontStyle: "italic",
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(3)
  },
  titleHeading: {
    flexBasis: '35%',
    marginLeft: theme.spacing(2)
  },
  gmushHeading: {
    flexBasis: '25%',
  },
  dateHeading: {
    flexBasis: '10%',
  },
  noData: {
    color:"grey"
  }
}));

export default function ControlledAccordions(props) {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false)
  const [isOpenPopup, setIsOpenPopup] = useState(false)

  const filterByDates = datesList => {
    // pass this check if there is no filter date
    if(!props.filterCourseDate)
      return true

    const filterYear = props.filterCourseDate.getFullYear()
    const filterMonth = props.filterCourseDate.getMonth() + 1
    const filterDay = props.filterCourseDate.getDate()
                                         
    const len = datesList.filter(date => {
      const [day, month, year] = date.split('.')
      return filterYear == year &&
             filterMonth == parseInt(month) &&
             filterDay == parseInt(day)
    }).length
    return len > 0
  }

  const displayCourseList = () => {
    // create item according to user filters
    const list = props.courseList.map((course) => {
        return course.name.toLowerCase().includes(props.filterCourseName.toLowerCase())  &&
              filterByDates(course.dates)
        ?
        <CourseItem key={course._id}
                    course={course}
                    expanded={expanded}
                    expandChange={handleChange}
        />
        :
        null
    })

    // return only not null object
    return list.filter(item => item)
  }

  const getLengthDisplayed = () => {
    return displayCourseList().length
  }

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClosePopup = () => (event) => {
    event.stopPropagation()
    setIsOpenPopup(false);
  }

  const handleAddCourse = (newCourse) => {
    props.addCourse(newCourse)
  }

  return (
    <div className={classes.root}>
      {
        getLengthDisplayed() === 0
        ?
        <Grid container
              direction="row"
              alignItems='center'
              justify="center">
          <Grid item>
            <h4 style={{color:"grey"}}>No Data found :(</h4>
            <Fab onClick={() => setIsOpenPopup(true)} color="primary" variant="extended">
              Add
              <AddIcon />
            </Fab>
            <AddCoursePopup
                courseList={props.courseList}
                handleAddCourse={handleAddCourse}
                open={isOpenPopup}
                handleClose={handleClosePopup}/>
          </Grid>
        </Grid>
        :
        <div>
            <Grid 
              container
              direction="row"
              alignItems='flex-start'
              className={classes.gridHeading}
            >
                <Grid item className={classes.titleHeading}>
                  Title
                </Grid>
                <Grid item className={classes.gmushHeading}>
                  Gmush hours
                </Grid>
                <Grid item className={classes.dateHeading}>
                  Next date
                </Grid>
            </Grid>
            
            {displayCourseList()}
        </div>
      }
    </div>
  );
}

