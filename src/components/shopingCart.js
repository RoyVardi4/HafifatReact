import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import MyShopping from './myShopping'

const useStyles = makeStyles((theme) => ({
  root: {
    transform: 'translateZ(0px)',
    flexGrow: 1,
  },
  exampleWrapper: {
    position: 'fixed',
    height: 380,
  },
  speedDial: {
    position: 'absolute',
    '&.MuiSpeedDial-directionDown': {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  },
}));


export default function ShoppingCart() {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [isOpenShoppingCart, setisOpenShoppingCart] = useState(false)
    
    const actions = [
        { 
            icon: <ShoppingCartIcon />, 
            name: 'Shopping cart',
            execute: () => setisOpenShoppingCart(true)
        },
    ];

  const handleCloseMyShopping = () => () => {
      setisOpenShoppingCart(false)
  }


  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <div className={classes.exampleWrapper}>


      <SpeedDial
          FabProps={{color:"secondary"}}
          ariaLabel="SpeedDial example"
          className={classes.speedDial}
          icon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction={'down'}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.execute}
            />
          ))}
        </SpeedDial>
        <MyShopping open={isOpenShoppingCart}
                    handleClose={handleCloseMyShopping}/>
      </div>
    </div>
  );
}

