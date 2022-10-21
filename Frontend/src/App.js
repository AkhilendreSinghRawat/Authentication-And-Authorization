import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Register from './Register'
import Signin from './Signin'

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/signup" exact element={<Register />} />
          <Route path="/signin" exact element={<Signin />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
