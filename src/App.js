import React from 'react';
import {BrowserRouter} from 'react-router-dom'

// Global Context
import { MyCartProvider } from './Context/myCartContext'
import { MyProfileProvider } from './Context/myProfileContext'

// Components 
import Navbar from './components/navbar'

function App() {
  return (
    <MyProfileProvider>
      <MyCartProvider>
        <BrowserRouter>
          <div style={{backgroundColor: "#F5F5F5"}}>
            <Navbar />
            <h4 align="center" style={{ marginTop: "18%",
                                        color:"grey"}}
            >@RoyVardi כל הזכויות שמורות ל
            </h4>
          </div>
        </BrowserRouter>
      </MyCartProvider>
    </MyProfileProvider>
  );
}

export default App;
