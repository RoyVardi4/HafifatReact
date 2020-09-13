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
  const [isChecked, setIsChecked] = useState(false)
  const [isAddDatePopup, setIsAddDatePopup] = useState(false)
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")

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

  const handleCloseAddDatePopup = (newDate) => () => {
    // Check if is not null
    if(newDate){
      props.course.dates.push(newDate)
      setSnackbarMessage("Successfully added new date")
      setIsSnackbarOpen(true)
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
                    control={<Checkbox onClick={() => moreDates()}    
                                       checked={isChecked}/>}
                    label={props.course.name}
                />
                <Typography className={classes.gmushData}>{props.course.gmush} hours</Typography>
                <Typography className={classes.dateData}>
                    {props.course.dates.filter((date, index) => index === 0) }
                </Typography>
                <Typography onClick={(event) => event.stopPropagation()}>
                  <EventIconDate color="secondary" onClick={() => setIsAddDatePopup(true)} />
                  <AddCourseDate open={isAddDatePopup}
                                course={props.course}
                                handleClose={handleCloseAddDatePopup}/>
                </Typography>
                

                <DatesPopup 
                    open={isOpenPopup}
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

