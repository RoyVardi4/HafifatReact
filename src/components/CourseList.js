import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '75%',
    marginBottom: "20px"
  },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    flexBasis: '40%',
    flexShrink: 0,
  },
  gmushHeading: {
    flexBasis: '15%',
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
 dateHeading: {
    flexBasis: '30%',
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function ControlledAccordions(props) {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false)
  const [dataArr, setDataArr] = useState([])
  const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch("https://api.mocki.io/v1/07bc5d06")
                .then(res => res.json())
                .then(data => setDataArr(data))
                .finally(() => setIsLoading(false))
    }, [])

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
        {
            isLoading ?
            <Grid className={classes.loading}>
                <CircularProgress />
            </Grid>
            :
            dataArr.map((course) => {
                return course.name.toLowerCase().includes(props.filterCourseName.toLowerCase())
                ?
                <Accordion key={course.name} expanded={expanded === course.name} onChange={handleChange(course.name)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        id={course.name}
                    >
                        <Typography className={classes.heading}>{course.name}</Typography>
                        <Typography className={classes.gmushHeading}>{course.gmush}/hours</Typography>
                        <Typography className={classes.dateHeading}>{course.dates}</Typography>
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

