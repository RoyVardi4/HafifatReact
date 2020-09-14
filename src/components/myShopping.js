import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green, blue } from '@material-ui/core/colors';
import CheckIcon from '@material-ui/icons/Check';
import Fab from '@material-ui/core/Fab';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Grow from '@material-ui/core/Grow';

import { useMyCart, useMyCartRemove, useMyCartRemoveAll } from '../Context/myCartContext'

const useStyles = makeStyles((theme) => ({
    listItem: {
        '&:hover': {
            backgroundColor: "#DCDCDC",
          },  
    },
    buttonProgress: {
        color: blue[700],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
      },
      buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
          backgroundColor: green[700],
        },
        margin: theme.spacing(5)
      },
}));

export default function ShoppingCart(props) {
  const classes = useStyles();

  const [isBuyNowLoading, setIsButNowLoading] = useState(false)
  const [isSuccess, setSuccess] = useState(false)
    
    const cartList = useMyCart()
    const removeFromCartList = useMyCartRemove()
    const removeAllFromCart = useMyCartRemoveAll()
    const closeDialog = props.handleClose()

    const removeFromList = (courseToRemove) => {
        removeFromCartList(courseToRemove)
    }

    const clickedBuyNow = () => {
        setIsButNowLoading(true)
        setTimeout(() => {
            setSuccess(true)
            
            // Remove all courses from list
            setTimeout(() => {
                removeAllFromCart()
            }, 500*cartList.length)

            setIsButNowLoading(false)
        }, 1000)
    }

    const exitDialog = () => {
        closeDialog()
        setTimeout(() => {
            // Reset success button 
            setSuccess(false)
        }, 1000)
    }

  return (
      <div >
        <Dialog
            fullWidth
            open={props.open}
            onClose={exitDialog}
        >
            <DialogTitle align="center">My Shopping list</DialogTitle>

        {
            cartList.length === 0 && !isSuccess ? 
            <h4 align="center">You haven't picked courses yet</h4> :
            <div>
                <DialogContent>
                    <List
                        component="nav"
                    >
                        {cartList.map((courseItem, index) => {
                            return <Grow in={!isSuccess} timeout={500*(index+1)} key={courseItem.name}>
                                        <div>
                                            <ListItem className={classes.listItem} >
                                                <ListItemIcon>
                                                    <IconButton onClick={() => removeFromList(courseItem)}>
                                                        <DeleteIcon color="error"/>
                                                    </IconButton>
                                                </ListItemIcon>
                                                <ListItemText primary={courseItem.name}/>
                                                <ListItemSecondaryAction>
                                                    <ListItemText primary={courseItem.selectedDate}/>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                            <Divider light/>
                                        </div>
                                    </Grow>
                        })}
                    </List>
                </DialogContent>
                <Grid container justify="center">
                    {
                        isSuccess ?
                        <Fab onClick={exitDialog} className={classes.buttonSuccess} color="primary">
                            <CheckIcon />
                        </Fab>
                        :
                        <Button style={{margin:"5%"}} 
                                variant="contained"
                                onClick={clickedBuyNow}
                                color="primary"
                                disabled={isBuyNowLoading}
                                endIcon={<AttachMoneyIcon />}
                        >
                            Buy now
                            {isBuyNowLoading && <CircularProgress className={classes.buttonProgress} size={24} />}
                        </Button>
                    }
                </Grid>
            </div>
        }
      </Dialog>
    </div>
  );
}
