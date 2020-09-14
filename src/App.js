import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import { MyCartProvider } from './Context/myCartContext'

// Components 
import Navbar from './components/navbar'

function App() {
  return (
    <MyCartProvider>
      <BrowserRouter>
        <div style={{backgroundColor: "#F5F5F5"}}>
          <Navbar />
          <h3 align="center" style={{paddingTop:"36%",
                                    paddingBottom:"20px",
                                    color:"grey"}}
          >@RoyVardi כל הזכויות שמורות ל
          </h3>
        </div>
      </BrowserRouter>
    </MyCartProvider>
  );
}

export default App;
