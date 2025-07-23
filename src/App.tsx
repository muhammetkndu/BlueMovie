import {Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Navbar from "./components/navbar"
import Home from "./pages/home"
import DetailCard from "./pages/movieDetail"
import Favorites from "./pages/favorites"

function App() {

  return (  
  <Router>
    <Navbar />
    <DetailCard />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
      </Routes>
  </Router>
  )
}

export default App
