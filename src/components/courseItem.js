import React, { useState } from 'react';
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

  const classes = styles();

  const handleClosePopup = () => (event) => {
    event.stopPropagation()
    setIsOpenPopup(false);
  };

  const handleCloseAddDatePopup = () => (event) => {
    event.stopPropagation()
    setIsAddDatePopup(false);
  };

  const moreDates = () => {
    // Open dates popup only if checked
    if(!isChecked){
        setIsOpenPopup(true)
    } 
    setIsChecked(!isChecked)
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
                {/* <Typography className={classes.dateData}>
                    {props.course.dates.filter((date, index) => index === 0) }
                </Typography> */}
                
                <FormControlLabel
                    className={classes.dateData}
                    onClick={(event) => event.stopPropagation()}
                    control={
                      <div>
                        <Typography>
                          {props.course.dates.filter((date, index) => index === 0) }
                        </Typography>
                        <EventIconDate onClick={() => setIsAddDatePopup(true)} />
                      </div>
                    }
                />
                <AddCourseDate open={isAddDatePopup}
                               course={props.course}
                               handleClose={handleCloseAddDatePopup}/>

                <DatesPopup 
                    open={isOpenPopup}
                    handleClose={handleClosePopup}
                    course={props.course}/>
            </AccordionSummary>

            <Divider />
            
            <AccordionDetails>
                <Typography>{props.course.description}</Typography>
            </AccordionDetails>
        </Accordion>
  );
}

