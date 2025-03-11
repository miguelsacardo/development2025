import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './components/login/index'
import Home from './components/home'
import Subjects from './components/subjects'

const App = ()=>{
  return(
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/> {/* direcionando a primeira página para o login*/}
        <Route path='/login' element={<Login/>}/> 
        <Route path='/home' element={<Home/>}/> 
        <Route path='/subjects' element={<Subjects/>}/>
      </Routes>
    </Router>
  )
}

export default App