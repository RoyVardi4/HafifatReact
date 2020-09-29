import React, { useState, useEffect } from 'react';
import { useMyCart, useMyCartRemove } from '../Context/myCartContext'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DatesPopup from './courseDatesPopup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AddCourseDate from './addCourseDate';
import EventIconDate from '@material-ui/icons/Event';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Tooltip from '@material-ui/core/Tooltip';

import CoursesServerAPI from '../ServerAPI/courseServerAPI'

const styles = makeStyles((theme) => ({
  titleData: {
    fontSize: theme.typography.pxToRem(20),
    flexBasis: '40%',
    flexShrink: 0,
  },
  gmushData: {
    flexBasis: '25%',
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
 dateData: {
    flexBasis: '10%',
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function CourseItem(props) {
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const [isChecked, setIsChecked] = useState(true)
  const [isAddDatePopup, setIsAddDatePopup] = useState(false)
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [tooltipDisabledInfo, setTooltipDisabledInfo] = useState(false)

  const classes = styles();

  const cartList = useMyCart()
  const removeFromCartList = useMyCartRemove()

  useEffect(() => {
    if(cartList.filter((cartItem) => cartItem.name === props.course.name).length === 0) {
      setIsChecked(false)
    }
  }, [cartList, props.course.name])

  const handleClosePopup = () => (isToCheck) => {
    setIsChecked(isToCheck)
    setIsOpenPopup(false)
    if(isToCheck) {
      setSnackbarMessage("Great! you have chosen a date");
      setIsSnackbarOpen(true)
    }
  };

  const handleCloseAddDatePopup = (newDate) => async() => {
    // Check if is not null
    if(newDate){
      // Save to db
      const addedDate = await CoursesServerAPI.addCourseDate(newDate, props.course._id)
      if(addedDate) {
        props.course.dates.push(addedDate)
        setSnackbarMessage("Successfully added new date")
        setIsSnackbarOpen(true)
      }

    }
    setIsAddDatePopup(false);
  }

  const moreDates = () => {
    // Open dates popup only if checked
    if(!isChecked){
        setIsOpenPopup(true)
    } else {
      const removeFromCart = {
        name: props.course.name
      }
      removeFromCartList(removeFromCart)
    }
    setIsChecked(!isChecked)
  }

  const closeSnackbar = (event) => {
    event.stopPropagation()
    setIsSnackbarOpen(false)
  }

  const nextDate = () => {
    const nextD = sortedDates().find((d, index) => index === 0)
    return nextD ? nextD : "no next date" 
  }

  const sortedDates = () => { 
    return filteredDates().sort((d1, d2) => {
      const [day1, month1, year1] = d1.split('.')
      const [day2, month2, year2] = d2.split('.')
      return new Date(year1, month1, day1) - new Date(year2, month2, day2) 
    })
  }
  
  const filteredDates = () => {
    return props.course.dates.filter((date) => {
      const [day, month, year] = date.split('.')
      return new Date() < new Date(year, month - 1, day)
    })
  }

  return (
        <Accordion expanded={props.expanded === props.course.name} 
                   onChange={props.expandChange(props.course.name)}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                id={props.course.name}
            >
                  <FormControlLabel
                      className={classes.titleData}
                      onClick={(event) => event.stopPropagation()}
                      control={
                          <Tooltip arrow
                                   placement="bottom" 
                                   onClose={() => setTooltipDisabledInfo(false)}
                                   onOpen={() => filteredDates().length === 0 && setTooltipDisabledInfo(true)}
                                   open={tooltipDisabledInfo}
                                   title="no available dates for this course">
                            <span>
                              <Checkbox onClick={() => moreDates()}    
                                              checked={isChecked}
                                              disabled={filteredDates().length === 0}
                              />
                            </span>
                          </Tooltip>
                        }
                        label={props.course.name}
                        />
                <Typography className={classes.gmushData}>{props.course.gmush} hours</Typography>
                <Typography className={classes.dateData}>
                    {nextDate()}
                </Typography>
                <Typography onClick={(event) => event.stopPropagation()}>
                  <EventIconDate color="secondary" onClick={() => setIsAddDatePopup(true)} />
                  <AddCourseDate open={isAddDatePopup}
                                course={props.course}
                                handleClose={handleCloseAddDatePopup}/>
                </Typography>
                
                <DatesPopup 
                    open={isOpenPopup}
                    sortedDates={sortedDates()}
                    handleClose={handleClosePopup}
                    course={props.course}/>

                <Snackbar open={isSnackbarOpen} autoHideDuration={4000} onClose={() => setIsSnackbarOpen(false)}>
                    <Alert onClose={closeSnackbar} severity="success">
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </AccordionSummary>

            <Divider />
            
            <AccordionDetails>
                <Typography>{props.course.description}</Typography>
            </AccordionDetails>
        </Accordion>
  );
}

