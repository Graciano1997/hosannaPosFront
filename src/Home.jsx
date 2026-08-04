import React, { useEffect, useState } from 'react'
import './App.css'
import Dashboard from './components/dashboard/Dashboard'
import Header from './components/general/Header'
import Navegation from './components/general/Navegation'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
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
import Devolution from './components/devolution/Devolution'
import CreateCompany from './components/Login/CreateCompany'
import { rootpath } from "./lib/ip";
import { CurrentUser } from './lib/CurrentUser'
import { ErrorPage } from './components/general/_404'



const RoutesLoggedOut = React.memo(()=>{
  const masterProfile = CurrentUser()?.profileId==Profiles.MASTER;
  const {t}= useTranslation()

  return (
        <Routes>
          <Route path={rootpath} element={<Login/>}/>
          <Route path={`${rootpath}login`} element={<Login/>} />
          <Route path={`${rootpath}logout`} element={<Login/>} />
          <Route path={`${rootpath}create_company`} element={<CreateCompany/>} />
          <Route path='*' element={<ErrorPage errorCode={404} content={firstCapitalize(t('not_found_url'))} />} />
        </Routes>
        )
}) 

const RoutesLoggedIn = React.memo(({setToastObject})=>{
  
  const masterProfile = CurrentUser()?.profileId==Profiles.MASTER;
  const {t}= useTranslation()
  
  return(
          <Routes>
          <Route path={rootpath} element={<Dashboard/>}/>
          <Route path={`${rootpath}dashboard`} element={<Dashboard/>} />
          <Route path={`${rootpath}pdf`} element={masterProfile ? <PdfViewer/>:<ErrorPage errorCode={401} content={firstCapitalize(t('forbiden'))} />} />
          <Route path={`${rootpath}requests`} element={masterProfile ? <Request/>:<ErrorPage errorCode={401} content={firstCapitalize(t('forbiden'))} />} />
          <Route path={`${rootpath}notifications`} element={masterProfile ? <Notification/> : <ErrorPage errorCode={401} content={firstCapitalize(t('forbiden'))} />} />
          <Route path={`${rootpath}sales`} element={<Sales/>}/>
          <Route path={`${rootpath}products`} element={masterProfile ? <Product/> : <ErrorPage errorCode={401} content={firstCapitalize(t('forbiden'))} />} />
          <Route path={`${rootpath}spents`} element={masterProfile ? <Spent/>: <ErrorPage errorCode={401} content={firstCapitalize(t('forbiden'))} />} />  
          <Route path={`${rootpath}users`} element={masterProfile ? <User/>: <ErrorPage errorCode={401} content={firstCapitalize(t('forbiden'))} /> } /> 
          <Route path={`${rootpath}sale`} element={<Sale setToastObject={setToastObject}/>} />      
          <Route path={`${rootpath}sale/devolution`} element={<Devolution setToastObject={setToastObject}/>} />      
          <Route path={`${rootpath}setting`} element={<Setting/>} />
          <Route path={`${rootpath}profile`} element={<Account/>} />
          <Route path={`${rootpath}mystore`} element={<MyStore/>} />
          <Route path={`${rootpath}stock_movements`} element={<StockMovements/>} />
          <Route path='*' element={<ErrorPage errorCode={404} content={firstCapitalize(t('not_found_url'))} />} />
      </Routes>
  )
})

const Home = React.memo( 
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


  useEffect(()=>{
    if(appState.isAuthenticated){
    
      Promise.all([dispatch(fetchProducts()),
                  dispatch(fetchUsers()),
                  dispatch(fetchSpents()),
                  dispatch(fetchCategories()),
                  dispatch(fetchCompanies()),
                  dispatch(fetchPrinterConfig())])
    }

   },[appState.isAuthenticated,dispatch]);

   useEffect(()=>{    
     if(isVisible){
       setTimeout(() => {
         setIsVisible(false);
       }, 50000);
     } 
   },[isVisible]);

  return (
     <div className={`h-100 w-100 p-3  ${ !localStorage.getItem("isLogged") ? 'flex items-center justify-center':''}`}>   

      {
      !localStorage.getItem("isLogged") ? <RoutesLoggedOut/>
      :
      <>
      <Header searchHandleClick={setIsSearching} setVisibility={setIsVisible}/>
      <Navegation visible={isVisible} setVisibility={setIsVisible}/>
      <RoutesLoggedIn setToastObject={setToastObject} />
      </>
    }

      {appState.invoiceView && appState.urlItem && <PdfViewer closeHandler={closeInvoiceView} url={appState.urlItem}/>}
      
      { appState.isSearching && (<Search/>)}
      { appState.showToast && (<ShowToast object={appState.toastObject} />)}
      { appState.isExporting && (<Export stopExporting={StopExporting} />) }
     </div>
  )
}
) 

export default Home;
