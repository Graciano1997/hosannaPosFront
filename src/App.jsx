import { useEffect, useState } from 'react'
import './App.css'
import Dashboard from './components/dashboard/Dashboard'
import Header from './components/general/Header'
import Navegation from './components/general/Navegation'
import _404 from './components/general/_404'
import Footer from './components/general/Footer'
import { Route, Routes, useLocation } from 'react-router-dom'
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
import {  StopExporting } from './slices/appSlice'
import Export from './components/general/Export'
import { fetchUsers } from './slices/userSlice'
import { fetchSpents } from './slices/spentSlice'
import { fetchCategories } from './slices/categorySlice'
import { fetchCompanies } from './slices/companySlice'
import PdfViewer from './components/Pdf/PdfViewer'

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
     dispatch(fetchUsers());
     dispatch(fetchSpents());
     dispatch(fetchCategories());
     dispatch(fetchCompanies());
  //   // dispatch(fetchCurrency());
   },[]);

  useEffect(()=>{
    
    if(isVisible){
      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    } 

  },[isVisible]);

  const excludePathName =['/','/logout'];
  
  return (
    <>    
     <div className={`h-100 w-100 p-3  ${!appState.isLogged?'flex items-center justify-center':''}`}>   
      
     {/* appState.isLogged */}
      {
      localStorage.getItem("isLogged")=="true" && (
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
      <Route path='/pdf' element={<PdfViewer/>} />
      <Route path='/requests' element={<Request/>} />
      <Route path='/notifications' element={<Notification/>} />
      <Route path='/sales' element={<Sales/>} />
      <Route path='/products' element={<Product/>} />
      <Route path='/spents' element={<Spent/>} />  
      <Route path='/sale' element={<Sale setToastObject={setToastObject}/>} />
      <Route path='/users' element={<User/>} /> 
      <Route path='/setting' element={<Setting/>} />
      <Route path='*' element={<_404/>} />
      </Routes>

      {appState.isSearching && (<Search/>)}
      { appState.showToast && (<ShowToast object={appState.toastObject} />)}
      { appState.isExporting && (<Export stopExporting={StopExporting} />) }
      </>
      )}
      {!localStorage.getItem("isLogged") && (<Login/>)}
     </div>
    </>
  )
}

export default App
