import { useState } from 'react'
import './App.css'
import Dashboard from './components/dashboard/Dashboard'
import Header from './components/general/Header'
import Navegation from './components/general/Navegation'
import Footer from './components/general/Footer'
import { Route, Routes } from 'react-router-dom'
import Product from './components/product/Product'
import Search from './components/general/Search'
import Request from './components/requests/Request'
import Notification from './components/notification/Notification'
import Sales from './components/sale/Sales'
import Sale from './components/sale/Sale'
import Setting from './components/settings/Setting'
import ShowToast from './components/general/ShowToast'
import Login from './components/Login/Login'
import Spend from './components/Spend/Spend'
import { useSelector } from 'react-redux'

function App() {

  const appState=useSelector((state)=>state.appState);

  const [isVisible,setIsVisible]=useState(false);
  const [isSearching,setIsSearching]=useState(false);
  const [showToast,setShowToast]=useState(false);
  const [toastObject,setToastObject] = useState({});

  return (
    <>
     <div className="h-screen w-screen p-3">
      <Header searchHandleClick={setIsSearching} setVisibility={setIsVisible}/>
      <Navegation visible={isVisible} setVisibility={setIsVisible}/>
      <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/requests' element={<Request/>} />
      <Route path='/notifications' element={<Notification/>} />
      <Route path='/sales' element={<Sales/>} />
      <Route path='/products' element={<Product/>} />
      <Route path='/spends' element={<Spend/>} />  
      <Route path='/sale' element={<Sale setToastObject={setToastObject}/>} />
      <Route path='/setting' element={<Setting/>} />
      </Routes>
      {appState.isSearching && (<Search/>)}

    {
      showToast && (
      <ShowToast object={toastObject} />
      )
    }
      
      {/* <Footer/> */}
     </div>
    </>
  )
}

export default App
