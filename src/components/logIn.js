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

// Server API
import ProfileServeAPI from '../ServerAPI/profileServerAPI'

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
  const [isLoading, setIsLoading] = useState(false)
  const [input, setInput] = useState({})

  const handleInputChange = (e) => setInput({
    ...input,
    [e.currentTarget.name]: e.currentTarget.value
  })

  const closeLogIn = (event) => {
    if(event) event.stopPropagation()
    const close = props.handleClose()
    close() 
  }

  const login = async(event) => {
    setIsLoading(true)

    const response = await ProfileServeAPI.getProfile(input.personalNumber)
    let profile
    switch(response.status) {
      case 200:
        profile = response.data
        break;
      case 404:
        alert("Couldn't find the user")
        break;
      case 500: 
        alert("Somthing went wrong :(")
        break
      default:
    }

    setIsLoading(false)
    
    if(profile) {
      closeLogIn()    
      changeProfile(profile)
    } else {
      alert("User does not exist")
    }
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
                <form>
                  <TextField type="text"
                             name="personalNumber"
                             onChange={handleInputChange} 
                             style={{align: "center"}}
                             label="Presonal number"
                             variant="outlined" 
                  />
                </form>
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
                {isLoading ? <CircularProgress size={24} /> : <>Login</>}
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