import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Home from './Components/Home/Home'
export default function App() {
  return (
    <div>
      <BrowserRouter>
         <Home/>
         
      
      </BrowserRouter>
      
    </div>
  )
}

