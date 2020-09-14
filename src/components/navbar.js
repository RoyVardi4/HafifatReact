import React, {useState} from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { grey } from '@material-ui/core/colors';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

// Components
import Courses from './Courses'
import Login from './logIn'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: grey,
    width: "100%",
  },
  title: {
    flexGrow: 0.6,
  },
  tabs: {
    flexGrow: 0.3,
  },
  login: {
    flexGrow: 0.1,
    marginLeft: theme.spacing(25)
  },
}));


function tempHomePage() {
  return <h1 align="center">Home Page</h1>
}

export default function Navbar() {
  const classes = useStyles()
  
  const [logInPopup, setLogInPopup] = useState(false) 
  const [value, setValue] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  const closeLogIn = () => {
    setLogInPopup(false)
  }

  return (
    <div className={classes.root}>
       <AppBar position="sticky" color="primary">      
         <Toolbar>
             <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                 <MenuIcon />
             </IconButton>
             <Typography variant="h6" className={classes.title}>
                Course management
             </Typography>
             <Tabs
                 className={classes.tabs}
                 value={value}
                 onChange={handleChange}
                 indicatorColor="secondary"
                 textColor="inherit"
                 variant="fullWidth"
                 aria-label="full width tabs example"
            >
                <Tab to="/register" label="registrations" component={Link}/>
                <Tab to="/profile" label="That's ME" component={Link}/>
                <Tab to="/coursesDone" label="courses done" component={Link}/>
            </Tabs>
            <IconButton className={classes.login} 
                        color="inherit"
                        onClick={() => setLogInPopup(true)}
            >
              <AccountCircleIcon/>
              <Login open={logInPopup} handleClose={() => closeLogIn}/>
            </IconButton>
        </Toolbar>
      </AppBar>
      
      <Switch>
        <Route exact path="/">
          <Redirect to="/Home"/>
        </Route>
        <Route path="/Home" component={tempHomePage} />
        <Route path="/register" component={Courses} />
      </Switch>
    </div>
  );
}