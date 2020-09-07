import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import EventIconDate from '@material-ui/icons/Event';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '75%',
    marginBottom: theme.spacing(7),
    marginTop: theme.spacing(3),
  },
  gridHeading: {
    fontSize: theme.typography.pxToRem(15),
    fontStyle: "italic",
    // textDecoration: "underline",
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(3)
  },
  titleData: {
    fontSize: theme.typography.pxToRem(20),
    flexBasis: '40%',
    flexShrink: 0,
  },
  titleHeading: {
    flexBasis: '35%',
    marginLeft: theme.spacing(2)
  },
  gmushData: {
    flexBasis: '15%',
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  gmushHeading: {
    flexBasis: '15%',
  },
 dateData: {
    flexBasis: '10%',
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  dateHeading: {
    flexBasis: '10%',
  },
}));

export default function ControlledAccordions(props) {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false)

  const filterByDates = datesList => {
    if(!props.filterCourseDate)
      return true

    const filterYear = props.filterCourseDate.getFullYear()
    const filterMonth = props.filterCourseDate.getMonth() + 1
    const filterDay = props.filterCourseDate.getDate()
                                         
    const len = datesList.filter(date => {
      const [day, month, year] = date.split('.')
      console.log("check: " + year + month + day +"     filter: " +filterYear +filterMonth + filterDay)
      return filterYear == year &&
             filterMonth == parseInt(month) &&
             filterDay == parseInt(day)
    }).length
    return len > 0 ? true : false
  }

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
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
        {
          props.courseList.map((course) => {
                filterByDates(course.dates) 
                return course.name.toLowerCase().includes(props.filterCourseName.toLowerCase())  &&
                       filterByDates(course.dates)
                ?
                <Accordion key={course.name} expanded={expanded === course.name} onChange={handleChange(course.name)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        id={course.name}
                    >
                        <Typography className={classes.titleData}>{course.name}</Typography>
                        <Typography className={classes.gmushData}>{course.gmush}/hours</Typography>
                        <Typography className={classes.dateData}>
                          {course.dates.filter((date, index) => index === 0) }
                        </Typography>  

                        <IconButton size="small" color="secondary">
                          <EventIconDate/>
                        </IconButton> 

                    </AccordionSummary>
                    
                    <AccordionDetails>
                        <Typography>{course.description}</Typography>
                    </AccordionDetails>
                </Accordion>
                :
                null
            })
        }
    </div>
  );
}

