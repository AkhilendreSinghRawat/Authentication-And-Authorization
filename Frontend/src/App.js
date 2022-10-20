import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignUp from './SignUp'

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
