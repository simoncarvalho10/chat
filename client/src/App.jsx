import './styles/output.css'
import Chat from './components/Chat'
import Admin from './components/Admin'
import Layout from './components/Layout'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {

  return (

    <div className='w-full flex items-center justify-center bg-white'>
      <Router>
        <Routes>
          <Route path="/" element={<Chat/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/layout" element={<Layout/>}/>
        </Routes>
      </Router>
    </div>

  )
}

export default App
