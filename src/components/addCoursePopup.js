import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import {TextField} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';

export default class AddCoursePopup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name : "",
      gmush: 0,
      date: new Date(),
      desc: "",
      isLoading: false,
      isSnackbarOpen: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.onsubmit = this.onsubmit.bind(this)
  }

  handleChange(event) {
      const {name, value} = event.target
      this.setState({
          [name]: value
      })
  }

  handleDateChange(date) {
    this.setState({
        "date" : date
      })
  };

  validateFields() {
    return this.state.name !== ""  &&
           this.state.gmush !== 0 &&
           this.state.date.setHours(0,0,0,0) >= new Date().setHours(0,0,0,0) &&
           this.state.desc !== ""
  }

  onsubmit() {
    this.setState({
      isLoading: true
    })
    setTimeout(() => {
      if(this.validateFields()) {
        const newCourse = {
            dates: [
              `${this.state.date.getDate()}.${this.state.date.getMonth() + 1}.${this.state.date.getFullYear()}`
            ],
            name: this.state.name,
            gmush: this.state.gmush,
            description: this.state.desc
        }
        
        this.props.handleAddCourse(newCourse)
        this.props.handleClose()
      } else {
        this.setState({
          isSnackbarOpen : true
        })
      }
      
      // End cirular loading
      this.setState({
        isLoading: false
      })
    }, 1500)
  }
  
  render() {
    
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose()}
        >
          <Snackbar open={this.state.isSnackbarOpen} 
                    autoHideDuration={6000}
                    onClose={() => this.setState({isSnackbarOpen : false})}
          >
              <Alert onClose={() => this.setState({isSnackbarOpen : false})} severity="error">
                  Wrong input
              </Alert>
          </Snackbar>

          <DialogTitle align="center">
              Create a new Course
          </DialogTitle>

          <DialogContent>
              <FormControl style={{align: "center"}}>
                  <TextField type="text"
                            name="name"
                            onChange={this.handleChange} 
                            style={{margin: "8px"}}
                            required 
                            label="Course Name"
                            variant="standard" 
                            value={this.state.name}
                  />
                  <TextField type="number"
                            name="gmush"
                            onChange={this.handleChange} 
                            style={{margin: "8px"}}
                            required 
                            label="Gmush Hours"
                            variant="standard" 
                            value={this.state.gmush}
                  />
                  <TextField type="text" 
                            name="desc"
                            onChange={this.handleChange} 
                            style={{margin: "8px"}}
                            required
                            label="Description"
                            variant="standard"
                            value={this.state.desc}
                  />
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                          style={{margin: "8px"}}
                          variant="standard"
                          format="dd/MM/yyyy"
                          id="date-picker-dialog"
                          label="Course Date"
                          value={this.state.date}
                          onChange={(date) => this.handleDateChange(date)}
                      />
                  </MuiPickersUtilsProvider>
                  <Button 
                      style={{margin: "32px",
                              backgroundColor: green[500],
                              '&:hover': {
                                backgroundColor: green[700],
                              },}}
                      onClick={() => this.onsubmit()}
                      variant="contained"
                      color="primary"
                  >
                      {
                        this.state.isLoading ?
                        <CircularProgress style={{color:"green"}}/> :
                        <>Add</>
                      }
                  </Button>
              </FormControl>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}