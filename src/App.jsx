import { useState } from 'react'
import './App.css'
import Dashboard from './components/Dashboard'
import Header from './components/Header'
import Navegation from './components/Navegation'
import Footer from './components/Footer'

function App() {

  const [isVisible,setIsVisible]=useState(false);

  return (
    <>
     <div className="h-screen w-screen p-3">
      <Header setVisibility={setIsVisible}/>
      <Navegation visible={isVisible} setVisibility={setIsVisible}/>
      <Dashboard/>
      <Footer/>
     </div>
    </>
  )
}

export default App
