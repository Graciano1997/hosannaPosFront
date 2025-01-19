import { useState } from 'react'
import './App.css'
import Dashboard from './components/Dashboard'
import Header from './components/Header'
import Navegation from './components/Navegation'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import Stock from './components/Stock'
import Search from './components/Search'
import Request from './components/Request'
import Notification from './components/Notification'
import Report from './components/Report'
import Sale from './components/Sale'
import Setting from './components/Setting'

function App() {

  const [isVisible,setIsVisible]=useState(false);
  const [isSearching,setIsSearching]=useState(false);

  return (
    <>
     <div className="h-screen w-screen p-3">
      <Header searchHandleClick={setIsSearching} setVisibility={setIsVisible}/>
      <Navegation visible={isVisible} setVisibility={setIsVisible}/>
      <Routes>
      <Route path='/' element={<Dashboard/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/requests' element={<Request/>} />
      <Route path='/notifications' element={<Notification/>} />
      <Route path='/reports' element={<Report/>} />
      <Route path='/stock' element={<Stock/>} />
      <Route path='/sale' element={<Sale/>} />
      <Route path='/setting' element={<Setting/>} />
      </Routes>
      {isSearching && (<Search searchHandleClick={setIsSearching} />)} 
      <Footer/>
     </div>
    </>
  )
}

export default App
