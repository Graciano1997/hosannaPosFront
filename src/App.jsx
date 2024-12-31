import './App.css'
import Dashboard from './components/Dashboard'
import Header from './components/Header'
import Navegation from './components/Navegation'

function App() {
  return (
    <>
     <div className="h-screen w-screen p-3">
      <Header/>
      <Navegation/>
      <Dashboard/>
     </div>
    </>
  )
}

export default App
