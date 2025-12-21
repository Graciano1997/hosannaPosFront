import { StrictMode } from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import './i18n'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './App/Store.js'
import Home from './Home.jsx'

createRoot(document.getElementById('root')).render(
<StrictMode>
  <Provider store={store}>
    <BrowserRouter>
    <Home />
    </BrowserRouter>
  </Provider>
  </StrictMode>
)
