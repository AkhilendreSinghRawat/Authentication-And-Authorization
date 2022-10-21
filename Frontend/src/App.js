import { BrowserRouter as Router } from 'react-router-dom'
import Routing from './routers'

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routing />
      </Router>
    </div>
  )
}

export default App
