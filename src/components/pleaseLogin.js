import React, { useState} from 'react';

import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import LoginIcon from '@material-ui/icons/ExitToApp';

// Components
import Login from './logIn'


export default function ThatsMe() {
  const [openLogin, setOpenLogin] = useState(false)

  const handleClosePopup = () => () => {
    setOpenLogin(false)
  }

  return (
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
  );
}