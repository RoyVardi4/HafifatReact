import React, { useState} from 'react';
import {useMyProfile} from '../Context/myProfileContext'

// import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import LoginIcon from '@material-ui/icons/ExitToApp';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';
import GolfCourseIcon from '@material-ui/icons/GolfCourse';

// Components
import Login from '../components/logIn'

// const useStyles = makeStyles((theme) => ({
  
// }))

export default function ThatsMe() {
//   const classes = useStyles()

  const profile = useMyProfile()
  const [openLogin, setOpenLogin] = useState(false)

  const handleClosePopup = () => () => {
    setOpenLogin(false)
  }

  return (
      <div>
          { 
            typeof profile === 'undefined' ?
                <Grid container
                      direction="row"
                      alignItems='center'
                      justify="center">
                    <Grid item style={{marginBottom: "15%", marginTop: "15%"}}>
                        <h4 style={{color:"grey"}}>Please Login</h4>
                        <Fab onClick={() => setOpenLogin(true)} color="secondary" variant="extended">
                            Login
                            <LoginIcon />
                        </Fab>
                        <Login
                            open={openLogin}
                            handleClose={handleClosePopup}/>
                    </Grid>
                </Grid>
            :
            <Grid container
                  direction="row"
                  alignItems='center'
                  justify="center">
                <Grid item>
                    <Card style={{marginTop:"30%", marginBottom:"80%", minWidth: 250, minHeight: 200}}>
                        <CardHeader title={profile.name} 
                                    subheader={profile.birthday}
                                    avatar={
                                    <Avatar style={{backgroundColor: "red"}}>
                                        {profile.name.split(' ')[0][0] + profile.name.split(' ')[1][0]}
                                    </Avatar>
                                    }
                        >
                        </CardHeader>

                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Personal No. {profile.personalNum}
                            </Typography>

                            <Typography style={{fontWeight: "bold"}} variant="body2" color="textSecondary" component="p">
                                {profile.status}
                            </Typography>
                        </CardContent>

                        <CardActions>
                            <IconButton>
                                <GolfCourseIcon/>
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>

          }
      </div>
  );
}