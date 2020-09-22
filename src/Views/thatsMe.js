import React from 'react';
import {useMyProfile} from '../Context/myProfileContext'

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';
import GolfCourseIcon from '@material-ui/icons/GolfCourse';
import { Link } from 'react-router-dom'

// Components
import PleaseLogin from '../components/pleaseLogin'


export default function ThatsMe() {

  const profile = useMyProfile()

  const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  

  return (
      <div>
          { 
            typeof profile === 'undefined' ?
            <PleaseLogin />
            :
            <Grid container
                  direction="row"
                  alignItems='center'
                  justify="center">
                <Grid item>
                    <Card style={{marginTop:"30%", marginBottom:"40%", minWidth: 450, minHeight: 250}}>
                        <CardHeader title={profile.name} 
                                    subheader={profile.birthday}
                                    avatar={
                                    <Avatar style={{backgroundColor: `${getRandomColor()}`}}>
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
                            <IconButton to="/coursesDone" component={Link}>
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