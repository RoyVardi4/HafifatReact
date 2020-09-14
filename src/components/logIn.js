import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';

export default function Login(props) {

  const click = (event) => {
    event.stopPropagation()
    const close = props.handleClose()
    close() 
  }

  return (
      <Dialog
        fullWidth
        open={props.open}
        onClose={click}
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
                    // onChange={this.handleChange} 
                    style={{align: "center"}}
                    label="Presonal number"
                    variant="standard" 
                    // value={this.state.name}
            />
          </Grid>
          <Grid container
                direction="row"
                alignItems='center'
                justify="center">
            <Button style={{margin:"8px"}} color="primary" size="large" variant="outlined" onClick={click}>cancel</Button>
            <Button style={{margin:"8px"}} color="primary" size="large" variant="contained" onClick={click}>Login</Button>
          </Grid>
        </DialogContent>
      </Dialog>
  );
}