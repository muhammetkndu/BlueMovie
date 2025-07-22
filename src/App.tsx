import {Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Navbar from "./components/navbar"
import Home from "./pages/home"
import DetailCard from "./pages/movieDetail"

function App() {

  return (  
  <Router>
    <Navbar />
    <DetailCard />
      <Routes>
          <Route path="/" element={<Home />} />
      </Routes>
  </Router>
  )
}

export default App
