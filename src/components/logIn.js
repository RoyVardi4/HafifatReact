import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

// Context
import { useMyProfileChange } from '../Context/myProfileContext' 

const useStyles = makeStyles((theme) => ({
  customizedButton: {
    position: 'absolute',
    right: '90%',
    top: '5%',
    color: 'grey'
  }
}))

export default function Login(props) {
  const classes = useStyles()

  const changeProfile = useMyProfileChange()
  const [personalNumber, setPersonalNumber] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const closeLogIn = (event) => {
    if(event) event.stopPropagation()
    const close = props.handleClose()
    close() 
  }

  const handleChange = (event) => {
      const {value} = event.target
      setPersonalNumber(value)
  }

  const login = async(event) => {
    setIsLoading(true)
    await fetch("https://api.mocki.io/v1/c3b8d833")
            .then(res => res.json())
            .then(data => {
              const user = data.find((u) => u.personalNum === personalNumber)
              if(user) {
                changeProfile(user)
                setIsLoading(false)
                closeLogIn()    
              } else {
                // TODO: add error message
              }
            })
    
  }

  return (
      <Dialog
        fullWidth
        open={props.open}
        onClose={closeLogIn}
      >

        <DialogTitle align="center">Log in</DialogTitle>
        
        <DialogContent>
        <Grid style={{marginBottom:"42px"}}
              container
              direction="row"
              alignItems='center'
              justify="center">
            <TextField type="text"
                    name="name"
                    onChange={handleChange} 
                    style={{align: "center"}}
                    label="Presonal number"
                    variant="outlined" 
                    value={personalNumber}
            />
          </Grid>
          <Grid container
                direction="row"
                alignItems='center'
                justify="center"
                style={{position: 'relative'}}>
              <Button style={{minWidth: 250}} 
                      color="secondary" 
                      variant="contained" 
                      onClick={login}
                      disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} /> : <>Loading</>}
              </Button>
          </Grid>
        </DialogContent>

        <DialogActions>
          <IconButton onClick={closeLogIn} className={classes.customizedButton}>
            <CloseIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
  );
}