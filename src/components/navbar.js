import React, { useState, useEffect} from 'react';
import { Link, Route, Switch, Redirect, useLocation } from 'react-router-dom'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { grey } from '@material-ui/core/colors';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SignOutIcon from '@material-ui/icons/MeetingRoom';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

// Context 
import { useMyProfile, useMyProfileChange } from '../Context/myProfileContext' 
import { useMyCartRemoveAll } from '../Context/myCartContext'

// Components
import CoursesDone from '../Views/coursesDone'
import Courses from './Courses'
import ThatMe from '../Views/thatsMe'
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
    marginRight: theme.spacing(15)
  },
  login: {
    flexGrow: 0.1,
  },
}));


export default function Navbar() {
  const classes = useStyles()
  
  const [logInPopup, setLogInPopup] = useState(false) 
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [value, setValue] = useState(0);

  const location = useLocation()
  const profile = useMyProfile()
  const changeProfile = useMyProfileChange()
  const removeAllCart = useMyCartRemoveAll()

  useEffect(() => {
    switch(location.pathname) {
      case '/register' :
        setValue(0)
        break
      case '/profile' :
        setValue(1)
        break
      case '/coursesDone' :
        setValue(2)
        break
      default:

    }
  }, [location])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  const closeLogIn = () => {
    setLogInPopup(false) 
  }

  const signOut = () => {
    // set profile to null
    changeProfile()

    // delete cart items
    removeAllCart()
    
    setIsSnackbarOpen(true)
  }

  return (
    <div className={classes.root}>
       <AppBar position="sticky" color="primary">    
          
          <Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={() => setIsSnackbarOpen(false)}>
              <Alert onClose={() => setIsSnackbarOpen(false)} severity="success">
                You logged out
              </Alert>
          </Snackbar>  
         
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
            {
              typeof profile === 'undefined' ? 
              <IconButton className={classes.login} 
                          color="inherit"
                          size="small"
                          onClick={() => setLogInPopup(true) }
              >
                <AccountCircleIcon />
              </IconButton>
              :
              <Button className={classes.login}
                      style={{textTransform: "none"}}
                      color="inherit"
                      onClick={signOut}
                      endIcon={<SignOutIcon />}
              >
                Hello, {profile.name}
              </Button>
            }
            <Login open={logInPopup} handleClose={() => closeLogIn}/>
        </Toolbar>
      </AppBar>
      
      <Switch>
        <Route exact path="/">
          <Redirect to="/register"/>
        </Route>
        <Route path="/register" component={Courses} />
        <Route path="/profile" component={ThatMe} />
        <Route path="/coursesDone" component={CoursesDone} />        
      </Switch>
    </div>
  );
}