import { useEffect, useState } from 'react'
import './App.css'
import Dashboard from './components/dashboard/Dashboard'
import Header from './components/general/Header'
import Navegation from './components/general/Navegation'
import _404 from './components/general/_404'
import _401 from './components/general/_401'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
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
import {  closeInvoiceView, StopExporting } from './slices/appSlice'
import Export from './components/general/Export'
import { fetchUsers } from './slices/userSlice'
import { fetchSpents } from './slices/spentSlice'
import { fetchCategories } from './slices/categorySlice'
import { fetchCompanies } from './slices/companySlice'
import PdfViewer from './components/Pdf/PdfViewer'
import { Profiles } from './lib/Enums'
import { firstCapitalize } from './lib/firstCapitalize'
import { useTranslation } from 'react-i18next'
import Account from './components/settings/Account'
import { fetchPrinterConfig } from './slices/printerSlice'
import { MyStore } from './components/mystore/Mystore'
import StockMovements from './components/Stock/StockMovements'

function Home() {

  const appState=useSelector((state)=>state.appState);
  const productState=useSelector((state)=>state.productState);

  const [isVisible,setIsVisible]=useState(false);
  const [isSearching,setIsSearching]=useState(false);
  const [showToast,setShowToast]=useState(true);
  const [toastObject,setToastObject] = useState({});
  const dispatch = useDispatch();
  const {pathname}= useLocation();
  const {t}=useTranslation();
  const navegate = useNavigate();
  const masterProfile = localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")).profileId==Profiles.MASTER:null;
  

  useEffect(()=>{
    if(localStorage.getItem("isLogged")){
      dispatch(fetchProducts(productState.last_created_at));
      dispatch(fetchUsers());
      dispatch(fetchSpents());
      dispatch(fetchCategories());
      dispatch(fetchCompanies());
      dispatch(fetchPrinterConfig());
    } 
   },[localStorage.getItem("isLogged")]);

   useEffect(()=>{    
     if(isVisible){
       setTimeout(() => {
         setIsVisible(false);
       }, 60000);
     } 

   },[isVisible]);

  const excludePathName =['/','/logout'];
  
  return (
    <>    
     <div className={`h-100 w-100 p-3  ${!appState.isLogged?'flex items-center justify-center':''}`}>        
      {
      localStorage.getItem("isLogged") && (
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
      <Route path='/pdf' element={masterProfile ? <PdfViewer/>:<_401/>} />
      <Route path='/requests' element={masterProfile ? <Request/>:<_401/>} />
      <Route path='/notifications' element={masterProfile ? <Notification/> : <_401/>} />
      <Route path='/sales' element={masterProfile ? <Sales/> : <_401/>} />
      <Route path='/products' element={masterProfile ? <Product/> : <_401/>} />
      <Route path='/spents' element={masterProfile ? <Spent/>: <_401/>} />  
      <Route path='/users' element={masterProfile ? <User/>: <_401/>} /> 
      <Route path='/sale' element={<Sale setToastObject={setToastObject}/>} />      
      <Route path='/setting' element={<Setting/>} />
      <Route path='/profile' element={<Account/>} />
      <Route path='/mystore' element={<MyStore/>} />
      <Route path='/stock_movements' element={<StockMovements/>} />
      <Route path='*' element={<_404/>} />
      </Routes>

      {
        appState.invoiceView && appState.urlItem &&
        <PdfViewer closeHandler={closeInvoiceView} url={appState.urlItem}/>
      }
      

      { appState.isSearching && (<Search/>)}
      { appState.showToast && (<ShowToast object={appState.toastObject} />)}
      { appState.isExporting && (<Export stopExporting={StopExporting} />) }
      </>
      )}
      {!localStorage.getItem("isLogged") && (<Login/>)}
     </div>
    </>
  )
}

export default Home
