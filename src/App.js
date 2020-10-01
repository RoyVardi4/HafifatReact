import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';

// Global Context
import { MyCartProvider } from './Context/myCartContext'
import { MyProfileProvider } from './Context/myProfileContext'

// Components 
import Navbar from './components/navbar'

const useStyles = makeStyles((theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.5em'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
      borderRadius: "10px"
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.2)',
      // outline: '1px solid slategrey',
      borderRadius: "10px"
    }
  }
}))

function App() {
  useStyles()

  return (
    <MyProfileProvider>
      <MyCartProvider>
        <BrowserRouter>
          <div style={{backgroundColor: "#F5F5F5", minHeight:"600px"}}>
            <Navbar />
          </div>
        </BrowserRouter>
      </MyCartProvider>
    </MyProfileProvider>
  );
}

export default App;
