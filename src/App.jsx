import { useEffect, useState } from 'react'
import './App.css'
import Dashboard from './components/dashboard/Dashboard'
import Header from './components/general/Header'
import Navegation from './components/general/Navegation'
import Footer from './components/general/Footer'
import { Route, Routes, useFetcher, useLocation } from 'react-router-dom'
import Product from './components/product/Product'
import Search from './components/general/Search'
import Request from './components/requests/Request'
import Notification from './components/notification/Notification'
import Sales from './components/sale/Sales'
import Sale from './components/sale/Sale'
import Setting from './components/settings/Setting'
import ShowToast from './components/general/ShowToast'
import Login from './components/Login/Login'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from './slices/productSlice'
import Spent from './components/Spent/Spent'
import User from './components/user/User'

function App() {

  const appState=useSelector((state)=>state.appState);

  const [isVisible,setIsVisible]=useState(false);
  const [isSearching,setIsSearching]=useState(false);
  const [showToast,setShowToast]=useState(true);
  const [toastObject,setToastObject] = useState({});
  const dispatch = useDispatch();
  const {pathname}= useLocation();
  
  useEffect(()=>{
    dispatch(fetchProducts());
  },[]);
  
  const excludePathName =['/','/logout'];

  return (
    <>    
     <div className={`h-screen w-screen p-3  ${!appState.isLogged?'flex items-center justify-center':''}`}>   
      
      {appState.isLogged && (
      <>
      
      {(!excludePathName.includes(pathname)) && 
      <>
      <Header searchHandleClick={setIsSearching} setVisibility={setIsVisible}/>
      <Navegation visible={isVisible} setVisibility={setIsVisible}/>
      </>
      }

      <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/logout' element={<Login/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/requests' element={<Request/>} />
      <Route path='/notifications' element={<Notification/>} />
      <Route path='/sales' element={<Sales/>} />
      <Route path='/products' element={<Product/>} />
      <Route path='/spents' element={<Spent/>} />  
      <Route path='/sale' element={<Sale setToastObject={setToastObject}/>} />
      <Route path='/users' element={<User/>} /> 
      <Route path='/setting' element={<Setting/>} />
      </Routes>
      {appState.isSearching && (<Search/>)}
      </>
      )}
      
      {!appState.isLogged && (<Login/>)}

      { appState.showToast && (<ShowToast object={appState.toastObject} />)}
      
      {/* <Footer/> */}
     </div>
    </>
  )
}

export default App
