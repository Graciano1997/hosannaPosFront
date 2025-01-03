import { useState } from 'react'
import './App.css'
import Dashboard from './components/Dashboard'
import Header from './components/Header'
import Navegation from './components/Navegation'
import Footer from './components/Footer'
import { Route, Router, Routes } from 'react-router-dom'
import Stock from './components/Stock'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import Search from './components/Search'

function App() {

  const [isVisible,setIsVisible]=useState(false);
  const [isSearching,setIsSearching]=useState(false);

  return (
    <>
     <div className="h-screen w-screen p-3">
      <Header setVisibility={setIsVisible}/>
      <Navegation visible={isVisible} setVisibility={setIsVisible}/>
      <Routes>
      <Route path='/' element={<Dashboard/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/stock' element={<Stock/>} />
      </Routes>
      {isSearching && (<Search/>)} 
      <Footer/>
     </div>
    </>
  )
}

export default App
