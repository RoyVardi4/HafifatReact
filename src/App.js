import React from 'react';

import { MyCartProvider } from './Context/myCartContext'

// Components 
import Courses from './components/Courses'

function App() {
  return (
    <MyCartProvider>
      <div style={{backgroundColor: "#F5F5F5"}}>
        <h1 align="center">מערכת לרישום קורסים</h1>
        <Courses />
        <h3 align="center" style={{paddingTop:"260px",
                                  paddingBottom:"20px",
                                  color:"grey"}}
        >@RoyVardi כל הזכויות שמורות ל
        </h3>
      </div>
    </MyCartProvider>
  );
}

export default App;
